"use client";
import React, { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";

const products = [
  // — Dosya 2'nin orijinal ürünleri —
  {
    id: "aura-wristband",
    name: "Aura Wristband",
    tagline: "Akıllı Bileklik",
    price: 1299,
    originalPrice: 1599,
    badge: "Yeni",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    features: ["Aktivite Takibi", "Su Geçirmez", "LED Ekran"],
    accentColor: "#5aacf0",
    category: "akilli-saatler"
  },
  {
    id: "sonic-buds",
    name: "Sonic Buds",
    tagline: "TWS Kulaklık",
    price: 899,
    originalPrice: 1199,
    badge: "Çok Satan",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop",
    features: ["Aktif Gürültü Engelleme", "24 Saat Pil", "Hızlı Şarj"],
    accentColor: "#a78bfa",
    category: "hoparlor"
  },
  {
    id: "nova-speaker",
    name: "Nova Speaker",
    tagline: "Taşınabilir Hoparlör",
    price: 1599,
    originalPrice: 1999,
    badge: "Popüler",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop",
    features: ["360° Ses", "RGB Aydınlatma", "IPX5 Koruma"],
    accentColor: "#2ec4a0",
    category: "hoparlor"
  },
  {
    id: "samsung-galaxy-watch-8",
    name: "Samsung Galaxy Watch 8",
    tagline: "Next-Gen Akıllı Saat",
    price: 8999,
    originalPrice: 10999,
    badge: "Limited Edition",
    image: "/assets/images/shopping__1_-1777058806780.webp",
    features: ["BioActive Sensor", "Dual-Band GPS", "Titanium Case"],
    accentColor: "#5aacf0",
    category: "akilli-saatler"
  },
  {
    id: "onvo-ov012-x-plus",
    name: "Onvo OV-012 X Plus",
    tagline: "Elite City Scooter",
    price: 12999,
    originalPrice: 15999,
    badge: "Yüksek Performans",
    image: "/assets/images/shopping__1_-1777059056888.webp",
    features: ["Dual Suspension", "Smart BMS", "OLED Dashboard"],
    accentColor: "#2ec4a0",
    category: "scooter"
  },
  {
    id: "valve-index-vr-kit-2",
    name: "Valve Index VR KIT",
    tagline: "Professional VR System",
    price: 24999,
    originalPrice: 27999,
    badge: "E-Sport Ready",
    image: "/assets/images/shopping__1_-1777059597581.webp",
    features: ["Off-ear Audio", "Wide FOV", "Precision Tracking"],
    accentColor: "#6366f1",
    category: "vr"
  },
  {
    id: "jbl-boombox-3",
    name: "JBL Boombox 3",
    tagline: "Massive Bass Audio",
    price: 9999,
    originalPrice: 12999,
    badge: "Party Master",
    image: "/assets/images/shopping-1777059836243.webp",
    features: ["3-Way Speaker", "Subwoofer", "IP67 Rated"],
    accentColor: "#ef4444",
    category: "hoparlor"
  },
  {
    id: "razer-ornata-v3",
    name: "Razer Ornata V3",
    tagline: "Mecha-Membrane Keyboard",
    price: 1899,
    originalPrice: 2499,
    badge: "Ultra-Slim",
    image: "/assets/images/shopping__2_-1777060190645.webp",
    features: ["Media Keys", "Chroma RGB", "Magnetic Rest"],
    accentColor: "#22c55e",
    category: "klavye"
  },
  {
    id: "hawk-hm420",
    name: "Hawk Gaming HM420",
    tagline: "4K Polling Mouse",
    price: 1499,
    originalPrice: 1999,
    badge: "26K DPI",
    image: "/assets/images/41fdGX8I5QL._AC_SX679_-1777060572109.jpg",
    features: ["PAW3395 Sensor", "Lightweight", "Tri-Mode"],
    accentColor: "#0ea5e9",
    category: "fare"
  },

  // — Dosya 1'den eklenen yeni ürünler (dosya 2'de olmayanlar) —
  {
    id: "comax-watch-x5",
    name: "Comax Watch X5",
    tagline: "Akıllı Saat",
    price: 2499,
    originalPrice: 3299,
    badge: "Yeni",
    image: "/assets/images/shopping__2_-1777058806305.webp",
    features: ["Bildirim Desteği", "Spor Modları", "7 Gün Pil"],
    accentColor: "#2ec4a0",
    category: "akilli-saatler"
  },
  {
    id: "cocuk-bilekligi",
    name: "Çocuk Bilekliği",
    tagline: "Çocuklar İçin Akıllı Bileklik",
    price: 799,
    originalPrice: 1099,
    badge: "Popüler",
    image: "/assets/images/shopping__3_-1777058806333.webp",
    features: ["Adım Sayar", "Uyku Takibi", "Renkli Ekran"],
    accentColor: "#f97316",
    category: "akilli-saatler"
  },
  {
    id: "powerway-wrx01",
    name: "Powerway Wrx01",
    tagline: "90 dB Ses Bombası FM Radyo",
    price: 799,
    originalPrice: 1199,
    badge: "Ses Bombası",
    image: "/assets/images/shopping__1_-1777059836320.webp",
    features: ["SD Kart", "AUX/USB Giriş", "FM Radyo"],
    accentColor: "#ef4444",
    category: "hoparlor"
  },
  {
    id: "jbl-go-essential",
    name: "JBL Go Essential",
    tagline: "Bluetooth Hoparlör",
    price: 649,
    originalPrice: 899,
    badge: "Çok Satılan",
    image: "/assets/images/shopping__2_-1777059835290.webp",
    features: ["5h Pil", "IPX5 Su Geçirmez", "Kompakt Tasarım"],
    accentColor: "#2ec4a0",
    category: "hoparlor"
  },
  {
    id: "samsung-galaxy-s23-ultra-watch",
    name: "Samsung Galaxy S23 Ultra Uyumlu Akıllı Saat",
    tagline: "Konuşma Özellikli Watch 45mm Amoled",
    price: 1999,
    originalPrice: 2799,
    badge: "Trend",
    image: "/assets/images/shopping__8_-1777063662879.webp",
    features: ["Konuşma Özellikli", "45mm AMOLED", "Samsung Uyumlu"],
    accentColor: "#a78bfa",
    category: "akilli-saatler"
  },
  {
    id: "dualtron-man",
    name: "Dualtron Man",
    tagline: "Yüksek Performans",
    price: 24999,
    originalPrice: 29999,
    badge: "Premium",
    image: "/assets/images/shopping__3_-1777059057601.webp",
    features: ["100km Menzil", "50km/h Hız", "Çift Motor"],
    accentColor: "#10b981",
    category: "scooter"
  },
  {
    id: "xiaomi-mi-pro-2",
    name: "Xiaomi Mi Pro 2",
    tagline: "Akıllı Sürüş Deneyimi",
    price: 9499,
    originalPrice: 11999,
    badge: "Trend",
    image: "/assets/images/shopping-1777059056912.webp",
    features: ["45km Menzil", "25km/h Hız", "App Kontrol"],
    accentColor: "#10b981",
    category: "scooter"
  },
  {
    id: "bood-kickscooter-q500",
    name: "Bood Kickscooter Q500",
    tagline: "Konforlu Şehir Ulaşımı",
    price: 7999,
    originalPrice: 9999,
    badge: "Popüler",
    image: "/assets/images/shopping__5_-1777059208057.webp",
    features: ["50km Menzil", "28km/h Hız", "Geniş Teker"],
    accentColor: "#10b981",
    category: "scooter"
  },
  {
    id: "citymate-65-hoverboard",
    name: "Citymate Bluetooth Hoparlörlü 6.5 Hoverboard",
    tagline: "Akıllı Dengeli Hoverboard",
    price: 3499,
    originalPrice: 4999,
    badge: "Yeni",
    image: "/assets/images/shopping__3_-1777059417135.webp",
    features: ["Bluetooth Hoparlör", "LED Işıklar", "6.5\" Teker"],
    accentColor: "#ec4899",
    category: "hoverboard"
  },
  {
    id: "bluetooth-hoverboard-kids",
    name: "Bluetooth Hoverboard for Children",
    tagline: "Çocuklar İçin Işıklı Hoverboard",
    price: 3799,
    originalPrice: 4999,
    badge: "Popüler",
    image: "/assets/images/shopping__9_-1777063862754.webp",
    features: ["Bluetooth Hoparlör", "LED Işıklar", "Çocuk Dostu"],
    accentColor: "#ec4899",
    category: "hoverboard"
  },
  {
    id: "zinc-megastar-hoverboard-blue",
    name: "Zinc Megastar LED Lights Hoverboard",
    tagline: "Mavi LED Işıklı Hoverboard",
    price: 4299,
    originalPrice: 5799,
    badge: "Trend",
    image: "/assets/images/shopping__5_-1777059412222.webp",
    features: ["Bluetooth Hoparlör", "Mavi LED", "Dengeli Sürüş"],
    accentColor: "#ec4899",
    category: "hoverboard"
  },
  {
    id: "citymate-hoverboard",
    name: "Citymate Bluetooth Hoparlörlü Hoverboard",
    tagline: "Akıllı Dengeli Hoverboard",
    price: 2999,
    originalPrice: 4299,
    badge: "Eğlenceli",
    image: "/assets/images/shopping-1777059418700.webp",
    features: ["Bluetooth Hoparlör", "Akıllı Denge", "15km Menzil"],
    accentColor: "#ec4899",
    category: "hoverboard"
  },
  {
    id: "vr-shinecon-g04ea-1",
    name: "VR Shinecon G04ea Sanal Gerçeklik Gözlüğü",
    tagline: "VR Gözlük",
    price: 1299,
    originalPrice: 1799,
    badge: "Yeni",
    image: "/assets/images/shopping__6_-1777064117918.webp",
    features: ["Bluetooth Kumanda", "Kablosuz", "Geniş Uyumluluk"],
    accentColor: "#6366f1",
    category: "vr"
  },
  {
    id: "htc-vive-focus-vision-1",
    name: "HTC Vive Focus Vision Sanal Gerçeklik Gözlüğü",
    tagline: "VR Gözlük",
    price: 22999,
    originalPrice: 25999,
    badge: "Premium",
    image: "/assets/images/shopping__2_-1777064206901.webp",
    features: ["4K+ Ekran", "Eye Tracking", "Standalone VR"],
    accentColor: "#003087",
    category: "vr"
  },
  {
    id: "sony-ps-vr2-2",
    name: "Sony Playstation VR2 Sanal Gerçeklik Gözlüğü",
    tagline: "VR Gözlük",
    price: 18999,
    originalPrice: 21999,
    badge: "Yeni",
    image: "/assets/images/shopping-1777059595471.webp",
    features: ["4K OLED", "Eye Tracking", "PS5 Uyumlu"],
    accentColor: "#003087",
    category: "vr"
  },
  {
    id: "boombox-3",
    name: "Boombox 3 Hoparlör",
    tagline: "Güçlü Taşınabilir Ses",
    price: 8999,
    originalPrice: 11999,
    badge: "Yeni",
    image: "/assets/images/shopping__3_-1777059836205.webp",
    features: ["24h Pil", "IPX7 Su Geçirmez", "PartyBoost"],
    accentColor: "#a78bfa",
    category: "hoparlor"
  },
  {
    id: "everest-parley",
    name: "Everest Parley Mekanik Gaming Klavyesi",
    tagline: "Mekanik Gaming Klavye",
    price: 1299,
    originalPrice: 1799,
    badge: "Oyuncu Tercihi",
    image: "/assets/images/shopping__1_-1777060190642.webp",
    features: ["Red Switch", "Rainbow RGB", "Türkçe Q"],
    accentColor: "#8b5cf6",
    category: "klavye"
  },
  {
    id: "rampage-kb-gx65",
    name: "Rampage Kb-Gx65 SIMULA RGB Klavye",
    tagline: "RGB Oyuncu Klavyesi",
    price: 899,
    originalPrice: 1299,
    badge: "Makro Tuşlu",
    image: "/assets/images/shopping__4_-1777060190581.webp",
    features: ["4 Makro Tuş", "RGB Aydınlatma", "Bilek Desteği"],
    accentColor: "#ef4444",
    category: "klavye"
  },
  {
    id: "membran-rainbow-beyaz",
    name: "Membran Switch Rainbow Led Klavye",
    tagline: "Rainbow LED Klavye",
    price: 599,
    originalPrice: 899,
    badge: "Rainbow LED",
    image: "/assets/images/shopping-1777060190684.webp",
    features: ["Rainbow LED", "Türkçe Q", "Membran Switch"],
    accentColor: "#f59e0b",
    category: "klavye"
  },
  {
    id: "hp-fm530a",
    name: "HP FM530A",
    tagline: "Bluetooth Wireless Sessiz Mouse",
    price: 649,
    originalPrice: 899,
    badge: "Sessiz",
    image: "/assets/images/shopping__1_-1777060572782.webp",
    features: ["1600 DPI", "Dual Mode", "Sessiz"],
    accentColor: "#0ea5e9",
    category: "fare"
  },
  {
    id: "rush-rm02",
    name: "Rush RM02",
    tagline: "RGB Aydınlatmalı Gaming Mouse",
    price: 399,
    originalPrice: 549,
    badge: "RGB",
    image: "/assets/images/shopping__4_-1777060572779.webp",
    features: ["1600 DPI", "RGB", "Gaming"],
    accentColor: "#0ea5e9",
    category: "fare"
  },
  {
    id: "rampage-smx-r44",
    name: "Rampage SMX-R44",
    tagline: "Makrolu Gaming Mouse",
    price: 549,
    originalPrice: 749,
    badge: "Makrolu",
    image: "/assets/images/shopping-1777060572784.webp",
    features: ["Makro", "RGB", "Gaming"],
    accentColor: "#0ea5e9",
    category: "fare"
  }
];

const categories = [
  { id: "all", label: "Tümü", emoji: "⚡" },
  { id: "akilli-saatler", label: "Saat", emoji: "⌚" },
  { id: "scooter", label: "Scooter", emoji: "🛴" },
  { id: "hoverboard", label: "Hoverboard", emoji: "🛹" },
  { id: "vr", label: "VR", emoji: "🥽" },
  { id: "hoparlor", label: "Ses", emoji: "🔊" },
  { id: "klavye", label: "Klavye", emoji: "⌨️" },
  { id: "fare", label: "Fare", emoji: "🖱️" }
];

function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group relative bg-white/70 dark:bg-[#111827]/70 backdrop-blur-2xl rounded-[32px] border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:-translate-y-2 flex flex-col h-full overflow-hidden">
      
      <div className="relative h-56 flex items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20" style={{ background: `radial-gradient(circle at center, ${product.accentColor} 0%, transparent 70%)` }}></div>
        <AppImage 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out" 
        />
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white shadow-xl" style={{ background: product.accentColor }}>
            {product.badge}
          </span>
        </div>
      </div>

      <div className="p-6 pt-2 flex flex-col flex-1">
        <div className="mb-3">
          <p className="text-[10px] font-bold uppercase tracking-tighter mb-1 opacity-50 dark:text-white" style={{ color: product.accentColor }}>{product.tagline}</p>
          <h3 className="text-lg font-bold dark:text-white leading-tight min-h-[56px] line-clamp-2">{product.name}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {product.features.map((f: string) => (
            <span key={f} className="text-[9px] font-bold px-2.5 py-1 rounded-lg bg-gray-100/50 dark:bg-white/5 dark:text-gray-400 border dark:border-white/5 transition-colors group-hover:border-white/20">
              {f}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t dark:border-white/5 pt-5">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through font-medium">₺{product.originalPrice.toLocaleString('tr-TR')}</span>
            <span className="text-xl font-black dark:text-white tracking-tighter">₺{product.price.toLocaleString('tr-TR')}</span>
          </div>
          
          <button 
            onClick={handleAdd} 
            className={`relative overflow-hidden w-12 h-12 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg active:scale-90 ${
              added ? 'bg-green-500 text-white' : 'bg-[#1a1a2e] dark:bg-white text-white dark:text-black hover:shadow-white/10'
            }`}
          >
            <Icon name={added ? "CheckIcon" : "PlusIcon"} size={20} />
            {added && <span className="absolute inset-0 bg-white/20 animate-ping"></span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredProducts = activeCategory === "all" ? products : products.filter(p => p.category === activeCategory);
  const [visibleCount, setVisibleCount] = useState(4);
    const displayProducts = filteredProducts.slice(0, visibleCount);
  return (
    <section id="products" className="py-24 bg-[#fdfcfb] dark:bg-[#0a0f1c] transition-colors duration-700">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase mb-6" style={{ background: "rgba(90,172,240,0.1)", color: "#5aacf0" }}>
              <span className="w-2 h-2 rounded-full bg-[#5aacf0] animate-pulse" /> Gençlik Enerjisi Seninle!
            </div>
            <h2 className="text-4xl md:text-6xl font-black dark:text-white mb-6 tracking-tighter leading-[1.1]">
              Ritmine <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0]">Ayak Uydur.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium max-w-xl leading-relaxed">
              Lumina Tech, sınırları zorlayan gençlerin yeni nesil teknoloji ekosistemidir. Tarzını yansıt, müziği hisset ve hayatın ritmini yakala. Çünkü en büyük enerji, senin içindeki enerji!
            </p>
          </div>

          <div className="flex flex-wrap gap-2 bg-gray-100/50 dark:bg-white/5 p-2 rounded-[24px] backdrop-blur-xl border dark:border-white/5">
            {categories.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeCategory === cat.id 
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-xl scale-105' 
                  : 'text-gray-500 hover:text-black dark:hover:text-white'
                }`}
              >
                <span className="text-sm">{cat.emoji}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* DAHA FAZLA GÖR BUTONU */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="group relative px-12 py-4 bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 rounded-full font-bold text-[#1a1a2e] dark:text-white hover:bg-[#1a1a2e] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 shadow-xl"
            >
              <span className="flex items-center gap-2">
                Daha Fazla Gör 
                <Icon name="ChevronDownIcon" size={18} className="group-hover:translate-y-1 transition-transform" />
              </span>
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-32 animate-pulse">
            <Icon name="BoltIcon" size={48} className="mx-auto text-[#5aacf0] mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">Bu kategorideki enerjiyi hala yüklüyoruz...</p>
          </div>
        )}
      </div>
    </section>
  );
}