"use client";
import React, { useState, useEffect } from "react";

const LOADING_SHOWN_KEY = "gg-loading-shown";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Sadece ilk ziyarette loading ekranini goster (session bazli)
    const hasShown = sessionStorage.getItem(LOADING_SHOWN_KEY);
    
    if (hasShown) {
      // Daha once gosterilmis, hemen kapat
      setIsLoading(false);
      return;
    }
    
    // Ilk ziyaret, loading ekranini goster
    setIsLoading(true);
    sessionStorage.setItem(LOADING_SHOWN_KEY, "true");
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Eger yukleme bittiyse veya daha once gosterildiyse, ekrani tamamen gizle
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#f7f9fc]">
      {/* Etrafında Dönen Gradyan Çizgi Efekti */}
      <div className="relative flex items-center justify-center w-28 h-28 mb-8">
        <div 
          className="absolute inset-0 rounded-full animate-spin" 
          style={{ 
            background: "conic-gradient(from 0deg, transparent 0%, transparent 40%, #5aacf0 60%, #2ec4a0 100%)" 
          }}
        ></div>
        
        {/* İçerideki Beyaz Kutu ve Logo */}
        <div className="absolute inset-[3px] bg-[#f7f9fc] rounded-full flex items-center justify-center">
          {/* Logo (Daha önce eklediğin elma yerine koyduğumuz resim) */}
          <img 
            src="/assets/images/app_logo.png" 
            alt="GG Yükleniyor" 
            className="w-12 h-12 animate-pulse object-contain" 
          />
        </div>
      </div>

      {/* Marka Adı */}
      <h1 className="text-3xl font-bold tracking-[-0.02em] text-[#1a1a2e] mb-3 animate-fade-in">
        GG
      </h1>

      {/* Zıplayan Noktalarla "Yükleniyor" Animasyonu */}
      <div className="flex gap-2 items-center">
        <span className="text-[13px] text-[#8a8aaa] tracking-[0.2em] font-semibold uppercase">
          Yükleniyor
        </span>
        <span className="flex gap-1.5 ml-1">
          <span className="w-1.5 h-1.5 bg-[#5aacf0] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
          <span className="w-1.5 h-1.5 bg-[#2ec4a0] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
          <span className="w-1.5 h-1.5 bg-[#5aacf0] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
        </span>
      </div>
    </div>
  );
}
