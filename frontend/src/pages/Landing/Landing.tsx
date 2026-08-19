import { useEffect, useState } from "react";

import { getSoftwares } from "../../services/softwareService";
import { getSoftwareCategories } from "../../services/softwareCategoryService";

import type { Software, Category } from "../../types/software";

import Navbar from "../../components/Landing/Navbar";
import HeroSection from "../../components/Landing/HeroSection";
import ProblemSection from "../../components/Landing/ProblemSection";
import CategoriesSection from "../../components/Landing/CategoriesSection";
import DirectorySection from "../../components/Landing/DirectorySection";
import HowItWorksSection from "../../components/Landing/HowItWorksSection";

// bikin setelahnya
import EcosystemSection from "../../components/Landing/EcosystemSection";
import AIRecommendationSection from "../../components/Landing/AIRecommendationSection";
import CTASection from "../../components/Landing/CTASection";
import Footer from "../../components/Landing/Footer";

export default function Landing() {
  const [softwareData, setSoftwareData] = useState<Software[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loadingSoftware, setLoadingSoftware] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [activeCategory, setActiveCategory] = useState("all");

  const [heroInput, setHeroInput] = useState("");
  const [dirSearch, setDirSearch] = useState("");

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        setLoadingSoftware(true);

        const response = await getSoftwares();
        const data = response?.data ?? response;

        setSoftwareData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch softwares:", error);
        setSoftwareData([]);
      } finally {
        setLoadingSoftware(false);
      }
    };

    fetchSoftware();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);

        const response = await getSoftwareCategories();
        const data = response?.data ?? response;

        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const displayedSoftware = softwareData.filter((software) => {
    const search = dirSearch.toLowerCase().trim();

    const matchesSearch =
      !search ||
      software.name?.toLowerCase().includes(search) ||
      software.category?.toLowerCase().includes(search) ||
      software.description?.toLowerCase().includes(search);

    const matchesCategory =
      activeCategory === "all" ||
      String(software.category_id) === activeCategory ||
      software.category?.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleHeroSearch = () => {
    setDirSearch(heroInput);
    scrollTo("directory");
  };

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(String(category.id));
    scrollTo("directory");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onNavigate={scrollTo} />

      <HeroSection
        value={heroInput}
        onChange={setHeroInput}
        onSearch={handleHeroSearch}
        onCompare={() => scrollTo("directory")}
      />

      <ProblemSection />

      <CategoriesSection
        categories={categories}
        loading={loadingCategories}
        onSelect={handleCategoryClick}
      />

      <DirectorySection
        software={displayedSoftware}
        categories={categories}
        loading={loadingSoftware}
        search={dirSearch}
        activeCategory={activeCategory}
        onSearchChange={setDirSearch}
        onCategoryChange={setActiveCategory}
        onClearFilters={() => {
          setActiveCategory("all");
          setDirSearch("");
        }}
      />

      <HowItWorksSection />

      <EcosystemSection />

      <AIRecommendationSection />

      <CTASection onExplore={() => scrollTo("directory")} />

      <Footer />
    </div>
  );
}
