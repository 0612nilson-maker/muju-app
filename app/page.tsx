// 這裡是：首頁 (Dashboard) - 全能指揮中心 (最終整合版)
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home, Users, Zap, Settings, 
  Search, Bell, TrendingUp, 
  Megaphone, PenTool, Calculator, Hammer, 
  ShoppingBag, Key, Plus, ChevronRight
} from 'lucide-react';

// 官方定案色票
const colors = { 
  bgMain: '#F1EEEB', 
  textPrimary: '#4B382A', 
  textSecondary: '#8C7E74', 
  accent: '#CFB3A9', 
  accentWarm: '#E4D8CB', 
  cardBg: '#FFFFFF', 
  navBg: '#A09086', 
  navTextActive: '#F1EEEB', 
  navTextInactive: '#D4C5B9' 
};

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col font-sans overflow-hidden" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 頂部導覽 */}
      <header className="flex-none h-16 px-6 flex justify-between items-center z-20" style={{ backgroundColor: colors.bgMain }}>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg tracking-widest shadow-sm" style={{ backgroundColor: colors.navBg, color: colors.bgMain }}>M</div>
            <div><h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>MUJU</h1><p className="text-[10px] tracking-wider uppercase font-bold" style={{ color: colors.accent }}>Residence</p></div>
        </div>
        <div className="flex gap-4"><button style={{ color: colors.textPrimary }}><Search size={22} /></button><button style={{ color: colors.textPrimary }} className="relative"><Bell size={22} /><span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-[#F1EEEB]" style={{ backgroundColor: '#CFB3A9' }}></span></button></div>
      </header>

      {/* 2. 中間內容區 */}
      <main className="flex-1 overflow-y-auto px-6 py-4 pb-24 space-y-8 scrollbar-hide">
        
        {/* 歡迎詞 */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <p className="text-xs font-bold tracking-widest mb-1" style={{ color: colors.textSecondary }}>FEBRUARY 11</p>
            <h2 className="text-3xl font-bold tracking-tight" style={{ color: colors.textPrimary }}>早安，Nilson</h2>
        </div>

        {/* 核心數據卡 */}
        <div className="rounded-[32px] p-6 shadow-xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ backgroundColor: colors.navBg, color: colors.bgMain }}><div className="absolute top-0 right-0 w-40 h-40 opacity-20 rounded-full blur-3xl -mr-10 -mt-10 bg-white"></div><div className="relative z-10"><div className="flex justify-between items-start mb-6"><div><p className="text-xs tracking-widest uppercase mb-1 font-medium opacity-80" style={{ color: colors.accentWarm }}>本月實收租金</p><h3 className="text-4xl font-bold tracking-tight text-white">$142,500</h3></div><div className="p-2 rounded-full bg-white/10 backdrop-blur-md"><TrendingUp size={24} className="text-white" /></div></div><div className="flex gap-3"><div className="flex-1 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10"><p className="text-[10px] mb-1 opacity-80" style={{ color: colors.accentWarm }}>出租率</p><p className="text-xl font-bold text-white">95%</p></div><div className="flex-1 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10"><p className="text-[10px] mb-1 opacity-80" style={{ color: colors.accentWarm }}>待處理</p><p className="text-xl font-bold" style={{ color: '#FADCB8' }}>3 件</p></div></div></div></div>
        
        {/* 專業工具箱 (6大功能區) */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <h3 className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: colors.textSecondary }}>專業工具箱</h3>
            <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                
                {/* 1. 智能招租 */}
                <Link href="/marketing">
                    <ToolBtn icon={<Megaphone size={22} />} label="智能招租" color="#E8B05C" />
                </Link>
                
                {/* 2. 合約製作 */}
                <Link href="/contract/new">
                    <ToolBtn icon={<PenTool size={22} />} label="合約製作" color="#7D9D75" />
                </Link>
                
                {/* 3. 報修派遣 */}
                <Link href="/repairs">
                    <ToolBtn icon={<Hammer size={22} />} label="報修派遣" color="#C66C6C" />
                </Link>
                
                {/* 4. 投報試算 */}
                <Link href="/roi">
                    <ToolBtn icon={<Calculator size={22} />} label="投報試算" color="#6C8CC6" />
                </Link>
                
                {/* 5. 門鎖管理 */}
                <Link href="/locks">
                    <ToolBtn icon={<Key size={22} />} label="門鎖管理" color="#8C7E74" />
                </Link>
                
                {/* 6. 更多功能 (連到目錄頁) */}
                <Link href="/settings">
                    <div className="opacity-50 hover:opacity-100 transition-opacity">
                        <ToolBtn icon={<Settings size={22} />} label="更多功能" color="#8C7E74" />
                    </div>
                </Link>

            </div>
        </div>

        {/* 暮居選品 (Banner) */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-bold tracking-widest uppercase" style={{ color: colors.textSecondary }}>暮居選品</h3>
                <span className="text-[10px] font-bold text-[#CFB3A9]">會員專屬</span>
            </div>
            
            {/* 連到商城頁面 */}
            <Link href="/shop">
                <div className="rounded-[24px] p-5 shadow-sm relative overflow-hidden flex justify-between items-center cursor-pointer active:scale-95 transition-transform" 
                     style={{ backgroundColor: '#E4D8CB' }}>
                    <div className="relative z-10">
                        <h4 className="font-bold text-lg mb-1" style={{ color: colors.textPrimary }}>嚴選家具 & 工班</h4>
                        <p className="text-xs font-medium opacity-80" style={{ color: colors.textPrimary }}>打造 Muji 風格的一站式採購</p>
                        <button className="mt-3 px-4 py-2 rounded-full text-xs font-bold bg-white/80 shadow-sm" style={{ color: colors.textPrimary }}>
                            進入商城
                        </button>
                    </div>
                    <div className="p-3 rounded-full bg-white/30 backdrop-blur-sm">
                        <ShoppingBag size={32} style={{ color: colors.textPrimary }} />
                    </div>
                </div>
            </Link>
        </div>

        {/* 待辦事項 */}
        <div className="pb-6">
            <h3 className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: colors.textSecondary }}>待辦事項</h3>
            <div className="rounded-[24px] p-2 shadow-sm border border-white" style={{ backgroundColor: colors.cardBg }}><TaskRow title="305室 租約到期" sub="剩餘 7 天" urgent colors={colors} /><div className="h-px mx-4 opacity-30" style={{ backgroundColor: colors.textSecondary }}></div><TaskRow title="201室 冷氣報修" sub="今日 14:00 師傅" colors={colors} /></div>
        </div>
      </main>

      {/* 3. 底部導覽列 */}
      <div className="flex-none h-24 relative flex justify-center items-start pt-4 pointer-events-none z-30">
        <div className="absolute inset-0 bg-gradient-to-t from-[#F1EEEB] via-[#F1EEEB]/80 to-transparent"></div>
        <div className="rounded-full shadow-2xl px-8 py-4 flex items-center gap-8 pointer-events-auto relative transform translate-y-2" style={{ backgroundColor: colors.navBg }}>
            
            {/* 首頁 */}
            <NavIcon icon={<Home size={24} />} active colors={colors} />
            
            {/* 房客與合約 */}
            <Link href="/tenants"><NavIcon icon={<Users size={24} />} colors={colors} /></Link>
            
            {/* 新增合約/房客 (中間大按鈕) */}
            <Link href="/contract/new">
                <div className="p-4 rounded-full -mt-12 shadow-xl border-4 transition-transform active:scale-95" style={{ backgroundColor: colors.accent, borderColor: colors.bgMain, color: 'white' }}>
                    <Plus size={28} />
                </div>
            </Link>
            
            {/* 抄表 (暫定) */}
            <Link href="/meters"><NavIcon icon={<Zap size={24} />} colors={colors} /></Link>
            
            {/* 設定/目錄 */}
            <Link href="/settings"><NavIcon icon={<Settings size={24} />} colors={colors} /></Link>
        </div>
      </div>
    </div>
  );
}

