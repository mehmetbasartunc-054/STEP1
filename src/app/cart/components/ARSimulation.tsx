"use client";
import React, { useRef, useEffect, useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface ARProps {
  isOpen: boolean;
  onClose: () => void;
  productImage: string;
}

export default function ARSimulation({ isOpen, onClose, productImage }: ARProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Kamerayı Başlat
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        .then((s) => {
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch((err) => console.error("Kamera hatası:", err));
    } else {
      // Kamerayı Kapat
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black animate-fade-in">
      {/* Kamera Görüntüsü */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover grayscale-[20%] opacity-80"
      />

      {/* AR Ürün Katmanı (Şeffaf Saat) */}
      <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 pointer-events-none animate-pulse-soft">
        <img 
          src={productImage} 
          alt="AR View" 
          className="w-full h-full object-contain mix-blend-screen drop-shadow-[0_0_20px_rgba(90,172,240,0.8)]"
        />
        {/* Kılavuz Çizgiler */}
        <div className="absolute inset-0 border-2 border-[#5aacf0]/30 border-dashed rounded-full scale-110"></div>
      </div>

      {/* Alt Bilgi Paneli */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-full max-w-xs text-center">
        <p className="text-white text-sm font-bold bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          Kamerayı kolunuza hizalayın
        </p>
      </div>

      {/* Kapatma Butonu */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 z-30 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all"
      >
        <Icon name="XMarkIcon" size={24} />
      </button>
    </div>
  );
}   