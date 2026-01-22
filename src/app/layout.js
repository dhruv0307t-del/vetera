import { AppointmentsProvider } from "@/context/AppointmentsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Header from "@/components/common/Header";

export const metadata = {
  title: "VetEra – Your Pet's Health Companion",
  description:
    "VetEra is a complete pet care platform to book appointments, manage pet profiles, and connect with veterinary professionals.",
  keywords: [
    "VetEra",
    "Pet Care",
    "Veterinary",
    "Vet Appointments",
    "Animal Health",
  ],
  authors: [{ name: "VetEra Team", url: "https://vet-era-new.vercel.app/" }],
  creator: "VetEra",
  metadataBase: new URL("https://vet-era-new.vercel.app/"),
  openGraph: {
    title: "VetEra – Your Pet's Health Companion",
    description:
      "Easily manage your pet’s health and appointments with VetEra.",
    url: "https://vet-era-new.vercel.app/",
    siteName: "VetEra",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://vetera.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "VetEra - Pet Health Companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VetEra – Your Pet's Health Companion",
    description:
      "Manage your pet’s care, appointments, and veterinary needs all in one place.",
    site: "@vetera",
    creator: "@vetera",
    images: ["https://vetera.com/og-image.png"],
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <AppointmentsProvider>{children}</AppointmentsProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
