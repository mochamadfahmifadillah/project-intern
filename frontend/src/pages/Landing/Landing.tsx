import { useEffect, useState } from "react";

import { getSoftwares } from "../../services/softwareService";
import { getSoftwareCategories } from "../../services/softwareCategoryService";

import type { Software, Category } from "../../types/software";

import Navbar from "../../components/Landing/Navbar";
import HeroSection from "../../components/Landing/HeroSection";
import StatsSection from "../../components/Landing/StatsSection";
import CategoriesSection from "../../components/Landing/CategoriesSection";
import FeaturedSoftwareSection from "../../components/Landing/FeaturedSoftwareSection";
import ListingCTASection from "../../components/Landing/ListingCTASection";
import Footer from "../../components/Landing/Footer";

export default function Landing() {
  // =========================
  // DATA
  // =========================

  const [softwareData, setSoftwareData] = useState<Software[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // =========================
  // LOADING
  // =========================

  const [loadingSoftware, setLoadingSoftware] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // =========================
  // SEARCH
  // =========================

  const [heroInput, setHeroInput] = useState("");

  // =========================
  // CATEGORY
  // =========================

  const [activeCategory, setActiveCategory] = useState("all");

  // =========================
  // INITIAL DATA
  // =========================

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      const [softwareResponse, categoryResponse] = await Promise.allSettled([
        getSoftwares(),
        getSoftwareCategories(),
      ]);

      if (!mounted) return;

      // SOFTWARE

      if (softwareResponse.status === "fulfilled") {
        const response = softwareResponse.value;
        const data = response?.data ?? response;

        setSoftwareData(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch softwares:", softwareResponse.reason);
      }

      // CATEGORIES

      if (categoryResponse.status === "fulfilled") {
        const response = categoryResponse.value;
        const data = response?.data ?? response;

        setCategories(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch categories:", categoryResponse.reason);
      }

      setLoadingSoftware(false);
      setLoadingCategories(false);
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  // =========================
  // NAVIGATION
  // =========================

  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // =========================
  // HERO SEARCH
  // =========================

  const handleSearch = () => {
    const query = heroInput.trim();

    if (!query) {
      scrollTo("directory");
      return;
    }

    // nanti bisa diarahkan ke directory
    // dengan query parameter

    scrollTo("directory");
  };

  // =========================
  // CATEGORY
  // =========================

  const handleCategory = (category: Category) => {
    setActiveCategory(String(category.id));

    scrollTo("directory");
  };

  // =========================
  // FILTER
  // =========================

  const displayedSoftware = softwareData.filter((software) => {
    if (activeCategory === "all") {
      return true;
    }

    return String(software.category_id) === activeCategory;
  });

  // =========================
  // RENDER
  // =========================

  return (
    <div id="top" className="min-h-screen bg-white">
      <Navbar onNavigate={scrollTo} />

      <HeroSection
        value={heroInput}
        onChange={setHeroInput}
        onSearch={handleSearch}
      />

      <StatsSection />

      <CategoriesSection
        categories={categories}
        loading={loadingCategories}
        activeCategory={activeCategory}
        onSelect={handleCategory}
      />

      <FeaturedSoftwareSection
        software={displayedSoftware}
        loading={loadingSoftware}
        onViewAll={() => (window.location.href = "/software-directory")}
      />

      <ListingCTASection
        onListSoftware={() => (window.location.href = "/login")}
      />

      <Footer onNavigate={scrollTo} />
    </div>
  );
}
