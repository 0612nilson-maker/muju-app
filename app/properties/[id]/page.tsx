// 這裡是：房源詳細資料 (Property Details)
'use client';

import React from 'react';
import { ChevronLeft, MapPin, Edit2, Users, FileText, Settings, Phone } from 'lucide-react';
import Link from 'next/link';

const colors = { bgMain: '#F1EEEB', textPrimary: '#4B382A', textSecondary: '#8C7E74', accent: '#CFB3A9', accentWarm: '#E4D8CB', cardBg: '#FFFFFF', navBg: '#A09086' };

export default function PropertyDetailsPage() {
  return (
    <div className="min-h-screen font-sans pb-24" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 頂部大圖與導覽：左上回列表 */}
      <div className="relative h-64 bg-[#E4D8CB]">
        <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1502005229762-cf1afd38088d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <header className="absolute top-0 left-0 right-0 p-5 flex justify-between items-center z-10">
            <Link href="/properties" className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm">
                <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
            </Link>
            <div className="flex gap-3"><button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm"><Edit2 size={20} style={{ color: colors.textPrimary }} /></button></div>
        </header>

        <div className="absolute -bottom-16 left-5 right-5 rounded-[32px] p-6 shadow-lg" style={{ backgroundColor: colors.cardBg }}>
            <div className="flex justify-between items-start mb-2"><h1 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>暮居文心創始館</h1><span className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: '#7D9D75' }}>招租中</span></div>
            <div className="flex items-center gap-1 mb-4"><MapPin size={14} style={{ color: colors.textSecondary }} /><p className="text-sm font-medium" style={{ color: colors.textSecondary }}>台中市南屯區文心南路 289 號</p></div>
            <div className="flex justify-between items-center pt-4 border-t border-[#F2F0EE]"><div className="text-center px-4 border-r border-[#F2F0EE] last:border-0"><p className="text-[10px] font-bold uppercase" style={{ color: colors.textSecondary }}>租金</p><p className="text-lg font-bold" style={{ color: colors.textPrimary }}>$28k</p></div><div className="text-center px-4 border-r border-[#F2F0EE] last:border-0"><p className="text-[10px] font-bold uppercase" style={{ color: colors.textSecondary }}>格局</p><p className="text-lg font-bold" style={{ color: colors.textPrimary }}>3房</p></div><div className="text-center px-4"><p className="text-[10px] font-bold uppercase" style={{ color: colors.textSecondary }}>坪數</p><p className="text-lg font-bold" style={{ color: colors.textPrimary }}>32.5</p></div></div>
        </div>
      </div>

      {/* 2. 下方內容區 */}
      <div className="mt-20 px-5 space-y-6">
        <div><h3 className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: colors.textSecondary }}>管理操作</h3><div className="grid grid-cols-2 gap-3"><ManageBtn icon={<Users />} label="房客名單" sub="目前 0 人" colors={colors} /><ManageBtn icon={<FileText />} label="租約管理" sub="建立合約" colors={colors} /></div></div>
        <div><h3 className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: colors.textSecondary }}>提供設備</h3><div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"><Tag label="變頻冷氣" colors={colors} /><Tag label="洗衣機" colors={colors} /><Tag label="雙人床" colors={colors} /><Tag label="網路" colors={colors} /><Tag label="電子鎖" colors={colors} /></div></div>
        <div className="rounded-[24px] p-6 shadow-sm" style={{ backgroundColor: colors.cardBg }}><h3 className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: colors.textSecondary }}>內部備註</h3><p className="text-sm leading-relaxed" style={{ color: colors.textPrimary }}>此房源位於捷運站旁，適合上班族。大門密碼已更改為 8888。垃圾車時間為晚上 7:30。</p></div>
      </div>

      <div className="fixed bottom-6 left-6 right-6"><button className="w-full py-4 rounded-full shadow-xl font-bold text-white flex items-center justify-center gap-2 active:scale-95 transition-transform" style={{ backgroundColor: colors.textPrimary }}><Phone size={20} /> 聯繫管理員</button></div>
    </div>
  );
}

function ManageBtn({ icon, label, sub, colors }: any) { return (<div className="rounded-[24px] p-4 flex items-center gap-4 cursor-pointer active:scale-95 transition-transform border border-transparent hover:border-[#CFB3A9]" style={{ backgroundColor: colors.cardBg }}><div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>{icon}</div><div><p className="text-sm font-bold" style={{ color: colors.textPrimary }}>{label}</p><p className="text-[10px]" style={{ color: colors.textSecondary }}>{sub}</p></div></div>) }
function Tag({ label, colors }: any) { return (<span className="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap" style={{ backgroundColor: colors.cardBg, color: colors.textSecondary }}>{label}</span>) }