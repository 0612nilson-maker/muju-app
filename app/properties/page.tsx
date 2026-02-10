// 這裡是：房源總覽列表 (Properties List)
'use client';

import React from 'react';
import { ChevronLeft, Home, MapPin, Plus, Search } from 'lucide-react';
import Link from 'next/link';

// 官方定案色票：溫柔拿鐵
const colors = {
  bgMain: '#F1EEEB',       
  textPrimary: '#4B382A',  
  textSecondary: '#8C7E74',
  accent: '#CFB3A9',       
  accentWarm: '#E4D8CB',   
  cardBg: '#FFFFFF',       
  tagBg: '#F2F0EE'
};

export default function PropertiesListPage() {
  return (
    <div className="min-h-screen font-sans pb-24" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 頂部導覽 (固定) */}
      <header className="sticky top-0 z-20 px-5 h-16 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>房源總覽</h1>
        
        {/* 右上角加上新增按鈕 */}
        <Link href="/properties/new">
            <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50" 
                    style={{ color: colors.textPrimary }}>
                <Plus size={24} />
            </button>
        </Link>
      </header>

      {/* 2. 搜尋列 */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-3 px-4 py-3 rounded-full shadow-sm border border-transparent focus-within:border-[#CFB3A9] transition-all"
             style={{ backgroundColor: colors.cardBg }}>
            <Search size={18} style={{ color: colors.textSecondary }} />
            <input 
                type="text" 
                placeholder="搜尋房源名稱或地址..." 
                className="bg-transparent outline-none text-sm font-bold flex-1"
                style={{ color: colors.textPrimary }}
            />
        </div>
      </div>

      {/* 3. 房源列表 */}
      <div className="px-5 space-y-4">
            <div className="flex justify-between items-end mb-2">
                <h3 className="text-xs font-bold tracking-widest uppercase" style={{ color: colors.textSecondary }}>所有房源 (2)</h3>
            </div>
            
            {/* 剛剛 AI 辨識出來的房子 */}
            <Link href="/properties/1" className="block">
                <PropertyCard 
                    name="暮居文心創始館" 
                    address="南屯區文心南路 289 號" 
                    status="招租中" 
                    price="$28,000" 
                    tags={['整層', '3房']}
                    isNew
                    colors={colors} 
                />
            </Link>
            
            {/* 既有的房子 */}
            <Link href="/properties/1" className="block">
                <PropertyCard 
                    name="暮居大墩二館" 
                    address="南屯區大墩路 102 號" 
                    status="滿租" 
                    price="$15,500" 
                    tags={['套房', '12坪']}
                    colors={colors} 
                />
            </Link>
      </div>
    </div>
  );
}

// --- 元件區 ---

function PropertyCard({ name, address, status, price, tags, isNew, colors }: any) {
    return (
        <div className="rounded-[24px] p-4 shadow-sm border border-transparent hover:border-[#CFB3A9] transition-all cursor-pointer flex gap-4 items-center group active:scale-98"
             style={{ backgroundColor: colors.cardBg }}>
            {/* 房源縮圖 */}
            <div className="w-20 h-20 rounded-2xl bg-[#E4D8CB] flex items-center justify-center text-[#A09086] relative overflow-hidden">
                <Home size={24} className="opacity-50" />
                {isNew && <span className="absolute top-0 left-0 w-full text-[8px] bg-[#CFB3A9] text-white text-center py-0.5">NEW</span>}
            </div>
            
            <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm" style={{ color: colors.textPrimary }}>{name}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${status === '滿租' ? 'text-[#7D9D75] bg-[#F2F8F2]' : 'text-[#CFB3A9] bg-[#FAF4F0]'}`}>
                        {status}
                    </span>
                </div>
                
                <div className="flex items-center gap-1 mb-2">
                    <MapPin size={10} style={{ color: colors.textSecondary }} />
                    <p className="text-[10px]" style={{ color: colors.textSecondary }}>{address}</p>
                </div>

                <div className="flex justify-between items-end">
                    <div className="flex gap-1">
                        {tags.map((tag: string, i: number) => (
                            <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-md" style={{ backgroundColor: colors.tagBg, color: colors.textSecondary }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <p className="font-bold text-sm" style={{ color: colors.textPrimary }}>{price}<span className="text-[9px] font-normal text-[#8C7E74]">/月</span></p>
                </div>
            </div>
        </div>
    )
}