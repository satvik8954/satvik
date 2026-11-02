import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Work } from "@/components/Work";
import { Experiments } from "@/components/Experiments";
import { Now } from "@/components/Now";
import { Contact } from "@/components/Contact";

export default function Page() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Work />
        <Experiments />
        <Now />
        <Contact />
      </main>
    </>
  );
}
