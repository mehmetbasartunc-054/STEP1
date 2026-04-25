"use client";
import React, { useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentModal({ isOpen, onClose }: StudentModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      // Sadece .edu veya .edu.tr ile biten mailleri kabul et
      if (email.toLowerCase().includes(".edu")) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 1500); // 1.5 saniye doğrulama simülasyonu
  };

  const handleClose = () => {
    onClose();
    // Modal kapanınca state'leri sıfırla ki tekrar açıldığında temiz gelsin
    setTimeout(() => {
      setEmail("");
      setStatus("idle");
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Arkaplan Karartması */}
      <div 
        className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => status !== "loading" && handleClose()}
      ></div>

      {/* Modal Kutusu */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#111827] rounded-[24px] p-8 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-transparent dark:border-gray-800 animate-fade-in-up transition-colors duration-500 text-center">
        
        <button 
          onClick={handleClose}
          disabled={status === "loading"}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
        >
          <Icon name="XMarkIcon" size={24} />
        </button>

        {status !== "success" ? (
          <>
            <div className="w-16 h-16 rounded-full bg-[#5aacf0]/10 text-[#5aacf0] flex items-center justify-center mx-auto mb-4">
              <Icon name="AcademicCapIcon" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2 transition-colors">Öğrenci Doğrulaması</h2>
            <p className="text-sm text-[#8a8aaa] dark:text-gray-400 mb-6 transition-colors">
              Okul e-posta adresini (.edu veya .edu.tr) girerek anında %50 indirim kodunu kazan!
            </p>

            <form onSubmit={handleVerify} className="flex flex-col gap-4">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                placeholder="ornek@uni.edu.tr" 
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#5aacf0] text-center font-medium bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors ${status === 'error' ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}`}
                disabled={status === "loading"}
              />
              
              {status === "error" && (
                <p className="text-red-500 text-xs font-semibold animate-shake">Sadece geçerli bir öğrenci e-postası kabul edilir.</p>
              )}

              <button 
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 mt-2 rounded-xl text-white font-bold transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)" }}
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Doğrulanıyor...
                  </span>
                ) : "Doğrula ve Kodu Al"}
              </button>
            </form>
          </>
        ) : (
          <div className="py-4 animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Icon name="CheckCircleIcon" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2 transition-colors">Doğrulama Başarılı!</h2>
            <p className="text-sm text-[#8a8aaa] dark:text-gray-400 mb-6 transition-colors">Aramıza hoş geldin. Sepette kullanabileceğin %50 indirim kodun hazır:</p>
            
            <div className="bg-[#1a1a2e] dark:bg-black text-white py-4 px-6 rounded-xl text-2xl font-mono tracking-[0.2em] inline-block shadow-lg border border-gray-800 relative overflow-hidden group cursor-pointer">
              <span className="relative z-10">EDU50</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </div>
            <p className="text-xs text-gray-400 mt-4">Kodu kopyala ve ödeme sayfasında uygula.</p>
          </div>
        )}
      </div>
    </div>
  );
}