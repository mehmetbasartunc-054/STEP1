"use client";
import React, { useState } from "react";
import Icon from "@/components/ui/AppIcon";

export default function CTABanner() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#6366f1] to-[#a78bfa] rounded-[48px] p-8 md:p-16 overflow-hidden shadow-[0_40px_80px_-20px_rgba(99,102,241,0.4)]">
          
          {/* ÖZEL ANİMASYONLAR */}
          <style>{`
            @keyframes orbit {
              from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
              to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
            }
            @keyframes pulse-glow {
              0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255,255,255,0.2); }
              50% { transform: scale(1.05); box-shadow: 0 0 50px rgba(255,255,255,0.5); }
            }
            @keyframes drift {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              33% { transform: translateY(-10px) rotate(2deg); }
              66% { transform: translateY(5px) rotate(-2deg); }
            }
            .animate-orbit { animation: orbit 15s linear infinite; }
            .animate-orbit-reverse { animation: orbit 20s linear infinite reverse; }
            .animate-tech-float { animation: drift 6s ease-in-out infinite; }
            .animate-glow { animation: pulse-glow 3s ease-in-out infinite; }
          `}</style>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
                <Icon name="SparklesIcon" size={16} /> Lumina Topluluğu
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
                Gelecek Seninle <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Başlar.</span>
              </h2>
              <p className="text-white/70 text-lg font-medium max-w-md leading-relaxed mb-8">
                Lumina Tech ekosistemine katıl,Bültenimiz sayesinde en yeni teknolojilerden ilk sen haberdar ol ve gençlik enerjini teknolojiyle birleştir.
              </p>
              
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <input 
                    type="email" 
                    placeholder="E-posta adresin" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-6 py-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#5aacf0] transition-all"
                  />
                  <button type="submit" className="px-8 py-4 bg-white text-[#1a1a2e] rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl">
                    Hemen Katıl
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-3 text-white font-bold animate-fade-in bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 border border-green-500/30">
                    <Icon name="CheckIcon" size={24} />
                  </div>
                  Enerji Yüklendi! Hoş Geldin.
                </div>
              )}
            </div>

            {/* SAĞ TARAF: YENİ NESİL FLOATING LOGO VE ORBIT */}
            <div className="hidden lg:flex justify-center items-center relative h-[450px]">
              
              {/* MERKEZİ LOGO: SÜZÜLME VE PARLAMA EFEKTİ */}
              <div className="relative z-20 w-36 h-36 bg-gradient-to-br from-white to-gray-200 rounded-[32px] flex items-center justify-center shadow-2xl animate-tech-float animate-glow">
                <img 
                  src="/assets/images/app_logo.png" 
                  alt="Lumina Logo" 
                  className="w-20 h-20 object-contain"
                />
              </div>

              {/* YÖRÜNGEDE DÖNEN BALONCUKLAR */}
              <div className="absolute z-30 w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 text-white shadow-lg animate-orbit">
                <Icon name="ChatBubbleLeftIcon" size={24} />
              </div>

              <div className="absolute z-30 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 text-white shadow-lg animate-orbit-reverse" style={{ animationDelay: '-5s' }}>
                <Icon name="UserGroupIcon" size={20} />
              </div>

              <div className="absolute z-30 w-16 h-16 bg-[#5aacf0]/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-[#5aacf0]/30 text-white shadow-[0_0_20px_rgba(90,172,240,0.4)] animate-orbit" style={{ animationDelay: '-10s' }}>
                <Icon name="BoltIcon" size={28} />
              </div>

              {/* ARKA PLAN HALKALARI - DAHA CANLI */}
              <div className="absolute w-[240px] h-[240px] border border-white/10 rounded-full opacity-50"></div>
              <div className="absolute w-[320px] h-[320px] border border-white/5 rounded-full animate-pulse opacity-30"></div>
              
              {/* ARKA PLAN PARLAMASI */}
              <div className="absolute w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}