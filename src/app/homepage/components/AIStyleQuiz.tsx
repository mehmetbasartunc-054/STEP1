"use client";
import React, { useState } from "react";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";

// YENİ ÜRÜNLERİN TAM LİSTESİ BURAYA EKLENDİ
const products = [
  { id: "aura-wristband", name: "Aura Wristband", price: 1299, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop" },
  { id: "sonic-buds", name: "Sonic Buds", price: 899, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop" },
  { id: "nova-speaker", name: "Nova Speaker", price: 1599, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop" },
  { id: "samsung-galaxy-watch-8", name: "Samsung Galaxy Watch 8", price: 8999, image: "/assets/images/shopping__1_-1777058806780.webp" },
  { id: "onvo-ov012-x-plus", name: "Onvo OV-012 X Plus", price: 12999, image: "/assets/images/shopping__1_-1777059056888.webp" },
  { id: "valve-index-vr-kit-2", name: "Valve Index VR KIT", price: 24999, image: "/assets/images/shopping__1_-1777059597581.webp" },
  { id: "jbl-boombox-3", name: "JBL Boombox 3", price: 9999, image: "/assets/images/shopping-1777059836243.webp" },
  { id: "razer-ornata-v3", name: "Razer Ornata V3", price: 1899, image: "/assets/images/shopping__2_-1777060190645.webp" },
  { id: "hawk-hm420", name: "Hawk Gaming HM420", price: 1499, image: "/assets/images/41fdGX8I5QL._AC_SX679_-1777060572109.jpg" }
];

const quizQuestions = [
  {
    question: "Bir teknoloji cihazında senin için en önemli olan nedir?",
    options: ["Performans ve Güç", "Tasarım ve Estetik", "Taşınabilirlik", "Yenilikçi Özellikler"]
  },
  {
    question: "Günlük hayatta en çok hangi aktiviteye vakit ayırırsın?",
    options: ["Oyun ve Eğlence", "İş ve Verimlilik", "Spor ve Sağlık", "Seyahat ve Keşif"]
  },
  {
    question: "Cihazlarının dış görünüşü nasıl olmalı?",
    options: ["Modern ve Neon", "Minimalist ve Sade", "Renkli ve Enerjik", "Klasik ve Mat"]
  },
  {
    question: "Bütçe önceliğin nedir?",
    options: ["En İyi Performans (Premium)", "Fiyat/Performans Odaklı", "Ekonomik Çözümler", "Sınır Tanımayan Lüks"]
  },
  {
    question: "Teknoloji senin için ne ifade ediyor?",
    options: ["Bir Yaşam Tarzı", "Sadece Bir Araç", "Geleceğe Açılan Kapı", "Sosyal Bir Statü"]
  }
];

export default function AIStyleQuiz() {
  const [step, setStep] = useState(0); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  const getRecommendedProducts = () => {
    // Tüm ürünler arasından rastgele 2 tane seçer (Yeni ürünler dahil)
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(2);
      }, 2500);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setCurrentQuestion(0);
  };

  return (
    // scroll-mt-24 eklendi: Kaydırma yapıldığında Header'ın altında kalmaması için
    <section id="ai-quiz" className="py-24 bg-gray-50 dark:bg-[#0a0f1c] transition-colors duration-500 relative overflow-hidden scroll-mt-24">
      {/* Arka plan hafif neon efektleri */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5aacf0] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 dark:opacity-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a78bfa] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 dark:opacity-10 animate-pulse delay-1000"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {step === 0 ? (
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            
            {/* HAFİF ANİMASYONLU AI SİMGESİ */}
            <div className="relative w-28 h-28 mx-auto mb-10">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5aacf0] to-[#a78bfa] rounded-full blur-xl opacity-30 dark:opacity-50 animate-pulse"></div>
              <div className="relative w-full h-full bg-white dark:bg-[#111827] border border-gray-100 dark:border-white/10 rounded-full flex items-center justify-center shadow-2xl animate-[bounce_3s_ease-in-out_infinite]">
                 <Icon name="SparklesIcon" size={48} className="text-[#5aacf0] dark:text-[#a78bfa]" />
              </div>
            </div>

            <h3 className="text-5xl font-black text-[#1a1a2e] dark:text-white mb-6 tracking-tighter transition-colors">AI Stil Analizi</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg transition-colors">5 soruda tarzına en uygun teknolojik ekosistemi belirleyelim.</p>
            <button onClick={() => setStep(1)} className="px-12 py-5 bg-[#1a1a2e] dark:bg-white text-white dark:text-black rounded-[24px] font-bold shadow-[0_10px_30px_rgba(90,172,240,0.2)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:-translate-y-1 hover:scale-105 transition-all duration-300">
              Analizi Başlat
            </button>
          </div>
        ) : step === 1 ? (
          <div className="max-w-xl mx-auto bg-white dark:bg-[#111827] p-10 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-2xl transition-colors">
            {loading ? (
              <div className="py-20 text-center animate-fade-in">
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-[#5aacf0]/30 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[#5aacf0] border-t-transparent rounded-full animate-spin"></div>
                  <Icon name="CpuChipIcon" size={32} className="absolute inset-0 m-auto text-[#a78bfa] animate-pulse" />
                </div>
                <p className="font-bold text-[#1a1a2e] dark:text-white animate-pulse italic transition-colors">Stilin analiz ediliyor...</p>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-8">
                   <span className="text-xs font-bold text-[#5aacf0] uppercase tracking-widest">Soru {currentQuestion + 1} / 5</span>
                   <div className="w-32 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#5aacf0] to-[#a78bfa] rounded-full transition-all duration-500" style={{ width: `${(currentQuestion + 1) * 20}%` }}></div>
                   </div>
                </div>
                <h4 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-8 leading-tight transition-colors">{quizQuestions[currentQuestion].question}</h4>
                <div className="space-y-4">
                  {quizQuestions[currentQuestion].options.map((opt) => (
                    <button key={opt} onClick={handleNext} className="w-full p-5 text-left rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-transparent hover:bg-[#5aacf0]/10 dark:hover:bg-white/5 hover:border-[#5aacf0]/50 dark:hover:border-white/10 transition-all duration-300 font-medium text-gray-700 dark:text-gray-300">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white/80 dark:bg-[#111827]/80 backdrop-blur-2xl p-10 rounded-[40px] border border-gray-100 dark:border-white/5 animate-fade-in text-center max-w-4xl mx-auto shadow-2xl transition-colors">
            
            <div className="w-16 h-16 bg-gradient-to-tr from-[#5aacf0] to-[#a78bfa] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
               <Icon name="CheckIcon" size={32} className="text-white" />
            </div>

            <h2 className="text-4xl font-black text-[#1a1a2e] dark:text-white mb-2 tracking-tighter transition-colors">Senin İçin Seçtiklerimiz</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-10 transition-colors">Yapay zeka asistanımız karakterine en uygun ürünleri eşleştirdi.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {getRecommendedProducts().map((product) => (
                <div key={product.id} className="bg-white dark:bg-[#0a0f1c]/50 p-8 rounded-[32px] border border-gray-100 dark:border-white/5 flex flex-col items-center group transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative w-32 h-32 mb-6">
                    <div className="absolute inset-0 bg-[#5aacf0] rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <img src={product.image} alt={product.name} className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h4 className="font-bold text-[#1a1a2e] dark:text-white mb-2 transition-colors">{product.name}</h4>
                  <p className="text-[#5aacf0] font-black mb-6 text-xl">₺{product.price.toLocaleString('tr-TR')}</p>
                  <button 
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                    className="w-full py-4 bg-[#1a1a2e] dark:bg-white text-white dark:text-black rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-md"
                  >
                    Sepete Ekle
                  </button>
                </div>
              ))}
            </div>
            <button onClick={resetQuiz} className="text-sm font-bold text-gray-400 hover:text-[#5aacf0] transition-colors">Testi Baştan Çöz</button>
          </div>
        )}
      </div>
    </section>
  );
}