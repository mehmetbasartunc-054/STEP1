"use client";
import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

export default function CampaignSection() {
  const [energy, setEnergy] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Kupon kodu başarıyla kopyalandı: ${code}`);
  };

  const tapEnergy = () => {
    if (energy < 100) {
      setEnergy((prev) => Math.min(prev + 20, 100));
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 150);
    }
  };

  useEffect(() => {
    if (energy === 100 && !unlocked) {
      setTimeout(() => setUnlocked(true), 300);
    }
  }, [energy, unlocked]);

  return (
    <section id="campaign" className="py-24 relative overflow-hidden bg-white dark:bg-[#0a0f1c] transition-colors duration-500">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#5aacf0]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2ec4a0]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-[1024px] mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-semibold tracking-[0.01em] mb-6" style={{ background: "rgba(90,172,240,0.1)", color: "#5aacf0" }}>
              <span className="w-2 h-2 rounded-full bg-[#5aacf0] animate-pulse" /> Yaz Kampanyası 2026
            </div>
            
            <h2 className="text-[2.5rem] md:text-[3rem] font-bold leading-[1.1] mb-5 tracking-[-0.03em] text-[#1a1a2e] dark:text-white transition-colors">
              Gençlik Enerjisi <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0]">Seninle!</span>
            </h2>
            
            <p className="text-[16px] text-[#8a8aaa] dark:text-gray-400 leading-relaxed mb-8 transition-colors">
              Sınırları zorlayan teknoloji, seni asla yarı yolda bırakmaz. Lumina Tech ile tarzını yansıt, müziği hisset ve hayatın ritmini yakala.
            </p>

            <ul className="flex flex-col gap-4 mb-8">
              {[
                { title: "Öğrenciye Özel %50 İndirim", desc: "Öğrenci kimliğini doğrula, anında kazan.", icon: "AcademicCapIcon" },
                { title: "Festivallerde VIP Ayrıcalığı", desc: "Seçili ürünlerle festivallere bilet şansı.", icon: "TicketIcon" },
                { title: "Sonsuz Enerji Garantisi", desc: "30 gün iade ve 2 yıl tam kapsamlı garanti.", icon: "ShieldCheckIcon" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#2ec4a0]/10 text-[#2ec4a0]">
                    <Icon name={item.icon as any} size={20} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#1a1a2e] dark:text-gray-100 transition-colors">{item.title}</h4>
                    <p className="text-[13px] text-[#8a8aaa] dark:text-gray-400 transition-colors">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="bg-[#f7f9fc] dark:bg-[#111827] rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-xl text-center relative overflow-hidden transition-colors duration-500">
              {!unlocked ? (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-bold text-[#1a1a2e] dark:text-white mb-2 transition-colors">Gizli İndirimi Aç!</h3>
                  <p className="text-sm text-[#8a8aaa] dark:text-gray-400 mb-8 transition-colors">Enerji butonuna hızlıca tıkla, %30 indirim kodunu kap.</p>
                  
                  <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full mb-8 overflow-hidden relative transition-colors">
                    <div className="h-full rounded-full transition-all duration-300 ease-out relative bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0]" style={{ width: `${energy}%` }}>
                      <div className="absolute inset-0 w-full h-full bg-white/20 animate-pulse"></div>
                    </div>
                  </div>

                  <button 
                    onClick={tapEnergy}
                    className={`w-32 h-32 rounded-full mx-auto flex flex-col items-center justify-center text-white font-bold text-lg shadow-[0_10px_30px_rgba(46,196,160,0.4)] transition-transform bg-gradient-to-br from-[#5aacf0] to-[#2ec4a0] ${isAnimating ? 'scale-90' : 'scale-100 hover:scale-105'}`}
                  >
                    <Icon name="BoltIcon" size={32} className="mb-1" />
                    Tıkla!
                  </button>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 font-medium">% {energy} Enerji</p>
                </div>
              ) : (
                <div className="py-6 animate-fade-in-up">
                  <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce transition-colors">
                    <Icon name="GiftIcon" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2 transition-colors">Tebrikler Şampiyon!</h3>
                  <p className="text-sm text-[#8a8aaa] dark:text-gray-400 mb-6 transition-colors">Gençlik enerjini kanıtladın. Kopyalamak için koda tıkla:</p>
                  
                  <div 
                    onClick={() => copyToClipboard("LUMINA30")}
                    className="bg-[#1a1a2e] dark:bg-black text-white py-4 px-8 rounded-xl text-2xl font-mono tracking-[0.2em] mb-4 inline-block shadow-lg border border-gray-800 dark:border-gray-700 relative overflow-hidden group cursor-pointer hover:scale-105 transition-all active:scale-95"
                  >
                    <span className="relative z-10">LUMINA30</span>
                    <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="ClipboardDocumentIcon" size={12} />
                    </div>
                  </div>
                  <p className="text-xs text-green-500 font-semibold mt-2 animate-pulse">✓ Kopyalamak için dokun</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}