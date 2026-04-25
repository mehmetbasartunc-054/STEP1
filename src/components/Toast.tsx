"use client";
import React, { useEffect } from "react";
import Icon from "./ui/AppIcon";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3 saniye sonra otomatik kapanır
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-24 right-6 z-[200] animate-fade-in-up">
      <div className="bg-white border border-gray-100 shadow-[0_10px_30px_rgba(90,172,240,0.2)] rounded-2xl p-4 flex items-center gap-3 min-w-[280px]">
        <div className="w-10 h-10 bg-green-100 text-green-500 rounded-full flex items-center justify-center shrink-0">
          <Icon name="CheckIcon" size={20} />
        </div>
        <div className="flex-1">
          <p className="text-[14px] font-bold text-[#1a1a2e]">Başarılı!</p>
          <p className="text-[12px] text-gray-500">{message}</p>
        </div>
        <button onClick={onClose} className="text-gray-300 hover:text-gray-500 transition-colors">
          <Icon name="XMarkIcon" size={16} />
        </button>
      </div>
    </div>
  );
}