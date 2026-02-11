// 這裡是：系統設置 (Settings)
'use client';

import React from 'react';
import { ChevronLeft, User, Bell, Shield, Moon, LogOut, ChevronRight, Globe, HelpCircle } from 'lucide-react';
import Link from 'next/link';

// 官方定案色票：溫柔拿鐵
const colors = {
  bgMain: '#F1EEEB',       
  textPrimary: '#4B382A',  
  textSecondary: '#8C7E74',
  accent: '#CFB3A9',       
  cardBg: '#FFFFFF',       
  danger: '#C66C6C'
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen font-sans pb-10" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 頂部導覽 */}
      <header className="sticky top-0 z-20 px-5 h-16 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>系統設置</h1>
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

      {/* 3. 選單列表 */}
      <div className="px-5 space-y-6">
            
            {/* 區塊：一般設定 */}
            <section>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-3 ml-2" style={{ color: colors.textSecondary }}>一般設定</h3>
                <div className="rounded-[24px] overflow-hidden shadow-sm" style={{ backgroundColor: colors.cardBg }}>
                    <SettingItem icon={<User size={20} />} label="個人檔案" sub="修改名稱與頭像" colors={colors} />
                    <div className="h-px bg-gray-100 mx-14"></div>
                    <SettingItem icon={<Globe size={20} />} label="語言與地區" sub="繁體中文 (台灣)" colors={colors} />
                    <div className="h-px bg-gray-100 mx-14"></div>
                    <SettingItem icon={<Moon size={20} />} label="深色模式" sub="已關閉" colors={colors} toggle />
                </div>
            </section>

            {/* 區塊：通知與安全 */}
            <section>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-3 ml-2" style={{ color: colors.textSecondary }}>通知與安全</h3>
                <div className="rounded-[24px] overflow-hidden shadow-sm" style={{ backgroundColor: colors.cardBg }}>
                    <SettingItem icon={<Bell size={20} />} label="推播通知" sub="接收房租入帳提醒" colors={colors} toggle on />
                    <div className="h-px bg-gray-100 mx-14"></div>
                    <SettingItem icon={<Shield size={20} />} label="帳號安全" sub="修改密碼、生物辨識" colors={colors} />
                </div>
            </section>

            {/* 區塊：支援 */}
            <section>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-3 ml-2" style={{ color: colors.textSecondary }}>關於與支援</h3>
                <div className="rounded-[24px] overflow-hidden shadow-sm" style={{ backgroundColor: colors.cardBg }}>
                    <SettingItem icon={<HelpCircle size={20} />} label="使用說明" colors={colors} />
                    <div className="h-px bg-gray-100 mx-14"></div>
                    
                    {/* 這裡可以放你的 版本號 */}
                    <div className="flex items-center justify-between p-4 cursor-default">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#F2F0EE] flex items-center justify-center text-[#8C7E74]">
                                <span className="text-xs font-bold">V</span>
                            </div>
                            <span className="text-sm font-bold" style={{ color: colors.textPrimary }}>版本資訊</span>
                        </div>
                        <span className="text-xs font-bold text-[#CFB3A9]">v1.0.2 Beta</span>
                    </div>
                </div>
            </section>

            {/* 登出按鈕 */}
            <button className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all active:scale-95" 
                    style={{ backgroundColor: '#FEEEEE', color: colors.danger }}>
                <LogOut size={18} />
                登出帳號
            </button>
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