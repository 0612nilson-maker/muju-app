// 這裡是：單份合約詳情 (Contract Detail)
'use client';

import React from 'react';
import { ChevronLeft, FileText, Download, Printer, Share2, Calendar, User, MapPin } from 'lucide-react';
import Link from 'next/link';

// 官方定案色票
const colors = {
  bgMain: '#F1EEEB', textPrimary: '#4B382A', textSecondary: '#8C7E74',
  accent: '#CFB3A9', cardBg: '#FFFFFF', warning: '#E8B05C', danger: '#C66C6C'
};

export default function ContractDetailPage() {
  return (
    <div className="min-h-screen font-sans pb-24" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 頂部導覽 */}
      <header className="sticky top-0 z-20 px-5 h-16 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/tenants" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>合約詳情</h1>
        <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50" style={{ color: colors.textPrimary }}>
            <Share2 size={20} />
        </button>
      </header>

      {/* 2. 合約預覽卡 (模擬 PDF 封面) */}
      <div className="px-6 py-6 flex justify-center">
        <div className="w-full max-w-sm aspect-[3/4] bg-white rounded-xl shadow-lg p-8 flex flex-col relative overflow-hidden">
            {/* 浮水印裝飾 */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F1EEEB] rounded-full opacity-50"></div>
            
            <div className="flex-1 text-center mt-10">
                <div className="w-16 h-16 bg-[#F2F0EE] rounded-full flex items-center justify-center mx-auto mb-4 text-[#8C7E74]">
                    <FileText size={32} />
                </div>
                <h2 className="text-xl font-bold mb-1" style={{ color: colors.textPrimary }}>房屋租賃契約書</h2>
                <p className="text-xs font-bold tracking-widest uppercase text-[#CFB3A9]">OFFICIAL CONTRACT</p>
                
                <div className="mt-8 space-y-4 text-left px-4">
                    <InfoRow icon={<MapPin size={14} />} label="租賃標的" value="文心館 - 305 室" colors={colors} />
                    <InfoRow icon={<User size={14} />} label="承租人" value="陳小明" colors={colors} />
                    <InfoRow icon={<Calendar size={14} />} label="合約期間" value="2023/02/20 - 2024/02/20" colors={colors} highlight />
                </div>
            </div>

            <div className="mt-auto pt-6 border-t border-dashed border-gray-200">
                <p className="text-[10px] text-center text-gray-400 mb-4">合約編號：CT-20230220-305</p>
                <button className="w-full py-3 rounded-lg font-bold text-sm text-white shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
                        style={{ backgroundColor: colors.textPrimary }}>
                    <Download size={16} /> 下載 PDF
                </button>
            </div>
        </div>
      </div>

      {/* 3. 快速操作區 */}
      <div className="px-6">
        <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: colors.textSecondary }}>合約操作</h3>
        <div className="grid grid-cols-2 gap-3">
             <ActionBtn icon={<Printer size={20} />} label="列印合約" />
             {/* 續約按鈕 (因為快到期了，用醒目顏色) */}
             <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border active:scale-95 transition-all"
                    style={{ backgroundColor: '#FFF8F0', borderColor: colors.warning, color: colors.warning }}>
                <FileText size={20} />
                <span className="text-xs font-bold">辦理續約</span>
            </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, colors, highlight }: any) {
    return (
        <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 opacity-60">
                {icon}
                <span className="text-xs font-medium">{label}</span>
            </div>
            <span className={`font-bold ${highlight ? 'text-[#E8B05C]' : ''}`} style={{ color: highlight ? undefined : colors.textPrimary }}>
                {value}
            </span>
        </div>
    )
}

function ActionBtn({ icon, label }: any) {
    return (
        <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-transparent shadow-sm active:scale-95 transition-all text-[#4B382A]">
            {icon}
            <span className="text-xs font-bold">{label}</span>
        </button>
    )
}