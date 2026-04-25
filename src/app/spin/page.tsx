import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpinToWin from "./components/SpinToWin";

export default function SpinPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <div className="pt-20">
        <SpinToWin />
      </div>
      <Footer />
    </main>
  );
}
