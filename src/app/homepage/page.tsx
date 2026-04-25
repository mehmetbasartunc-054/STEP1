import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import CampaignSection from "./components/CampaignSection";
import ProductShowcase from "./components/ProductShowcase";
import AIStyleQuiz from "./components/AIStyleQuiz";
import CTABanner from "./components/CTABanner";

export default function HomepagePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <CampaignSection />
      <ProductShowcase />
      <AIStyleQuiz />
      <CTABanner />
      <Footer />
    </main>
  );
}