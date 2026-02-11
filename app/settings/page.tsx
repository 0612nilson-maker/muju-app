// 這裡是：系統設置 (Settings) - 功能總目錄
'use client';

import React from 'react';
import { ChevronLeft, User, Bell, Moon, LogOut, ChevronRight, Globe, HelpCircle, Shield, Key, Calculator, Hammer, ShoppingBag, Megaphone, FileText, Home } from 'lucide-react';
import Link from 'next/link';

// 官方定案色票
const colors = {
  bgMain: '#F1EEEB',       
  textPrimary: '#4B382A',  
  textSecondary: '#8C7E74',
  cardBg: '#FFFFFF',       
  danger: '#C66C6C'
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen font-sans pb-24" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 頂部導覽 */}
      <header className="sticky top-0 z-20 px-5 h-16 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>功能目錄</h1>
        <div className="w-10"></div>
      </header>

      {/* 2. 個人資料卡 */}
      <div className="px-5 py-6">
        <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-[#A09086] flex items-center justify-center text-3xl font-bold text-[#F1EEEB] shadow-lg border-4 border-white">
                N
            </div>
            <div>
                <h2 className="text-xl font-bold" style={{ color: colors.textPrimary }}>Nilson</h2>
                <p className="text-xs font-medium opacity-80 mb-1" style={{ color: colors.textSecondary }}>0912-345-678</p>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E8B05C] text-white">PRO 會員</span>
            </div>
        </div>
      </div>

      {/* 3. 功能目錄 (Sitemap) */}
      <div className="px-5 space-y-6">
            
            {/* 區塊：房源管理工具 */}
            <section>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-3 ml-2" style={{ color: colors.textSecondary }}>管理工具</h3>
                <div className="rounded-[24px] overflow-hidden shadow-sm" style={{ backgroundColor: colors.cardBg }}>
                    <Link href="/locks">
                        <SettingItem icon={<Key size={20} />} label="門鎖權限管理" sub="密碼 / 指紋設定" colors={colors} />
                    </Link>
                    <div className="h-px bg-gray-100 mx-14"></div>
                    <Link href="/repairs">
                        <SettingItem icon={<Hammer size={20} />} label="報修派遣中心" sub="工班通訊錄" colors={colors} />
                    </Link>
                    <div className="h-px bg-gray-100 mx-14"></div>
                    <Link href="/contract/new">
                        <SettingItem icon={<FileText size={20} />} label="合約製作器" sub="建立新租約" colors={colors} />
                    </Link>
                </div>
            </section>

            {/* 區塊：投資與行銷 */}
            <section>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-3 ml-2" style={{ color: colors.textSecondary }}>投資與行銷</h3>
                <div className="rounded-[24px] overflow-hidden shadow-sm" style={{ backgroundColor: colors.cardBg }}>
                    <Link href="/roi">
                        <SettingItem icon={<Calculator size={20} />} label="投報試算 (ROI)" sub="買房 / 包租雙模式" colors={colors} />
                    </Link>
                    <div className="h-px bg-gray-100 mx-14"></div>
                    <Link href="/marketing">
                        <SettingItem icon={<Megaphone size={20} />} label="智能招租" sub="AI 文案生成" colors={colors} />
                    </Link>
                    <div className="h-px bg-gray-100 mx-14"></div>
                    <Link href="/shop">
                        <SettingItem icon={<ShoppingBag size={20} />} label="暮居選品" sub="會員專屬商城" colors={colors} />
                    </Link>
                </div>
            </section>

            {/* 區塊：系統設定 */}
            <section>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-3 ml-2" style={{ color: colors.textSecondary }}>系統設定</h3>
                <div className="rounded-[24px] overflow-hidden shadow-sm" style={{ backgroundColor: colors.cardBg }}>
                    <SettingItem icon={<User size={20} />} label="帳號設定" sub="修改名稱與頭像" colors={colors} />
                    <div className="h-px bg-gray-100 mx-14"></div>
                    <SettingItem icon={<Bell size={20} />} label="推播通知" sub="接收房租入帳提醒" colors={colors} toggle on />
                    <div className="h-px bg-gray-100 mx-14"></div>
                    <SettingItem icon={<Shield size={20} />} label="隱私與安全" sub="FaceID / 指紋鎖定" colors={colors} />
                    <div className="h-px bg-gray-100 mx-14"></div>
                    <SettingItem icon={<Moon size={20} />} label="深色模式" sub="目前：淺色" colors={colors} toggle />
                </div>
            </section>

            {/* 登出 */}
            <button className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all active:scale-95 mb-6" 
                    style={{ backgroundColor: '#FEEEEE', color: colors.danger }}>
                <LogOut size={18} />
                登出帳號
            </button>
      </div>

      {/* 底部導覽列 (保持一致性) */}
      <div className="fixed bottom-0 left-0 right-0 h-24 flex justify-center items-start pt-4 pointer-events-none z-30">
        <div className="absolute inset-0 bg-gradient-to-t from-[#F1EEEB] via-[#F1EEEB]/80 to-transparent"></div>
        <div className="rounded-full shadow-2xl px-8 py-4 flex items-center gap-8 pointer-events-auto relative transform translate-y-2" style={{ backgroundColor: '#A09086' }}>
            <Link href="/"><NavIcon icon={<Home size={24} />} colors={colors} /></Link>
            <Link href="/tenants"><NavIcon icon={<User size={24} />} colors={colors} /></Link>
            <Link href="/properties/new"><div className="w-10 h-10 rounded-full border-2 border-[#F1EEEB] flex items-center justify-center text-[#F1EEEB] -mt-8 bg-[#CFB3A9] shadow-lg"><User size={20} /></div></Link> {/* 這裡簡化顯示 */}
            <Link href="/meters"><NavIcon icon={<Calculator size={24} />} colors={colors} /></Link> {/* 暫代 */}
            <NavIcon icon={<Shield size={24} />} active colors={colors} /> {/* Settings Active */}
        </div>
      </div>
    </div>
  );
}

// --- 元件區 ---
function SettingItem({ icon, label, sub, colors, toggle, on }: any) {
    return (
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" 
                     style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
                    {icon}
                </div>
                <div>
                    <h4 className="text-sm font-bold" style={{ color: colors.textPrimary }}>{label}</h4>
                    {sub && <p className="text-[10px] font-medium" style={{ color: colors.textSecondary }}>{sub}</p>}
                </div>
            </div>
            
            {toggle ? (
                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${on ? 'bg-[#7D9D75]' : 'bg-[#E5E5E5]'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${on ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
            ) : (
                <ChevronRight size={16} style={{ color: colors.textSecondary }} />
            )}
        </div>
    )
}

function NavIcon({ icon, active, colors }: any) { 
    return (
        <button className="transition-all duration-300 hover:scale-110" 
                style={{ color: active ? '#F1EEEB' : '#D4C5B9' }}>
            {icon}
        </button>
    ) 
}