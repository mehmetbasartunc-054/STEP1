"use client";
import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

const messages = [
  { text: "Zeynep az önce Sonic Buds satın aldı.", icon: "ShoppingBagIcon", color: "text-green-500" },
  { text: "Şu an 14 kişi Akıllı Saatleri inceliyor.", icon: "EyeIcon", color: "text-[#5aacf0]" },
  { text: "Can, Onvo Scooter'ı sepetine ekledi.", icon: "ShoppingCartIcon", color: "text-[#a78bfa]" },
  { text: "Sınırlı stok: Valve Index VR Kit tükenmek üzere!", icon: "FireIcon", color: "text-red-500" },
  { text: "Ece, AI Stil Testi'ni çözerek tarzını buldu.", icon: "SparklesIcon", color: "text-[#2ec4a0]" }
];

export default function FomoNotification() {
  const [visible, setVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Site açıldıktan 3 saniye sonra ilk bildirimi göster
    const initialDelay = setTimeout(() => setVisible(true), 3000);

    // Her 10 saniyede bir bildirimi değiştir ve göster
    const interval = setInterval(() => {
      setVisible(false); // Önce yumuşakça gizle
      
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setVisible(true); // Yeni mesajla tekrar göster
      }, 500); // Kapanma animasyonu süresi
      
    }, 10000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  const currentMessage = messages[messageIndex];

  return (
    <div className="fixed bottom-8 left-8 z-[100] animate-fade-in-up pointer-events-auto">
      
      {/* İlerleme Çubuğu Animasyonu İçin CSS */}
      <style>{`
        @keyframes shrinkBar {
          0% { width: 100%; }
          100% { width: 0%; }
        }
        .animate-shrink {
          animation: shrinkBar 9.5s linear forwards;
        }
      `}</style>

      {/* Daha Geniş ve Etkileyici Kutu */}
      <div className="bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl p-5 pr-14 rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-white/10 flex items-center gap-5 max-w-[380px] transition-transform duration-300 hover:scale-105 relative overflow-hidden">
        
        {/* İkon Çemberi (Büyütüldü) */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 dark:bg-white/5 shrink-0 ${currentMessage.color} shadow-inner`}>
          <Icon name={currentMessage.icon as any} size={24} />
        </div>
        
        {/* Metin Alanı (Büyütüldü ve Belirginleştirildi) */}
        <div className="flex-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 animate-pulse">Canlı Akış</p>
          <p className="text-base font-bold text-[#1a1a2e] dark:text-white leading-snug">
            {currentMessage.text}
          </p>
        </div>

        {/* Kapatma Butonu */}
        <button 
          onClick={() => setVisible(false)} 
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
        >
          <Icon name="XMarkIcon" size={18} />
        </button>

        {/* KAYARAK AZALAN SÜRE ÇUBUĞU (Progress Bar) */}
        {/* 'key' prop'u sayesinde mesaj her değiştiğinde animasyon baştan başlar */}
        <div 
          key={messageIndex} 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#5aacf0] via-[#2ec4a0] to-[#a78bfa] animate-shrink"
        />

      </div>
    </div>
  );
}