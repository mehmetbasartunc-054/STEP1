"use client";
import React, { useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // 1.5 saniyelik mail gönderme simülasyonu
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setEmail("");
      setStatus("idle");
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity" onClick={() => status !== "loading" && handleClose()}></div>

      <div className="relative w-full max-w-md bg-white dark:bg-[#111827] rounded-[24px] p-8 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-transparent dark:border-gray-800 animate-fade-in-up transition-colors duration-500 text-center">
        
        <button onClick={handleClose} disabled={status === "loading"} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
          <Icon name="XMarkIcon" size={24} />
        </button>

        {status !== "success" ? (
          <>
            <div className="w-16 h-16 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] flex items-center justify-center mx-auto mb-4">
              <Icon name="GiftIcon" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2">Arkadaşını Davet Et</h2>
            <p className="text-sm text-[#8a8aaa] dark:text-gray-400 mb-6">
              Arkadaşının e-posta adresini gir, ona Lumina Tech ile tanışması için mail atalım. Karşılığında anında <strong>250 TL</strong> indirim kazan!
            </p>

            <form onSubmit={handleInvite} className="flex flex-col gap-4">
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="arkadasin@mail.com" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] text-center font-medium bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors"
                disabled={status === "loading"}
              />
              
              <button 
                type="submit" disabled={status === "loading"}
                className="w-full py-3.5 mt-2 rounded-xl text-white font-bold transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-[1.02] active:scale-[0.98] bg-[#f59e0b] hover:bg-[#d97706]"
              >
                {status === "loading" ? "Davetiye Gönderiliyor..." : "Davet Et ve Kazan"}
              </button>
            </form>
          </>
        ) : (
          <div className="py-4 animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Icon name="CheckCircleIcon" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2">Harika Bir Dostsun!</h2>
            <p className="text-sm text-[#8a8aaa] dark:text-gray-400 mb-6">Davetiyen başarıyla gönderildi. İşte sana özel 250 TL indirim kodun:</p>
            
            <div className="bg-[#1a1a2e] dark:bg-black text-white py-4 px-6 rounded-xl text-2xl font-mono tracking-[0.2em] inline-block shadow-lg border border-gray-800 relative overflow-hidden group">
              <span className="relative z-10">DAVET250</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </div>
            <p className="text-xs text-gray-400 mt-4">Kodu kopyala ve sepette kullan.</p>
          </div>
        )}
      </div>
    </div>
  );
}