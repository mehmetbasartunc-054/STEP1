"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";
import StudentModal from "./StudentModal";

const promoMessages = [
  "✨ Ücretsiz Kargo · 30 Gün İade Garantisi",
  "⭐️ Öğrenci Dostu Fiyatlar--Öğrenci Kimliği ile Ekstra İndirim",
  "🔥 Peşin Fiyatına 12 Aylık Taksit İmkanı",
];

export default function Header() {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartAnimating, setCartAnimating] = useState(false);
  const [prevCount, setPrevCount] = useState(0);
  const [promoIndex, setPromoIndex] = useState(0);
  const [promoVisible, setPromoVisible] = useState(true);
  const [promoDismissed, setPromoDismissed] = useState(false);
  
  const [isDark, setIsDark] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (totalItems > prevCount) {
      setCartAnimating(true);
      const t = setTimeout(() => setCartAnimating(false), 400);
      setPrevCount(totalItems);
      return () => clearTimeout(t);
    }
    setPrevCount(totalItems);
  }, [totalItems, prevCount]);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
    document.body.style.transition = "background-color 0.5s ease, color 0.5s ease";
  };

  useEffect(() => {
    if (promoDismissed) return;
    const interval = setInterval(() => {
      setPromoVisible(false);
      setTimeout(() => {
        setPromoIndex((i) => (i + 1) % promoMessages.length);
        setPromoVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [promoDismissed]);

  // Linkleri her sayfadan anasayfaya dönecek ve kayacak şekilde güncelledik
  const navLinks = [
    { label: "Ürünler", href: "/homepage#products" },
    { label: "Kampanya", href: "/homepage#campaign" },
    { label: "Senin İçin", href: "/homepage#ai-quiz" },
    { label: "Çark", href: "/spin" }
  ];

  return (
    <>
      {!promoDismissed && (
        <div className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center px-4 py-2 text-white text-[12px] font-medium tracking-[0.01em] animate-banner-slide" style={{ background: "linear-gradient(90deg, #5aacf0 0%, #2ec4a0 45%, #a78bfa 100%)", minHeight: "36px" }}>
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <span className="transition-all duration-400 ease-in-out" style={{ opacity: promoVisible ? 1 : 0, transform: promoVisible ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}>
              {promoMessages[promoIndex]}
            </span>
          </div>
          <button onClick={() => setPromoDismissed(true)} className="ml-3 w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 shrink-0">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
      )}

      <header className={`fixed left-0 right-0 z-50 transition-all duration-300 ${promoDismissed ? "top-0" : "top-[36px]"} ${scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-b border-white/60 dark:border-gray-800/60" :"bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl"}`} style={{ boxShadow: scrolled ? "0 4px 24px rgba(90,172,240,0.08)" : "none" }}>
        <div className="max-w-[1024px] mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <Link href="/homepage" className="flex items-center gap-2 group shrink-0">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)", boxShadow: "0 4px 12px rgba(90,172,240,0.35)" }}>
              <img src="/assets/images/app_logo.png" alt="Logo" className="w-4 h-4 object-contain" />
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#1a1a2e] dark:text-white transition-colors duration-300">
              GG
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} className="text-[13.5px] font-medium text-[#8a8aaa] hover:text-[#1a1a2e] dark:hover:text-white transition-colors duration-200 tracking-[-0.01em]">{item.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="relative flex items-center justify-center w-9 h-9 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 overflow-hidden" aria-label="Karanlık Modu Aç/Kapat">
              <div className={`absolute transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isDark ? "opacity-0 rotate-[-90deg] scale-50" : "opacity-100 rotate-0 scale-100"}`}>
                <Icon name="SunIcon" size={20} style={{ color: "#f59e0b" } as React.CSSProperties} />
              </div>
              <div className={`absolute transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-[90deg] scale-50"}`}>
                <Icon name="MoonIcon" size={20} style={{ color: "#a78bfa" } as React.CSSProperties} />
              </div>
            </button>

            <button onClick={() => setIsStudentModalOpen(true)} className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.01em] transition-all duration-200 hover:scale-[1.02]" style={{ background: "linear-gradient(90deg, rgba(90,172,240,0.12) 0%, rgba(46,196,160,0.12) 100%)", border: "1px solid rgba(90,172,240,0.25)", color: "#5aacf0" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ec4a0] animate-pulse-soft" /> Öğrenci İndirimi
            </button>

            <Link href="/cart" className="relative flex items-center justify-center w-9 h-9 rounded-2xl hover:bg-[#f0f8ff] dark:hover:bg-gray-800 transition-colors duration-200" aria-label="Sepet">
              <Icon name="ShoppingBagIcon" size={18} className="text-[#1a1a2e] dark:text-white" />
              {totalItems > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center ${cartAnimating ? "animate-cart-bounce" : ""}`} style={{ background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)" }}>
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-[5px] w-8 p-1" aria-label="Menü">
              <span className={`block h-[1.5px] bg-[#1a1a2e] dark:bg-white rounded-full transition-all duration-300 ${menuOpen ? "w-full rotate-45 translate-y-[6.5px]" : "w-full"}`} />
              <span className={`block h-[1.5px] bg-[#1a1a2e] dark:bg-white rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-2/3"}`} />
              <span className={`block h-[1.5px] bg-[#1a1a2e] dark:bg-white rounded-full transition-all duration-300 ${menuOpen ? "w-full -rotate-45 -translate-y-[6.5px]" : "w-full"}`} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-fade-in" style={{ background: isDark ? "rgba(15,23,42,0.97)" : "rgba(253,252,251,0.97)", backdropFilter: "blur(24px)" }}>
          {navLinks.map((item, i) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={`text-3xl font-semibold tracking-[-0.03em] text-[#1a1a2e] dark:text-white hover:text-[#5aacf0] transition-colors duration-200 animate-fade-in-up delay-${(i + 1) * 100}`}>{item.label}</a>
          ))}
          <Link href="/cart" onClick={() => setMenuOpen(false)} className="text-3xl font-semibold tracking-[-0.03em] text-[#5aacf0] animate-fade-in-up delay-400">Sepet {totalItems > 0 && `(${totalItems})`}</Link>
        </div>
      )}

      <StudentModal isOpen={isStudentModalOpen} onClose={() => setIsStudentModalOpen(false)} />
    </>
  );
}
