import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import FeaturedSoftware from "../../components/landing/FeaturedSoftware";
import Statistics from "../../components/landing/Statistics";
import HowItWorks from "../../components/landing/HowItWorks";
import WhySoftwareEmpire from "../../components/landing/WhySoftwareEmpire";
import CTASection from "../../components/landing/CTASection";
import Footer from "../../components/landing/Footer";

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />
        <FeaturedSoftware />
        <Statistics />
         <HowItWorks />
         <WhySoftwareEmpire />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default Landing;
