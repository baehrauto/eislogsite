// ---------------------------------------------------------------------------
// App Component - EIS Logistics
// ---------------------------------------------------------------------------

import SmoothScroll from "./components/layout/SmoothScroll";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import About from "./components/sections/About";
import CTA from "./components/sections/CTA";
import FAQ from "./components/sections/FAQ";
import Contact from "./components/sections/Contact";

function App() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
        <CTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

export default App;
