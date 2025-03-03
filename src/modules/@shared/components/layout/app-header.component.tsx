import { Button } from "@/design/components/ui/button";
import useWindowScroll from "@/hooks/window-scroll.hook";
import authStore from "@/store/auth.store";
import { LogIn, User } from "lucide-react";

export default function AppHeader() {
  const isScrolled = useWindowScroll(380);
  const _authSore = authStore((state) => state);

  const buttonConfig = {
    icon: _authSore.token ? User : LogIn,
    route: _authSore.token ? "/profile" : "/auth/sign-in",
    label: _authSore.token ? "My Profile" : "Sign In",
  };

  return (
    <header className="fixed z-20 w-full h-20 backdrop-blur-sm">
      <nav className="app-container h-full flex items-center justify-between">
        <img
          src="/logo.svg"
          alt="Deal Engine"
          className={`object-contain h-6 transition-all duration-300 ${
            isScrolled ? "brightness-0" : "filter brightness-0 invert"
          }`}
        />

        <Button asChild>
          <a href={buttonConfig.route}>{buttonConfig.label}</a>
        </Button>
      </nav>
    </header>
  );
}
