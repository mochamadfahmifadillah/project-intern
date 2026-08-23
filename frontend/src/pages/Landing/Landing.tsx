import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import SoftwareShowcase from "../../components/landing/SoftwareShowcase";
import RecommendationCTA from "../../components/landing/RecommendationCTA";
import TrustedCompanies from "../../components/landing/TrustedCompanies";

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />
        <SoftwareShowcase />
        <RecommendationCTA />
        <TrustedCompanies />
      </main>
    </div>
  );
}

export default Landing;