// --- 元件區 ---

function ToolBtn({ icon, label, color }: any) { return (<div className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform"><div className={`w-14 h-14 rounded-[20px] flex items-center justify-center transition-all duration-300 shadow-sm border border-white`} style={{ backgroundColor: '#FFFFFF', color: color }}>{icon}</div><span className="text-[11px] font-bold text-center leading-tight opacity-80 group-hover:opacity-100 transition-opacity" style={{ color: '#4B382A' }}>{label}</span></div>) }
function TaskRow({ title, sub, urgent, done, colors }: any) { return (<div className="flex items-center justify-between p-4 transition-colors rounded-2xl cursor-pointer hover:bg-[#F1EEEB]"><div className="flex items-center gap-4"><div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: urgent ? '#C66C6C' : done ? '#7D9D75' : colors.textSecondary }}></div><div><h4 className={`text-sm font-bold ${done ? 'line-through opacity-50' : ''}`} style={{ color: colors.textPrimary }}>{title}</h4><p className="text-[11px] font-medium" style={{ color: colors.textSecondary }}>{sub}</p></div></div><ChevronRight size={16} style={{ color: colors.textSecondary }} /></div>) }
function NavIcon({ icon, active, colors }: any) { return (<button className="transition-all duration-300 hover:scale-110" style={{ color: active ? colors.navTextActive : colors.navTextInactive }}>{icon}</button>) }