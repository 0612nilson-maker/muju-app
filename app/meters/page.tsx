// 這裡是：抄表管理 (Meter Reading) - 自動計算水電費
'use client';

import React, { useState } from 'react';
import { ChevronLeft, Zap, Droplets, Camera, Calculator, Send } from 'lucide-react';
import Link from 'next/link';

// 官方定案色票：溫柔拿鐵
const colors = {
  bgMain: '#F1EEEB',       
  textPrimary: '#4B382A',  
  textSecondary: '#8C7E74',
  accent: '#CFB3A9',       
  accentWarm: '#E4D8CB',   
  cardBg: '#FFFFFF',       
  tagBg: '#F2F0EE',
  electric: '#FADCB8',     // 電費代表色 (暖黃)
  water: '#B8D8FA'         // 水費代表色 (淡藍)
};

export default function MeterReadingPage() {
  const [activeTab, setActiveTab] = useState('electric');

  return (
    <div className="min-h-screen font-sans pb-24" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 導覽列 */}
      <header className="sticky top-0 z-20 px-5 h-16 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>抄表管理</h1>
        <div className="w-10"></div> {/* 佔位用 */}
      </header>

      {/* 2. 切換水電費 */}
      <div className="px-5 py-4">
        <div className="p-1 rounded-full flex relative" style={{ backgroundColor: colors.accentWarm }}>
            <TabButton 
                label="電費" 
                icon={<Zap size={16} />} 
                active={activeTab === 'electric'} 
                onClick={() => setActiveTab('electric')} 
                colors={colors} 
            />
            <TabButton 
                label="水費" 
                icon={<Droplets size={16} />} 
                active={activeTab === 'water'} 
                onClick={() => setActiveTab('water')} 
                colors={colors} 
            />
        </div>
      </div>

      {/* 3. 抄表列表 */}
      <div className="px-5 space-y-4">
            <h3 className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: colors.textSecondary }}>
                {activeTab === 'electric' ? '本期電表 (2月)' : '本期水表 (2月)'}
            </h3>
            
            {/* 待抄表 (Highlighted) */}
            <MeterCard 
                room="305 室" 
                tenant="陳小明" 
                lastRead="1420" 
                status="待抄表" 
                isElectric={activeTab === 'electric'}
                colors={colors} 
            />

            {/* 已完成 */}
            <MeterCard 
                room="201 室" 
                tenant="林怡君" 
                lastRead="3350" 
                currentRead="3500"
                usage="150"
                amount="$750"
                status="已完成" 
                isElectric={activeTab === 'electric'}
                colors={colors} 
            />
             <MeterCard 
                room="202 室" 
                tenant="張建國" 
                lastRead="2100" 
                currentRead="2180"
                usage="80"
                amount="$400"
                status="已完成" 
                isElectric={activeTab === 'electric'}
                colors={colors} 
            />
      </div>
    </div>
  );
}

// --- 元件區 ---

function MeterCard({ room, tenant, lastRead, currentRead, usage, amount, status, isElectric, colors }: any) {
    const isPending = status === '待抄表';
    
    return (
        <div className={`rounded-[24px] p-4 shadow-sm border transition-all cursor-pointer group active:scale-98`}
             style={{ 
                 backgroundColor: colors.cardBg,
                 borderColor: isPending ? (isElectric ? colors.electric : colors.water) : 'transparent',
                 borderWidth: isPending ? '2px' : '1px'
             }}>
            
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm" 
                         style={{ backgroundColor: isElectric ? '#F5C086' : '#86B8F5' }}>
                        {isElectric ? <Zap size={18} /> : <Droplets size={18} />}
                    </div>
                    <div>
                        <h4 className="font-bold text-sm" style={{ color: colors.textPrimary }}>{room} <span className="font-normal text-xs opacity-70">({tenant})</span></h4>
                        <p className="text-[10px]" style={{ color: colors.textSecondary }}>上期度數：{lastRead}</p>
                    </div>
                </div>
                {/* 狀態標籤 */}
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold`}
                      style={{ 
                          backgroundColor: isPending ? colors.tagBg : '#F2F8F2', 
                          color: isPending ? colors.textSecondary : '#7D9D75' 
                      }}>
                    {status}
                </span>
            </div>

            {/* 輸入區或結果區 */}
            {isPending ? (
                <div className="flex gap-2 mt-2">
                    <div className="flex-1 relative">
                         <input type="number" placeholder="輸入本期度數" className="w-full p-3 rounded-xl text-sm font-bold bg-[#F9F9F9] outline-none text-center" style={{ color: colors.textPrimary }} />
                         <button className="absolute right-2 top-2 p-1 rounded-full bg-white shadow-sm"><Camera size={16} className="text-[#8C7E74]" /></button>
                    </div>
                    <button className="px-4 rounded-xl font-bold text-xs text-white shadow-md active:scale-95 transition-transform" 
                            style={{ backgroundColor: colors.textPrimary }}>
                        計算
                    </button>
                </div>
            ) : (
                <div className="flex justify-between items-center pt-2 border-t border-[#F2F0EE]">
                    <div>
                        <p className="text-[9px] font-bold uppercase mb-0.5" style={{ color: colors.textSecondary }}>本期用量</p>
                        <p className="text-sm font-bold" style={{ color: colors.textPrimary }}>{usage} 度</p>
                    </div>
                    <div className="text-right">
                         <p className="text-[9px] font-bold uppercase mb-0.5" style={{ color: colors.textSecondary }}>應收金額</p>
                         <p className="text-lg font-bold" style={{ color: colors.textPrimary }}>{amount}</p>
                    </div>
                    <button className="ml-2 p-2 rounded-full bg-[#F2F8F2] text-[#7D9D75] active:scale-90 transition-transform">
                        <Send size={16} />
                    </button>
                </div>
            )}
        </div>
    )
}

function TabButton({ label, icon, active, onClick, colors }: any) {
    return (
        <button onClick={onClick} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-sm`}
                style={{ 
                    backgroundColor: active ? colors.cardBg : 'transparent', 
                    color: active ? colors.textPrimary : colors.textSecondary,
                    transform: active ? 'scale(1.05)' : 'scale(1)'
                }}>
            {icon} {label}
        </button>
    )
}