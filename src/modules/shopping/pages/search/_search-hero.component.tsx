import { FlipWords } from "@/design/components/ui/flip-words";

export default function SearchHeroComponent() {
  return (
    <section className="overflow-hidden relative group">
      <img
        alt="search hero"
        src="/images/search-hero-bg.jpg"
        className="h-[530px] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />

      <article className="h-full w-full absolute left-0 top-0 bg-black/60 backdrop-blur-sm"></article>

      <section className="app-container text-white h-full w-full absolute left-0 top-0 flex flex-col justify-center mobile:items-center mobile:text-center">
        <h4 className="text-primary font-semibold">Find your</h4>
        <h1 className="font-bold text-6xl mb-4 mobile:text-4xl">
          Next Adventure
        </h1>

        <p className="mobile:px-4 mobile:max-w-[90%]">
          Discover the best flight deals for your dream destination, whether
          it's a quick getaway or a long-awaited vacation.
        </p>

        <FlipWords
          words={[
            "Travel the world.",
            "Dream big, fly far.",
            "Adventure awaits you.",
            "Fly into the unknown.",
            "Explore new horizons.",
            "Discover your next journey.",
          ]}
          className="text-xl mr-2 text-white my-4 mobile:text-lg mobile:mr-0"
        />
      </section>
    </section>
  );
}
