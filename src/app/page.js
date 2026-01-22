"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Services from "@/components/home/Services";

const HomePage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true); 
    }
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <div>
      <Services />
    </div>
  );
};

export default HomePage;
