"use client";
import React from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0a0f1c] border-t border-gray-100 dark:border-white/5 pt-20 pb-10 transition-colors duration-500">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Sütun: Marka ve Vizyon */}
          <div className="md:col-span-2">
            <Link href="/homepage" className="flex items-center gap-2 mb-6 inline-block">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#5aacf0] to-[#2ec4a0] shadow-lg shadow-[#5aacf0]/20">
                <img src="/assets/images/app_logo.png" alt="Lumina Tech Logo" className="w-4 h-4 object-contain brightness-0 invert" />
              </div>
              <span className="text-xl font-black tracking-tight text-[#1a1a2e] dark:text-white">
                Lumina<span className="text-[#5aacf0]">Tech</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              Gençlik enerjisini teknolojiyle birleştiren ekosistem. Sınırları reddet, ritmine ayak uydur ve geleceği bugünden yaşa.
            </p>
            {/* Sosyal Medya İkonları */}
            <div className="flex gap-4">
              {['GlobeAltIcon', 'VideoCameraIcon', 'CameraIcon'].map((iconName, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#5aacf0] hover:bg-[#5aacf0]/10 transition-all">
                  <Icon name={iconName as any} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Sütun: Hızlı Linkler */}
          <div>
            <h4 className="text-[#1a1a2e] dark:text-white font-bold mb-6">Keşfet</h4>
            <ul className="space-y-4">
              <li><Link href="/homepage#products" className="text-gray-500 dark:text-gray-400 hover:text-[#5aacf0] text-sm transition-colors">Tüm Ürünler</Link></li>
              <li><Link href="/homepage#ai-quiz" className="text-gray-500 dark:text-gray-400 hover:text-[#5aacf0] text-sm transition-colors">AI Stil Testi</Link></li>
              <li><Link href="/homepage#campaign" className="text-gray-500 dark:text-gray-400 hover:text-[#2ec4a0] text-sm transition-colors flex items-center gap-2">Öğrenci Kampanyası <span className="px-2 py-0.5 rounded text-[9px] bg-red-500/10 text-red-500 font-bold uppercase">Yeni</span></Link></li>
            </ul>
          </div>

          {/* 3. Sütun: Kurumsal */}
          <div>
            <h4 className="text-[#1a1a2e] dark:text-white font-bold mb-6">Kurumsal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-[#5aacf0] text-sm transition-colors">Hakkımızda</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-[#5aacf0] text-sm transition-colors">İade ve Garanti Şartları</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-[#5aacf0] text-sm transition-colors">Gizlilik Politikası</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-[#5aacf0] text-sm transition-colors">İletişim</a></li>
            </ul>
          </div>

        </div>

        {/* Alt Çizgi ve Telif */}
        <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs text-center md:text-left">
            © 2026 Lumina Tech. Tüm hakları saklıdır. Hackathon projesi olarak tasarlanmıştır.
          </p>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
             <Icon name="ShieldCheckIcon" size={16} className="text-green-500" /> %100 Güvenli Alışveriş
          </div>
        </div>

      </div>
    </footer>
  );
}