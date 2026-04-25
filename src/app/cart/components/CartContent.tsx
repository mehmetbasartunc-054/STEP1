"use client";
import React from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";

export default function CartContent() {
  const cart = useCart() as any;
  const currentItems = cart.cartItems || cart.items || [];
  const removeItem = cart.removeItem || cart.removeFromCart;
  const totalPrice = cart.totalPrice || 0;
  const updateQuantity = cart.updateQuantity;

  if (currentItems.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center animate-fade-in-up">
        <div className="w-32 h-32 mx-auto bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-8 shadow-inner">
          <Icon name="ShoppingBagIcon" size={64} className="text-gray-300 dark:text-gray-600" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] dark:text-white mb-4 tracking-tighter">
          Sepetin Şu An Çok <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5aacf0] to-[#a78bfa]">Sessiz.</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 max-w-lg mx-auto">
          Gerçek ritmini bulmak için sınırları zorlayan teknolojik parçaları keşfet. Enerjini yansıtacak cihazlar seni bekliyor!
        </p>
        <Link href="/homepage#products" className="inline-flex items-center gap-2 px-10 py-5 bg-[#1a1a2e] dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
          <Icon name="BoltIcon" size={20} /> Ritmi Yakala
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 animate-fade-in">
      <h2 className="text-4xl font-black text-[#1a1a2e] dark:text-white mb-10 tracking-tighter">Sepetim</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Ürün Listesi */}
        <div className="lg:col-span-2 space-y-6">
          {currentItems.map((item: any, idx: number) => (
            <div key={idx} className="flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-[#111827] p-6 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-md group transition-all hover:shadow-xl">
              <div className="w-24 h-24 bg-gray-50 dark:bg-black/50 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-lg text-[#1a1a2e] dark:text-white">{item.name}</h3>
                <p className="text-[#5aacf0] font-black text-xl mt-1">₺{item.price.toLocaleString('tr-TR')}</p>
              </div>

              {/* MİKTAR SEÇİCİ */}
              <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-2 rounded-2xl border dark:border-white/10">
                <button 
                  onClick={() => updateQuantity ? updateQuantity(item.id, (item.quantity || 1) - 1) : removeItem(item.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 text-[#1a1a2e] dark:text-white shadow-sm hover:bg-red-50 dark:hover:bg-red-500/20 transition-colors"
                >
                  <Icon name="MinusIcon" size={14} />
                </button>
                <span className="font-bold min-w-[20px] text-center dark:text-white">{item.quantity || 1}</span>
                <button 
                  onClick={() => updateQuantity && updateQuantity(item.id, (item.quantity || 1) + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 text-[#1a1a2e] dark:text-white shadow-sm hover:bg-green-50 dark:hover:bg-green-500/20 transition-colors"
                >
                  <Icon name="PlusIcon" size={14} />
                </button>
              </div>

              <button onClick={() => removeItem(item.id)} className="w-12 h-12 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                <Icon name="TrashIcon" size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* TUTAR PANELİ */}
        <div className="bg-white dark:bg-[#111827] p-8 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-2xl h-fit sticky top-32">
          <h3 className="text-2xl font-black text-[#1a1a2e] dark:text-white mb-8 tracking-tighter flex items-center gap-2">
            <Icon name="ClipboardDocumentCheckIcon" size={24} className="text-[#5aacf0]" />
            Sipariş Özeti
          </h3>

          <div className="space-y-5 mb-8">
            <div className="flex justify-between items-center group">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Ara Toplam</span>
              <span className="font-bold text-[#1a1a2e] dark:text-white">₺{totalPrice.toLocaleString('tr-TR')}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-[#2ec4a0]/5 dark:bg-[#2ec4a0]/10 rounded-2xl border border-[#2ec4a0]/20">
              <div className="flex flex-col">
                <span className="text-[#2ec4a0] font-bold text-sm">Gençlik Fırsatı ⚡</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Kargo Bedava</span>
              </div>
              <span className="text-[#2ec4a0] font-black uppercase text-sm">Bedava</span>
            </div>
            
            <div className="h-px bg-gray-100 dark:bg-white/5 my-2" />

            <div className="flex justify-between items-end">
              <span className="text-gray-400 text-sm font-medium mb-1">Ödenecek Tutar</span>
              <span className="text-4xl font-black text-[#1a1a2e] dark:text-white tracking-tighter leading-none">
                ₺{totalPrice.toLocaleString('tr-TR')}
              </span>
            </div>
          </div>

          <Link 
            href="/checkout" 
            className="w-full py-5 bg-[#1a1a2e] text-white dark:bg-white dark:text-black rounded-3xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)]"
          >
            Güvenli Ödemeye Geç 
            <Icon name="ArrowRightIcon" size={18} />
          </Link>
          
          <p className="text-center text-[10px] text-gray-400 mt-6 font-medium flex items-center justify-center gap-2 opacity-60 uppercase tracking-tighter">
            <Icon name="ShieldCheckIcon" size={14} className="text-[#2ec4a0]" /> 
            256-Bit SSL Güvenli Ödeme
          </p>
        </div>
      </div>
    </div>
  );
}