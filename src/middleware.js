import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ── CORS HANDLING ──
  // If the request is for an API route, add CORS headers
  if (pathname.startsWith("/api")) {
    // Handle preflight (OPTIONS) requests
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Or specify allowed domains
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    // For other API requests, set CORS headers on the response
    const res = NextResponse.next();
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    // Continue with the request (auth check might follow if needed)
    // For now, only /admin routes are protected below
  }

  // ── ADMIN AUTH HANDLING ──
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));

      if (!decodedPayload || (decodedPayload.role !== "ADMIN" && decodedPayload.role !== "admin")) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } catch (error) {
      console.error("Middleware auth error:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ── USER AUTH HANDLING ──
  const protectedUserRoutes = ["/health-monitoring", "/appointments", "/community", "/emergency"];
  const isProtectedUserRoute = protectedUserRoutes.some(route => pathname.startsWith(route));

  if (isProtectedUserRoute) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// ── CONFIG ──
// Apply middleware to API, Admin, and Protected User routes
export const config = {
  matcher: [
    "/admin/:path*", 
    "/api/:path*", 
    "/health-monitoring/:path*", 
    "/appointments/:path*", 
    "/community/:path*", 
    "/emergency/:path*"
  ],
};
