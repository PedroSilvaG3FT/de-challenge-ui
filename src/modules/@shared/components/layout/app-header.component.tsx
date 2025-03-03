import { useState, useEffect } from "react";

export default function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed z-20 w-full h-20 backdrop-blur-sm">
      <nav className="app-container h-full flex items-center">
        <img
          src="/logo.svg"
          alt="Deal Engine"
          className={`object-contain h-6 transition-all duration-300 ${
            isScrolled ? "brightness-0" : "filter brightness-0 invert"
          }`}
        />
      </nav>
    </header>
  );
}
