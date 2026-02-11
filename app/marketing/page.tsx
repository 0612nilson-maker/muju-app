// 這裡是：智能招租 (Smart Marketing) - AI 廣告生成
'use client';

import React, { useState } from 'react';
import { ChevronLeft, Sparkles, Image as ImageIcon, Copy, Share2, Facebook, Instagram, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// 官方定案色票
const colors = {
  bgMain: '#F1EEEB', textPrimary: '#4B382A', textSecondary: '#8C7E74',
  accent: '#CFB3A9', cardBg: '#FFFFFF', highlight: '#E8B05C',
  fb: '#1877F2', ig: '#E1306C' // 社群平台色
};

export default function MarketingPage() {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  // 模擬 AI 生成過程
  const handleGenerate = () => {
    setIsPosting(true);
    setTimeout(() => {
        setIsGenerated(true);
        setIsPosting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen font-sans pb-24" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 導覽列 */}
      <header className="sticky top-0 z-20 px-5 h-16 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>智能招租</h1>
        <div className="w-10"></div>
      </header>

      {/* 2. 選擇房源區 */}
      <div className="px-5 py-4">
        <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: colors.textSecondary }}>1. 選擇推廣房源</h3>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {/* 房源卡片 (選中狀態) */}
            <div className="min-w-[140px] p-3 rounded-2xl border-2 bg-white relative cursor-pointer"
                 style={{ borderColor: colors.highlight }}>
                <div className="absolute top-2 right-2 text-[#E8B05C]"><CheckCircle2 size={16} /></div>
                <div className="w-full h-20 bg-[#F2F0EE] rounded-xl mb-2 flex items-center justify-center text-[#CFB3A9]">
                    <ImageIcon size={24} />
                </div>
                <p className="text-xs font-bold mb-1">文心館 305</p>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#FFF8F0] text-[#E8B05C]">閒置中</span>
            </div>

            {/* 房源卡片 (未選) */}
            <div className="min-w-[140px] p-3 rounded-2xl border border-transparent bg-white opacity-60 cursor-pointer">
                <div className="w-full h-20 bg-[#F2F0EE] rounded-xl mb-2 flex items-center justify-center text-[#CFB3A9]">
                    <ImageIcon size={24} />
                </div>
                <p className="text-xs font-bold mb-1">大墩館 201</p>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#F2F8F2] text-[#7D9D75]">滿租</span>
            </div>
        </div>
      </div>

      {/* 3. AI 生成區 */}
      <div className="px-5">
        <div className="flex justify-between items-end mb-3">
            <h3 className="text-xs font-bold tracking-widest uppercase" style={{ color: colors.textSecondary }}>2. 廣告預覽</h3>
            {!isGenerated && (
                <button onClick={handleGenerate} 
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold text-white shadow-md active:scale-95 transition-transform"
                        style={{ backgroundColor: colors.textPrimary }}>
                    {isPosting ? <span className="animate-spin">✨</span> : <Sparkles size={12} />}
                    {isPosting ? '生成中...' : 'AI 一鍵生成'}
                </button>
            )}
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-sm min-h-[200px] relative">
            {!isGenerated ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
                    <Sparkles size={48} style={{ color: colors.accent }} />
                    <p className="text-xs font-bold mt-2" style={{ color: colors.textSecondary }}>點擊按鈕，讓 AI 為您撰寫吸睛文案</p>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {/* 模擬 Instagram 預覽 */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[#A09086] text-white flex items-center justify-center text-xs font-bold">M</div>
                        <div>
                            <p className="text-xs font-bold">muju.life</p>
                            <p className="text-[10px] opacity-60">Taichung, Taiwan</p>
                        </div>
                    </div>
                    
                    {/* 文案內容 */}
                    <div className="text-sm leading-relaxed mb-4 text-[#4B382A]">
                        <p className="font-bold mb-1">【 暮居文心・極簡生活提案 🌿 】</p>
                        <p className="mb-2">尋找懂得生活的你。早晨被南屯的陽光喚醒，手沖一杯咖啡，享受屬於自己的 Muji 時光。</p>
                        <ul className="list-disc list-inside opacity-80 mb-2 text-xs">
                            <li>格局：獨立套房 / 乾濕分離</li>
                            <li>交通：捷運站步行 5 分鐘</li>
                            <li>設備：全套智能家電 + 雲端門鎖</li>
                        </ul>
                        <p className="text-[#E8B05C] font-bold">#台中租屋 #極簡風 #拎包入住</p>
                    </div>

                    <div className="flex gap-2 border-t pt-3 border-dashed border-gray-200">
                        <button className="flex-1 py-2 rounded-xl bg-[#F2F0EE] text-xs font-bold flex items-center justify-center gap-2 text-[#8C7E74]">
                            <Copy size={14} /> 複製
                        </button>
                        <button className="flex-1 py-2 rounded-xl bg-[#F2F0EE] text-xs font-bold flex items-center justify-center gap-2 text-[#8C7E74]">
                            <ImageIcon size={14} /> 下載圖
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* 4. 發布平台 */}
      {isGenerated && (
          <div className="px-5 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: colors.textSecondary }}>3. 同步發布</h3>
            <div className="grid grid-cols-3 gap-3">
                <SocialBtn icon={<Facebook size={20} />} label="Facebook" color={colors.fb} />
                <SocialBtn icon={<Instagram size={20} />} label="Instagram" color={colors.ig} />
                <div className="flex flex-col items-center gap-2 p-3 rounded-2xl border-2 border-[#E8B05C] bg-[#FFF8F0] cursor-pointer">
                    <span className="text-lg font-bold text-[#E8B05C]">591</span>
                    <span className="text-[10px] font-bold">租屋網</span>
                </div>
            </div>
          </div>
      )}

    </div>
  );
}

// --- 元件區 ---

function SocialBtn({ icon, label, color }: any) {
    return (
        <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-white border border-transparent shadow-sm active:scale-95 transition-all">
            <div style={{ color: color }}>{icon}</div>
            <span className="text-[10px] font-bold text-[#4B382A]">{label}</span>
        </button>
    )
}