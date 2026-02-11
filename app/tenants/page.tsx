// 這裡是：房客與合約管理 (Tenants & Contracts)
'use client';

import React from 'react';
import { ChevronLeft, Search, Plus, Phone, MessageCircle, FileText, Calendar, MapPin, User } from 'lucide-react';
import Link from 'next/link';

const colors = {
  bgMain: '#F1EEEB', textPrimary: '#4B382A', textSecondary: '#8C7E74', accent: '#CFB3A9', cardBg: '#FFFFFF',
  tagBg: '#F2F0EE', danger: '#C66C6C', success: '#7D9D75', warning: '#E8B05C'
};

export default function TenantListPage() {
  return (
    <div className="min-h-screen font-sans pb-24" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 導覽列 */}
      <header className="sticky top-0 z-20 px-5 h-16 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>房客與合約</h1>
        
        {/* 🔥 修正：右上角的 + 號連到合約製作器 */}
        <Link href="/contract/new">
            <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50" style={{ color: colors.textPrimary }}>
                <Plus size={24} />
            </button>
        </Link>
      </header>

      {/* 搜尋 */}
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-center gap-3 px-4 py-3 rounded-full shadow-sm border border-transparent focus-within:border-[#CFB3A9] transition-all" style={{ backgroundColor: colors.cardBg }}>
            <Search size={18} style={{ color: colors.textSecondary }} />
            <input type="text" placeholder="搜尋房號或地址..." className="bg-transparent outline-none text-sm font-bold flex-1" style={{ color: colors.textPrimary }} />
        </div>
      </div>

      {/* 列表 */}
      <div className="px-5 space-y-4">
            
            {/* 案例 A：合約快到期 */}
            <div>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: colors.warning }}>⚠ 合約即將到期</h3>
                <TenantContractCard 
                    address="文心館 - 305 室"  
                    tenant="陳小明"            
                    paymentStatus="已繳費" 
                    contractPeriod="2024/02/20 到期"
                    daysLeft={5}
                    isExpiring
                    colors={colors} 
                />
            </div>

            {/* 案例 B：欠費 */}
            <div>
                 <h3 className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: colors.danger }}>⚠ 需催繳房租</h3>
                 <TenantContractCard 
                    address="文心館 - 101 室" 
                    tenant="王阿姨" 
                    paymentStatus="欠費 $12,000" 
                    contractPeriod="2024/06/01 到期"
                    daysLeft={110}
                    isLate
                    colors={colors} 
                />
            </div>

            {/* 案例 C：正常 */}
            <div>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: colors.textSecondary }}>正常租賃中</h3>
                <div className="space-y-3">
                    <TenantContractCard 
                        address="大墩館 - 201 室" 
                        tenant="林怡君" 
                        paymentStatus="已繳費" 
                        contractPeriod="2024/08/15 到期"
                        daysLeft={185}
                        colors={colors} 
                    />
                    <TenantContractCard 
                        address="大墩館 - 202 室" 
                        tenant="張建國" 
                        paymentStatus="已繳費" 
                        contractPeriod="2024/09/01 到期"
                        daysLeft={200}
                        colors={colors} 
                    />
                </div>
            </div>
      </div>
    </div>
  );
}

// --- 卡片元件 ---

function TenantContractCard({ address, tenant, paymentStatus, contractPeriod, daysLeft, isExpiring, isLate, colors }: any) {
    return (
        <div className="rounded-[24px] p-4 shadow-sm border border-transparent hover:border-[#CFB3A9] transition-all cursor-pointer group active:scale-98 relative overflow-hidden bg-white">
            
            {/* 側邊警示條 */}
            {(isLate || isExpiring) && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: isLate ? colors.danger : colors.warning }}></div>
            )}

            {/* 上半部：以地址為主 */}
            <div className="flex justify-between items-start mb-3 pl-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm" 
                         style={{ backgroundColor: isLate ? colors.danger : (isExpiring ? colors.warning : colors.accent) }}>
                        <MapPin size={18} />
                    </div>
                    <div>
                        <h4 className="font-bold text-base" style={{ color: colors.textPrimary }}>{address}</h4>
                        <div className="flex items-center gap-1 mt-0.5">
                            <User size={10} style={{ color: colors.textSecondary }} />
                            <p className="text-xs font-medium" style={{ color: colors.textSecondary }}>承租人：{tenant}</p>
                        </div>
                    </div>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold border`}
                      style={{ 
                          borderColor: isLate ? colors.danger : 'transparent',
                          backgroundColor: isLate ? '#FFF0F0' : '#F2F8F2', 
                          color: isLate ? colors.danger : colors.success 
                      }}>
                    {paymentStatus}
                </span>
            </div>

            <div className="h-px w-full bg-[#F2F0EE] mb-3 pl-2"></div>

            {/* 下半部：合約資訊 */}
            <div className="pl-2 flex justify-between items-end">
                <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={12} style={{ color: colors.textSecondary }} />
                        <p className="text-[10px] font-bold" style={{ color: colors.textSecondary }}>{contractPeriod}</p>
                    </div>
                    {isExpiring && (
                        <p className="text-[10px] font-bold animate-pulse" style={{ color: colors.warning }}>⚠ 剩餘 {daysLeft} 天</p>
                    )}
                </div>

                <div className="flex gap-2">
                     <button className="p-2 rounded-full transition-colors active:scale-90 bg-[#F2F0EE] text-[#8C7E74]">
                        <Phone size={16} />
                    </button>
                    {/* 連到單份合約詳情 */}
                    <Link href="/contract"> 
                        <button className="flex items-center gap-1 px-3 py-2 rounded-full text-[10px] font-bold transition-transform active:scale-95"
                                style={{ backgroundColor: colors.textPrimary, color: 'white' }}>
                            <FileText size={12} />
                            合約詳情
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}