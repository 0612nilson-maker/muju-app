// 這裡是：合約管理 (Contracts) - 查看租約與到期日
'use client';

import React from 'react';
import { ChevronLeft, Search, Plus, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
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
  danger: '#C66C6C',       // 過期/警告
  success: '#7D9D75',      // 正常
  warning: '#E8B05C'       // 即將到期
};

export default function ContractPage() {
  return (
    <div className="min-h-screen font-sans pb-24" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 導覽列 */}
      <header className="sticky top-0 z-20 px-5 h-16 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>租約管理</h1>
        <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50" style={{ color: colors.textPrimary }}>
            <Plus size={24} />
        </button>
      </header>

      {/* 2. 狀態概覽 */}
      <div className="px-5 py-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            <StatusCard label="生效中" count="12" color={colors.success} active />
            <StatusCard label="即將到期" count="1" color={colors.warning} />
            <StatusCard label="已過期" count="0" color={colors.textSecondary} />
        </div>
      </div>

      {/* 3. 合約列表 */}
      <div className="px-5 space-y-4">
            
            {/* 即將到期 (特別標示) */}
            <div>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: colors.warning }}>⚠ 需注意</h3>
                <ContractCard 
                    title="陳小明 - 租賃契約" 
                    room="文心館 - 305 室" 
                    date="2023/02/15 - 2024/02/15" 
                    daysLeft="剩 5 天"
                    status="expiring"
                    colors={colors} 
                />
            </div>

            {/* 正常合約 */}
            <div>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: colors.textSecondary }}>生效中</h3>
                <ContractCard 
                    title="林怡君 - 租賃契約" 
                    room="大墩館 - 201 室" 
                    date="2023/06/01 - 2024/06/01" 
                    daysLeft="剩 110 天"
                    status="active"
                    colors={colors} 
                />
                <ContractCard 
                    title="張建國 - 租賃契約" 
                    room="大墩館 - 202 室" 
                    date="2023/08/20 - 2024/08/20" 
                    daysLeft="剩 190 天"
                    status="active"
                    colors={colors} 
                />
            </div>
      </div>
    </div>
  );
}

// --- 元件區 ---

function ContractCard({ title, room, date, daysLeft, status, colors }: any) {
    const isExpiring = status === 'expiring';
    const statusColor = isExpiring ? colors.warning : colors.success;
    
    return (
        <div className="rounded-[24px] p-4 shadow-sm border border-transparent hover:border-[#CFB3A9] transition-all cursor-pointer group active:scale-98 mb-3"
             style={{ backgroundColor: colors.cardBg }}>
            
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                         style={{ backgroundColor: colors.tagBg, color: colors.textPrimary }}>
                        <FileText size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm" style={{ color: colors.textPrimary }}>{title}</h4>
                        <p className="text-[10px]" style={{ color: colors.textSecondary }}>{room}</p>
                    </div>
                </div>
                {isExpiring && <AlertCircle size={18} style={{ color: colors.warning }} className="animate-pulse" />}
            </div>

            <div className="flex justify-between items-end pl-2 border-t pt-2 border-[#F2F0EE]">
                <div>
                     <p className="text-[9px] font-bold uppercase mb-0.5" style={{ color: colors.textSecondary }}>合約期間</p>
                     <p className="text-xs font-bold" style={{ color: colors.textPrimary }}>{date}</p>
                </div>
                <div className="text-right">
                     <span className={`text-[10px] px-2 py-1 rounded-full font-bold text-white`}
                           style={{ backgroundColor: statusColor }}>
                        {daysLeft}
                     </span>
                </div>
            </div>
        </div>
    )
}

function StatusCard({ label, count, color, active, colors }: any) {
    return (
        <div className={`min-w-[100px] p-3 rounded-2xl border transition-all cursor-pointer`}
             style={{ 
                 backgroundColor: active ? '#FFFFFF' : 'transparent',
                 borderColor: active ? color : 'transparent',
                 boxShadow: active ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
             }}>
            <p className="text-[10px] font-bold mb-1 opacity-70" style={{ color: active ? color : '#8C7E74' }}>{label}</p>
            <p className="text-2xl font-bold" style={{ color: color }}>{count}</p>
        </div>
    )
}