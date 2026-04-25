"use client";
import React from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center relative overflow-hidden text-center px-6">
      
      {/* Uzay / Neon Arka Plan Efektleri */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5aacf0] rounded-full filter blur-[150px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a78bfa] rounded-full filter blur-[150px] opacity-20 animate-pulse delay-700"></div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Hareketli Hata Simgesi */}
        <div className="relative w-40 h-40 mb-8 animate-[bounce_4s_ease-in-out_infinite]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0] rounded-full blur-2xl opacity-40"></div>
          <div className="relative w-full h-full bg-[#111827] border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(90,172,240,0.3)]">
            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0]">
              404
            </span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
          Enerjin Seni Sınırların <br/> <span className="text-[#5aacf0]">Dışına Taşırdı!</span>
        </h1>
        
        <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
          Aradığın sayfa Lumina Tech evreninde bulunmuyor veya ışık hızında başka bir galaksiye taşındı.
        </p>

        <Link 
          href="/homepage" 
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1a1a2e] rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0] opacity-0 group-hover:opacity-10 transition-opacity"></span>
          <Icon name="HomeIcon" size={20} />
          Ana Kampa Dön
        </Link>
        
      </div>
    </div>
  );
}