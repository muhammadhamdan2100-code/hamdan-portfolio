import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProblemSolution from "@/components/ProblemSolution";
import FeaturedBuild from "@/components/FeaturedBuild";
import SelectedBuilds from "@/components/SelectedBuilds";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Process from "@/components/Process";
import WhyMe from "@/components/WhyMe";
import FinalCTA from "@/components/FinalCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-background"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <ProblemSolution />
        <FeaturedBuild />
        <SelectedBuilds />
        <About />
        <TechStack />
        <Process />
        <WhyMe />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
