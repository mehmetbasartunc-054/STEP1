import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutContent from "./components/CheckoutContent";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-grow pt-32 pb-20 bg-[#f7f9fc] dark:bg-[#0a0f1c] transition-colors duration-500">
        <CheckoutContent />
      </div>
      <Footer />
    </main>
  );
}