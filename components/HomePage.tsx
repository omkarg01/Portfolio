"use client";

import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Manifesto } from "@/components/Manifesto";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { IntroGate } from "@/components/IntroSplash";

export function HomePage() {
  return (
    <IntroGate>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Manifesto />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </IntroGate>
  );
}
