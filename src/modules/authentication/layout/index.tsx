import { Outlet } from "react-router-dom";
import { WavyBackground } from "@/design/components/ui/wavy-background";

export default function AuthenticationLayout() {
  return (
    <WavyBackground
      backgroundFill="#000"
      className="text-white dark p-4 h-screen flex gap-12 flex-col items-center justify-center"
    >
      <article className="bg-background/60 border border-foreground/10 p-8 rounded-3xl w-[420px] mobile:w-[90vw] backdrop-blur-lg">
        <Outlet />
      </article>
    </WavyBackground>
  );
}
