"use client";
import React, { useState } from "react";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Sayfayı yenilemek (reload) yerine, 2 saniye sonra sadece formu kapatıyoruz!
      setTimeout(() => {
        setIsOpen(false);
        // Formu bir sonraki açılış için sıfırla
        setTimeout(() => setIsSuccess(false), 300);
      }, 2000);
    }, 1500);
  };
  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100] group">
        {!isOpen && (
          // HOVER BALONCUĞU: bg-white -> dark:bg-[#111827]
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2.5 bg-white dark:bg-[#111827] text-[#1a1a2e] dark:text-white text-[14px] font-medium rounded-2xl shadow-[0_8px_24px_rgba(90,172,240,0.15)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 whitespace-nowrap border border-gray-100 dark:border-gray-800">
            Bir Sorun mu var? Bize Ulaş!
          </div>
        )}

        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_8px_24px_rgba(90,172,240,0.4)] hover:scale-110 active:scale-95 transition-all duration-300"
          style={{ background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)" }}
          aria-label="Bize Ulaşın"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => !isSubmitting && setIsOpen(false)}
          ></div>

          {/* FORM KUTUSU: bg-white -> dark:bg-[#111827] */}
          <div className="relative bg-white dark:bg-[#111827] rounded-2xl w-full max-w-md p-6 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fade-in-up border border-transparent dark:border-gray-800 transition-colors duration-500">
            <button 
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors disabled:opacity-50"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>

            <h2 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2 transition-colors">Bize Ulaşın</h2>
            <p className="text-[#8a8aaa] dark:text-gray-400 text-sm mb-6 transition-colors">
              Sorularınız veya geri bildirimleriniz için formu doldurun, size en kısa sürede dönüş yapalım.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Adınız</label>
                  <input required type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5aacf0] text-sm disabled:bg-gray-50 dark:disabled:bg-gray-800 transition-colors" placeholder="Ad" disabled={isSubmitting || isSuccess} />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Soyadınız</label>
                  <input required type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5aacf0] text-sm disabled:bg-gray-50 dark:disabled:bg-gray-800 transition-colors" placeholder="Soyad" disabled={isSubmitting || isSuccess} />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">E-posta Adresiniz</label>
                <input required type="email" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5aacf0] text-sm disabled:bg-gray-50 dark:disabled:bg-gray-800 transition-colors" placeholder="ornek@mail.com" disabled={isSubmitting || isSuccess} />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Konu</label>
                <input required type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5aacf0] text-sm disabled:bg-gray-50 dark:disabled:bg-gray-800 transition-colors" placeholder="Sipariş durumu, iade vb." disabled={isSubmitting || isSuccess} />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Mesajınız</label>
                <textarea required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5aacf0] text-sm min-h-[100px] resize-none disabled:bg-gray-50 dark:disabled:bg-gray-800 transition-colors" placeholder="Bize detaylıca bahsedin..." disabled={isSubmitting || isSuccess}></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                className={`w-full py-3 mt-2 rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${isSuccess ? "bg-green-500 hover:bg-green-600 shadow-green-500/30" : ""}`}
                style={!isSuccess ? { background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)" } : {}}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Gönderiliyor...
                  </>
                ) : isSuccess ? (
                  <>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    Mesajınız Alındı! 🚀
                  </>
                ) : "Mesajı Gönder"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}