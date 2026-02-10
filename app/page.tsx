'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, FileText, Zap, Settings, 
  Home, Plus, ChevronRight, Bell, Search, TrendingUp, MapPin
} from 'lucide-react';

// 溫柔拿鐵色票
const colors = {
  bgMain: '#F1EEEB',       
  textPrimary: '#4B382A',  
  textSecondary: '#8C7E74',
  accent: '#CFB3A9',       
  accentWarm: '#E4D8CB',   
  cardBg: '#FFFFFF',       
  navBg: '#A09086',        
  navTextActive: '#F1EEEB',
  navTextInactive: '#D4C5B9',
  tagBg: '#F2F0EE'
};

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col font-sans overflow-hidden" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 頂部導覽 */}
      <header className="flex-none h-16 px-6 flex justify-between items-center z-20" style={{ backgroundColor: colors.bgMain }}>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg tracking-widest shadow-sm" 
                 style={{ backgroundColor: colors.navBg, color: colors.bgMain }}>
                M
            </div>
            <div>
                <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>MUJU</h1>
                <p className="text-[10px] tracking-wider uppercase font-bold" style={{ color: colors.accent }}>Residence</p>
            </div>
        </div>
        <div className="flex gap-4">
            <button style={{ color: colors.textPrimary }}><Search size={22} /></button>
            <button style={{ color: colors.textPrimary }} className="relative">
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-[#F1EEEB]" style={{ backgroundColor: '#CFB3A9' }}></span>
            </button>
        </div>
      </header>

      {/* 2. 中間內容區 */}
      <main className="flex-1 overflow-y-auto px-6 py-4 pb-24 space-y-8 scrollbar-hide">
        
        {/* 歡迎詞 */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <p className="text-xs font-bold tracking-widest mb-1" style={{ color: colors.textSecondary }}>FEBRUARY 10</p>
            <h2 className="text-3xl font-bold tracking-tight" style={{ color: colors.textPrimary }}>早安，Nilson</h2>
        </div>

        {/* 核心數據總覽卡 */}
        <div className="rounded-[32px] p-6 shadow-xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ backgroundColor: colors.navBg, color: colors.bgMain }}>
            <div className="absolute top-0 right-0 w-40 h-40 opacity-20 rounded-full blur-3xl -mr-10 -mt-10 bg-white"></div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-xs tracking-widest uppercase mb-1 font-medium opacity-80" style={{ color: colors.accentWarm }}>本月實收租金</p>
                        <h3 className="text-4xl font-bold tracking-tight text-white">$142,500</h3>
                    </div>
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-md">
                        <TrendingUp size={24} className="text-white" />
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="flex-1 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                        <p className="text-[10px] mb-1 opacity-80" style={{ color: colors.accentWarm }}>出租率</p>
                        <p className="text-xl font-bold text-white">95%</p>
                    </div>
                    <div className="flex-1 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                        <p className="text-[10px] mb-1 opacity-80" style={{ color: colors.accentWarm }}>待處理</p>
                        <p className="text-xl font-bold" style={{ color: '#FADCB8' }}>3 件</p>
                    </div>
                </div>
            </div>
        </div>

        {/* 快速功能區 */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <h3 className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: colors.textSecondary }}>快速執行</h3>
            <div className="grid grid-cols-4 gap-3">
                {/* 1. 這裡改成「新增」 */}
                <Link href="/properties/new">
                    <QuickBtn icon={<Plus size={24} />} label="新增" active colors={colors} />
                </Link>
                <QuickBtn icon={<FileText size={20} />} label="合約" colors={colors} />
                <QuickBtn icon={<Zap size={20} />} label="抄表" colors={colors} />
                <QuickBtn icon={<Users size={20} />} label="房客" colors={colors} />
            </div>
        </div>

        {/* 我的房源列表 */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-bold tracking-widest uppercase" style={{ color: colors.textSecondary }}>我的房源</h3>
                <span className="text-[10px] font-bold text-[#CFB3A9]">查看全部</span>
            </div>
            
            <div className="space-y-4">
                {/* 2. 這裡加上 Link，點擊卡片會跳轉到房源詳情頁 (id=1) */}
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
                
                {/* 既有的房子也可以連 */}
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

        {/* 待辦事項 */}
        <div>
            <h3 className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: colors.textSecondary }}>待辦事項</h3>
            <div className="rounded-[24px] p-2 shadow-sm border border-white" style={{ backgroundColor: colors.cardBg }}>
                <TaskRow title="305室 租約到期" sub="剩餘 7 天" urgent colors={colors} />
                <div className="h-px mx-4 opacity-30" style={{ backgroundColor: colors.textSecondary }}></div>
                <TaskRow title="201室 冷氣報修" sub="今日 14:00 師傅" colors={colors} />
            </div>
        </div>

      </main>

      {/* 3. 底部導覽列 */}
      <div className="flex-none h-24 relative flex justify-center items-start pt-4 pointer-events-none z-30">
        <div className="absolute inset-0 bg-gradient-to-t from-[#F1EEEB] via-[#F1EEEB]/80 to-transparent"></div>
        <div className="rounded-full shadow-2xl px-8 py-4 flex items-center gap-8 pointer-events-auto relative transform translate-y-2" style={{ backgroundColor: colors.navBg }}>
            <NavIcon icon={<Home size={24} />} active colors={colors} />
            <NavIcon icon={<Users size={24} />} colors={colors} />
            <Link href="/properties/new">
                <div className="p-4 rounded-full -mt-12 shadow-xl border-4 transition-transform active:scale-95" 
                     style={{ backgroundColor: colors.accent, borderColor: colors.bgMain, color: 'white' }}>
                    <Plus size={28} />
                </div>
            </Link>
            <NavIcon icon={<Zap size={24} />} colors={colors} />
            <NavIcon icon={<Settings size={24} />} colors={colors} />
        </div>
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

function QuickBtn({ icon, label, active, colors }: any) {
    return (
        <div className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform">
            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all duration-300 shadow-sm border`}
                 style={{ 
                    backgroundColor: active ? colors.navBg : colors.cardBg, 
                    color: active ? colors.bgMain : colors.accent,
                    borderColor: active ? colors.navBg : 'transparent'
                 }}>
                {icon}
            </div>
            <span className="text-xs font-bold" style={{ color: colors.textPrimary }}>{label}</span>
        </div>
    )
}

function TaskRow({ title, sub, urgent, done, colors }: any) {
    return (
        <div className="flex items-center justify-between p-4 transition-colors rounded-2xl cursor-pointer hover:bg-[#F1EEEB]">
            <div className="flex items-center gap-4">
                <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: urgent ? '#C66C6C' : done ? '#7D9D75' : colors.textSecondary }}></div>
                <div>
                    <h4 className={`text-sm font-bold ${done ? 'line-through opacity-50' : ''}`} style={{ color: colors.textPrimary }}>{title}</h4>
                    <p className="text-[11px] font-medium" style={{ color: colors.textSecondary }}>{sub}</p>
                </div>
            </div>
            <ChevronRight size={16} style={{ color: colors.textSecondary }} />
        </div>
    )
}

function NavIcon({ icon, active, colors }: any) {
    return (
        <button className="transition-all duration-300 hover:scale-110" style={{ color: active ? colors.navTextActive : colors.navTextInactive }}>
            {icon}
        </button>
    )
}