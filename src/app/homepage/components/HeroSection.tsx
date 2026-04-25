"use client";
import React, { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import Icon from "@/components/ui/AppIcon";

const modelViews = [
  {
    src: "/apple_watch_ultra_2.glb",
    alt: "Apple Watch Ultra 2",
    bubble1: { title: "Premium Serisi", desc: "Modern Nabız Ölçer", icon: "SparklesIcon", color: "text-[#5aacf0]", bg: "bg-[#5aacf0]/10" },
    bubble2: { title: "Kesintisiz Enerji", desc: "50 Saat Pil Ömrü", icon: "BoltIcon", color: "text-[#2ec4a0]", bg: "bg-[#2ec4a0]/10" }
  },
  {
    src: "/jbl_charge_3_speaker.glb",
    alt: "JBL Charge 3 Speaker",
    bubble1: { title: "Ses Gücü", desc: "20W GPS Stereo Ses", icon: "SpeakerWaveIcon", color: "text-purple-500", bg: "bg-purple-500/10" },
    bubble2: { title: "Taşınabilir Parti", desc: "20 Saat Pil Ömrü", icon: "FireIcon", color: "text-orange-500", bg: "bg-orange-500/10" }
  },
  {
    src: "/airpods_4.glb",
    alt: "AirPods 4",
    bubble1: { title: "Profesyonel Ses", desc: "52 Saat Şarj Ömrü", icon: "MusicNoteIcon", color: "text-cyan-500", bg: "bg-cyan-500/10" },
    bubble2: { title: "Sessiz Konfor", desc: "Aktif Gürültü Engelleme", icon: "SpeakerXMarkIcon", color: "text-slate-500", bg: "bg-slate-500/10" }
  },
  {
    src: "/tier_scooter.glb",
    alt: "Tier Scooter",
    bubble1: { title: "Enerji Verimliliği", desc: "83 km Menzil", icon: "BoltIcon", color: "text-[#2ec4a0]", bg: "bg-[#2ec4a0]/10" },
    bubble2: { title: "Kolay Taşıma", desc: "22 kg Ağırlık", icon: "PackageIcon", color: "text-[#5aacf0]", bg: "bg-[#5aacf0]/10" }
  },
  {
    src: "/lightning_black_hoverboard.glb",
    alt: "Lightning Black Hoverboard",
    bubble1: { title: "Uzun Pil Ömrü", desc: "12 Saat Pil Ömrü", icon: "BoltIcon", color: "text-[#2ec4a0]", bg: "bg-[#2ec4a0]/10" },
    bubble2: { title: "Kolay Taşıma", desc: "15 kg Ağırlık", icon: "PackageIcon", color: "text-[#5aacf0]", bg: "bg-[#5aacf0]/10" }
  },
  {
    src: "/mechanical_keyboard.glb",
    alt: "Mechanical Keyboard",
    bubble1: { title: "Hissiyat", desc: "Mekanik Tuşlar", icon: "BoltIcon", color: "text-[#2ec4a0]", bg: "bg-[#2ec4a0]/10" },
    bubble2: { title: "Kablosuz Bağlantı", desc: "Bluetooth 5.0", icon: "PackageIcon", color: "text-[#5aacf0]", bg: "bg-[#5aacf0]/10" }
  },
  {
    src: "/pc_mouse_type-r.glb",
    alt: "PC Mouse Type-R",
    bubble1: { title: "Hissiyat", desc: "Yumuşak Dokunus", icon: "BoltIcon", color: "text-[#2ec4a0]", bg: "bg-[#2ec4a0]/10" },
    bubble2: { title: "Kablosuz Bağlantı", desc: "Bluetooth 5.0", icon: "PackageIcon", color: "text-[#5aacf0]", bg: "bg-[#5aacf0]/10" }
  }
];

export default function HeroSection() {
  const [modelIndex, setModelIndex] = useState(0);

  const slideData = modelViews[modelIndex];


  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#f7f9fc] dark:bg-[#0a0f1c] transition-colors duration-500">
      
      <style>{`
        @keyframes floatMain {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-2deg); }
        }
        @keyframes floatBubble1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(15px); }
        }
        @keyframes floatBubble2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(15px) translateX(-15px); }
        }
      `}</style>

      {/* ARKAPLAN NEON PARLAMALARI */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#5aacf0]/20 to-[#2ec4a0]/20 dark:from-[#5aacf0]/15 dark:to-[#2ec4a0]/15 blur-[100px] rounded-full pointer-events-none transition-colors duration-500"></div>

      <div className="max-w-[1200px] mx-auto px-5 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* SOL TARAF: YAZILAR */}
        <div className="flex-1 text-center lg:text-left animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-[#5aacf0]/30 bg-[#5aacf0]/10 text-[#5aacf0] transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#5aacf0] animate-pulse" />
            Yeni Sezon Ürünleri Keşfet
          </div>

          <h1 className="text-[3rem] md:text-[4.5rem] font-extrabold tracking-tight text-[#1a1a2e] dark:text-white leading-[1.05] mb-6 transition-colors duration-500">
            Sınırlarını <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0] inline-block mt-2">
              Lumina Tech
            </span> ile Zorla
          </h1>

          <p className="text-lg md:text-xl text-[#8a8aaa] dark:text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 transition-colors duration-500 leading-relaxed">
            Gençlik enerjini teknolojiyle birleştir. Kusursuz ses, sınırsız pil ve seni her anında destekleyen inovatif çözümlerle geleceği bugünden yaşa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="#products" className="w-full sm:w-auto px-8 py-4 rounded-full text-white font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_rgba(90,172,240,0.3)]" style={{ background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)" }}>
              Ürünleri İncele <Icon name="ArrowRightIcon" size={18} />
            </Link>
            <Link href="#quiz" className="w-full sm:w-auto px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 border-2 border-gray-200 dark:border-gray-800 text-[#1a1a2e] dark:text-white hover:border-[#5aacf0] dark:hover:border-[#5aacf0] transition-all duration-300">
              Sen Hangi Lumina Tech'sin?
            </Link>
          </div>
        </div>

      {/* SAĞ TARAF: 3D MODEL VE DİNAMİK BALONCUKLAR */}
        <div className="flex-1 relative w-full h-[450px] md:h-[600px] flex items-center justify-center mt-10 lg:mt-0">

          <div className="absolute w-72 h-72 md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-tr from-[#5aacf0]/30 to-[#2ec4a0]/30 dark:from-[#5aacf0]/15 dark:to-[#2ec4a0]/15 flex items-center justify-center animate-[spin_20s_linear_infinite] blur-xl"></div>

          {/* 3D Model Viewer Slider */}
          <div 
            className="relative z-10 w-56 h-56 md:w-80 md:h-80 rounded-[40px] overflow-hidden shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white dark:border-[#111827] transition-colors duration-500 bg-white dark:bg-[#111827]"
            style={{ animation: 'floatMain 6s ease-in-out infinite' }}
          >
            <Script 
              type="module" 
              src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
              strategy="beforeInteractive"
            />

            <model-viewer 
              src={slideData.src}
              alt={slideData.alt} 
              autorotate
              camera-controls
              style={{ width: '100%', height: '100%' }}
            />

            <button
              type="button"
              disabled={modelIndex === 0}
              onClick={() => setModelIndex((prev) => Math.max(prev - 1, 0))}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/90 dark:bg-[#111827]/90 border border-gray-200 dark:border-gray-700 shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Önceki modele geçiş"
            >
              <Icon name="ArrowLeftIcon" size={18} className="text-[#1a1a2e] dark:text-white" />
            </button>

            <button
              type="button"
              disabled={modelIndex === modelViews.length - 1}
              onClick={() => setModelIndex((prev) => Math.min(prev + 1, modelViews.length - 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/90 dark:bg-[#111827]/90 border border-gray-200 dark:border-gray-700 shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Sonraki modele geçiş"
            >
              <Icon name="ArrowRightIcon" size={18} className="text-[#1a1a2e] dark:text-white" />
            </button>
          </div>

          {/* ÜST-SOL Çapraz Baloncuk */}
          <div 
            className="absolute top-[5%] left-[5%] md:top-[15%] md:left-[0%] z-20 px-5 py-3 bg-white/85 dark:bg-[#111827]/85 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 dark:border-gray-700 flex items-center gap-3 text-[#1a1a2e] dark:text-white transition-all duration-500 opacity-100 scale-100"
            style={{ animation: 'floatBubble1 7s ease-in-out infinite' }}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${slideData.bubble1.bg} ${slideData.bubble1.color} transition-colors duration-500`}>
              <Icon name={slideData.bubble1.icon as any} size={20} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{slideData.bubble1.title}</p>
              <p className="text-[14px] font-bold">{slideData.bubble1.desc}</p>
            </div>
          </div>

          {/* ALT-SAĞ Çapraz Baloncuk */}
          <div 
            className="absolute bottom-[5%] right-[5%] md:bottom-[15%] md:right-[0%] z-20 px-5 py-3 bg-white/85 dark:bg-[#111827]/85 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 dark:border-gray-700 flex items-center gap-3 text-[#1a1a2e] dark:text-white transition-all duration-500 opacity-100 scale-100"
            style={{ animation: 'floatBubble2 6.5s ease-in-out infinite' }}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${slideData.bubble2.bg} ${slideData.bubble2.color} transition-colors duration-500`}>
              <Icon name={slideData.bubble2.icon as any} size={20} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{slideData.bubble2.title}</p>
              <p className="text-[14px] font-bold">{slideData.bubble2.desc}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}