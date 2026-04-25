"use client";
import React, { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";
import { useCart } from "@/context/CartContext";

const initialForm = {
  firstName: "", lastName: "", address: "", city: "", zip: "",
  cardNumber: "", cardExpiry: "", cardCvc: "", cardName: ""
};

const VALID_COUPONS: Record<string, number> = {
  "INDIRIM10": 10,
  "HOSGELDIN": 15,
  "YAZA20": 20,
};

export default function CheckoutContent() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  // Kupon kodu state'leri
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const shipping = totalPrice >= 2500 ? 0 : 49.9;
  const giftPrice = isGift ? 25 : 0;
  const grandTotal = totalPrice + giftPrice + shipping - couponDiscount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === "cardNumber") formatted = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    if (name === "cardExpiry") formatted = value.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");
    if (name === "cardCvc") formatted = value.replace(/\D/g, "").slice(0, 3);
    setForm(prev => ({ ...prev, [name]: formatted }));
  };

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (appliedCoupon) return;
    if (VALID_COUPONS[code]) {
      const discountPercent = VALID_COUPONS[code];
      const discountAmount = (totalPrice * discountPercent) / 100;
      setAppliedCoupon(code);
      setCouponDiscount(discountAmount);
      setCouponError("");
    } else {
      setCouponError("Geçersiz kupon kodu.");
      setCouponDiscount(0);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponInput("");
    setCouponError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // 2 saniye boyunca ödeme işleniyor simülasyonu
    setTimeout(() => {
      setLoading(false);      
      setIsSuccess(true);     // Başarı ekranını göster
      
      // ✅ SAYFAYI EN TEPEYE KAYDIR (YENİ EKLEDİK)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      if(clearCart) clearCart(); // Sepeti boşalt
    }, 2000);
  };
  // 1. ÖNCELİK: EĞER SİPARİŞ BAŞARILIYSA KESİNLİKLE BU EKRAN ÇIKAR
  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center animate-fade-in-up">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-[#2ec4a0] rounded-full blur-2xl opacity-40 animate-pulse"></div>
          <div className="relative w-full h-full bg-white dark:bg-[#111827] border-4 border-[#2ec4a0] rounded-full flex items-center justify-center shadow-2xl">
            <Icon name="CheckIcon" size={64} className="text-[#2ec4a0]" />
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] dark:text-white mb-4 tracking-tighter">
          Enerji Paketin <br/> <span className="text-[#2ec4a0]">Hazırlanıyor!</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-lg mx-auto">
          Siparişini aldık. Lumina Tech ekosistemine hoş geldin! Ürünlerin ışık hızında kargoya verilecek.
        </p>
        <div className="inline-block bg-gray-100 dark:bg-white/5 px-6 py-4 rounded-2xl font-mono text-sm text-gray-500 mb-10 border border-gray-200 dark:border-white/10 shadow-inner">
          Sipariş Numaran: <span className="font-bold text-[#5aacf0]">#LMN-{Math.floor(Math.random() * 90000) + 10000}</span>
        </div>
        <br/>
        <Link href="/homepage" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a2e] dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
          <Icon name="HomeIcon" size={20} /> Ana Kampa Dön
        </Link>
      </div>
    );
  }

  // 2. ÖNCELİK: SEPET BOŞSA (Ve sipariş yeni verilmediyse) BU EKRAN ÇIKAR
  if (!items || items.length === 0) {
    return (
      <div className="max-w-[800px] mx-auto py-20 px-5 text-center animate-fade-in">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <Icon name="ShoppingCartIcon" size={40} className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold dark:text-white mb-3">Sepetiniz Boş</h2>
        <p className="text-gray-400 text-sm mb-8">Ödeme yapabilmek için sepetinize ürün eklemeniz gerekiyor.</p>
        <Link href="/homepage" className="px-10 py-4 bg-gradient-to-r from-[#5aacf0] to-[#2ec4a0] text-white rounded-full font-bold shadow-lg hover:scale-105 transition-all inline-block">
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  // 3. ÖNCELİK: NORMAL ÖDEME FORMU
  return (
    <div className="max-w-[1100px] mx-auto px-5 py-10">
      <style>{`
        .card-container { perspective: 1000px; }
        .card-inner { position: relative; width: 100%; height: 210px; transition: transform 0.8s; transform-style: preserve-3d; }
        .card-front, .card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 1.5rem; }
        .card-back { transform: rotateY(180deg); }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
        
        {/* SOL KOLON: ADRES VE ÖDEME */}
        <div className="flex-1 space-y-8">

          {/* TESLİMAT BİLGİLERİ */}
          <div className="bg-white dark:bg-[#111827] p-8 rounded-[32px] border dark:border-gray-800 shadow-sm transition-colors">
            <h2 className="text-xl font-bold dark:text-white mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5aacf0]/10 text-[#5aacf0] flex items-center justify-center"><Icon name="MapPinIcon" size={20} /></div>
              Teslimat Bilgileri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input required name="firstName" placeholder="Ad" onChange={handleChange} className="px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-[#5aacf0] dark:text-white" />
              <input required name="lastName" placeholder="Soyad" onChange={handleChange} className="px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-[#5aacf0] dark:text-white" />
              <textarea required name="address" placeholder="Açık Adres" onChange={handleChange} className="px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-[#5aacf0] dark:text-white md:col-span-2 min-h-[100px]" />
              <input required name="city" placeholder="Şehir" onChange={handleChange} className="px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-[#5aacf0] dark:text-white" />
              <input required name="zip" placeholder="Posta Kodu" onChange={handleChange} className="px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-[#5aacf0] dark:text-white" />
            </div>
            <div className="mt-6 pt-6 border-t dark:border-gray-800">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={sameAsShipping} onChange={() => setSameAsShipping(!sameAsShipping)} className="w-5 h-5 accent-[#2ec4a0]" />
                <span className="text-sm dark:text-gray-400 group-hover:text-white transition-colors font-medium">Fatura adresim teslimat adresiyle aynı olsun</span>
              </label>
            </div>
          </div>

          {/* ÖDEME BİLGİLERİ */}
          <div className="bg-white dark:bg-[#111827] p-8 rounded-[32px] border dark:border-gray-800 shadow-sm transition-colors">
            <h2 className="text-xl font-bold dark:text-white mb-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#a78bfa]/10 text-[#a78bfa] flex items-center justify-center"><Icon name="CreditCardIcon" size={20} /></div>
              Ödeme Bilgileri
            </h2>

            {/* 3D KART GÖRSELİ */}
            <div className="card-container w-full h-[210px] max-w-sm mx-auto mb-12">
              <div className={`card-inner ${form.cardCvc !== "" ? "rotate-y-180" : ""}`}>
                <div className="card-front p-8 bg-gradient-to-br from-[#1a1a2e] to-[#4a4a8e] text-white shadow-2xl flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="flex justify-between items-start"><div className="w-12 h-9 bg-yellow-500/30 rounded-md border border-yellow-500/50"></div><Icon name="CreditCardIcon" size={32} className="opacity-40" /></div>
                  <p className="text-[20px] font-mono tracking-[0.15em] py-4">{form.cardNumber || "•••• •••• •••• ••••"}</p>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest opacity-70">
                    <div><p className="mb-1 text-[8px]">Kart Sahibi</p><p className="text-sm font-bold uppercase">{form.cardName || "İSİM SOYİSİM"}</p></div>
                    <div><p className="mb-1 text-[8px]">SGT</p><p className="text-sm font-bold">{form.cardExpiry || "AA/YY"}</p></div>
                  </div>
                </div>
                <div className="card-back p-8 bg-gradient-to-br from-[#2a2a4e] to-[#1a1a2e] text-white shadow-2xl relative overflow-hidden flex flex-col justify-center items-end">
                  <div className="w-full h-12 bg-black/40 absolute top-6 left-0"></div>
                  <div className="mt-8 flex flex-col items-end mr-4">
                    <p className="text-[9px] uppercase opacity-60 mb-1">CVV</p>
                    <div className="w-20 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-mono text-black font-bold tracking-widest">
                      {form.cardCvc || "•••"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input required name="cardName" placeholder="Kart Sahibi" onChange={handleChange} className="px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-[#a78bfa] dark:text-white md:col-span-2 uppercase" />
              <input required name="cardNumber" value={form.cardNumber} placeholder="Kart Numarası" onChange={handleChange} className="px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-[#a78bfa] dark:text-white md:col-span-2 font-mono" />
              <input required name="cardExpiry" value={form.cardExpiry} placeholder="AA/YY" onChange={handleChange} className="px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-[#a78bfa] dark:text-white" />
              <input required name="cardCvc" value={form.cardCvc} placeholder="CVV" onChange={handleChange} type="text" inputMode="numeric" className="px-5 py-3.5 bg-gray-50 dark:bg-gray-900 border dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-[#a78bfa] dark:text-white" />
            </div>
          </div>
        </div>

        {/* SAĞ KOLON: SİPARİŞ ÖZETİ */}
        <div className="w-full lg:w-[380px]">
          <div className="bg-gray-50 dark:bg-[#111827] p-8 rounded-[40px] border dark:border-gray-800 sticky top-32 transition-colors">
            <h2 className="text-xl font-bold dark:text-white mb-8">Sipariş Özeti</h2>

            {/* ÜRÜN LİSTESİ */}
            <div className="mb-6 space-y-2">
              {items.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between gap-3 py-2 border-b dark:border-gray-800 last:border-0">
                  <p className="text-sm dark:text-white font-medium truncate flex-1">{item.name}</p>
                  <p className="text-sm text-gray-500 whitespace-nowrap">{(item.price * item.quantity).toLocaleString('tr-TR')} TL</p>
                </div>
              ))}
            </div>

            {/* HEDİYE PAKETİ */}
            <div className="mb-6 p-5 bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800">
              <label className="flex items-center gap-4 cursor-pointer">
                <input type="checkbox" checked={isGift} onChange={(e) => setIsGift(e.target.checked)} className="w-5 h-5 accent-[#a78bfa]" />
                <div>
                  <p className="text-sm font-bold dark:text-white">🎁 Hediye Paketi</p>
                  <p className="text-[11px] text-[#a78bfa] font-bold">+25,00 TL</p>
                </div>
              </label>
              {isGift && (
                <div className="mt-5 animate-fade-in">
                  <textarea placeholder="Hediye notunuzu yazın..." className="w-full p-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl text-xs dark:text-white outline-none resize-none transition-all focus:ring-1 focus:ring-[#a78bfa]" rows={3} />
                </div>
              )}
            </div>

            {/* KUPON KODU PANELİ */}
            <div className="mb-6 p-5 bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800">
              <p className="text-sm font-bold dark:text-white mb-3 flex items-center gap-2">
                <span>🏷️</span> Kupon Kodu
              </p>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-xs font-bold text-green-600 dark:text-green-400">{appliedCoupon} uygulandı 🎉</p>
                    <p className="text-[11px] text-green-500">-{couponDiscount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL indirim</p>
                  </div>
                  <button type="button" onClick={handleRemoveCoupon} className="text-gray-400 hover:text-red-400 transition-colors text-xs font-bold">✕ Kaldır</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => { setCouponInput(e.target.value); setCouponError(""); }}
                    placeholder="Kupon kodunu girin"
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl text-sm dark:text-white outline-none focus:ring-2 focus:ring-[#a78bfa] uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2.5 bg-[#a78bfa] text-white rounded-xl text-sm font-bold hover:bg-[#9170e8] transition-colors"
                  >
                    Uygula
                  </button>
                </div>
              )}
              {couponError && <p className="text-[11px] text-red-400 mt-2 font-medium">{couponError}</p>}
            </div>

            {/* FİYAT ÖZETİ */}
            <div className="space-y-4 pt-4 border-t dark:border-gray-800">
              <div className="flex justify-between text-gray-500 text-sm"><span>Ürünler</span><span>{totalPrice.toLocaleString('tr-TR')} TL</span></div>
              {isGift && <div className="flex justify-between text-[#a78bfa] text-sm font-bold"><span>Hediye Paketi</span><span>+25,00 TL</span></div>}
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-500 text-sm font-bold">
                  <span>Kupon İndirimi</span>
                  <span>-{couponDiscount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500 text-sm"><span>Kargo</span><span className={shipping === 0 ? "text-green-500 font-bold" : "dark:text-white"}>{shipping === 0 ? "Ücretsiz" : "49,90 TL"}</span></div>
              <div className="flex justify-between pt-6 border-t dark:border-gray-800 font-bold text-2xl dark:text-white tracking-tighter"><span>Toplam</span><span>{grandTotal.toLocaleString('tr-TR')} TL</span></div>
            </div>

            <button type="submit" disabled={loading} className="w-full mt-10 py-5 bg-gradient-to-r from-[#5aacf0] via-[#2ec4a0] to-[#a78bfa] text-white rounded-3xl font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
              {loading ? "Siparişiniz İşleniyor..." : "Siparişi Tamamla"}
              <Icon name="ArrowRightIcon" size={20} />
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-6 font-medium flex items-center justify-center gap-2 opacity-60"><Icon name="ShieldCheckIcon" size={14} /> GÜVENLİ SSL ÖDEME ALTYAPISI</p>
          </div>
        </div>

      </form>
    </div>
  );
}