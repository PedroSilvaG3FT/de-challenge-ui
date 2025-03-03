import { Plane } from "lucide-react";
import { motion } from "framer-motion";
import { FlipWords } from "@/design/components/ui/flip-words";

export default function LoadingSearchComponent() {
  const planeAnimation = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="h-[400px] w-full flex flex-col items-center justify-center">
      <FlipWords
        className="text-lg"
        words={[
          `Searching for the best flights...`,
          `Exploring new destinations for you...`,
          `Hold tight! Your next adventure is loading...`,
          `Finding the perfect journey...`,
          `Great deals are on the way...`,
          `Packing your virtual bags...`,
          `Scanning the skies for the best routes...`,
          `Almost there! Your flight options are coming...`,
          `Mapping out your dream trip...`,
          `Booking magic in progress...`,
        ]}
      />

      <motion.div animate={planeAnimation.animate}>
        <Plane className="w-20 h-20 mt-12 text-foreground/40" />
      </motion.div>
    </section>
  );
}
