// 這裡是：報修派遣 (Repairs) - 維修管理與師傅通訊錄
'use client';

import React, { useState } from 'react';
import { ChevronLeft, Hammer, Phone, Plus, CheckCircle2, Clock, AlertCircle, User, Wrench } from 'lucide-react';
import Link from 'next/link';

// 官方定案色票
const colors = {
  bgMain: '#F1EEEB', textPrimary: '#4B382A', textSecondary: '#8C7E74',
  cardBg: '#FFFFFF', danger: '#C66C6C', success: '#7D9D75', warning: '#E8B05C',
  tagBg: '#F2F0EE'
};

export default function RepairsPage() {
  const [activeTab, setActiveTab] = useState('active'); // active | history

  return (
    <div className="min-h-screen font-sans pb-24" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 導覽列 */}
      <header className="sticky top-0 z-20 px-5 h-16 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>報修派遣</h1>
        <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50" style={{ color: colors.textPrimary }}>
            <Plus size={24} />
        </button>
      </header>

      {/* 2. 切換標籤 */}
      <div className="px-5 py-4">
        <div className="p-1 rounded-full flex relative bg-[#E4D8CB]">
            <TabButton label="待處理 (2)" active={activeTab === 'active'} onClick={() => setActiveTab('active')} />
            <TabButton label="歷史紀錄" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
        </div>
      </div>

      {/* 3. 常用師傅 (快速撥號) */}
      <div className="px-5 mb-6">
        <h3 className="text-xs font-bold tracking-widest uppercase mb-3 ml-1" style={{ color: colors.textSecondary }}>常用工班</h3>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            <HandymanCard name="陳師傅" type="水電急修" phone="0912-345-678" />
            <HandymanCard name="李大哥" type="冷氣空調" phone="0988-777-666" />
            <HandymanCard name="王阿姨" type="居家清潔" phone="0933-222-111" />
        </div>
      </div>

      {/* 4. 報修列表 */}
      <div className="px-5 space-y-4">
        <h3 className="text-xs font-bold tracking-widest uppercase mb-1 ml-1" style={{ color: colors.textSecondary }}>
            {activeTab === 'active' ? '進行中案件' : '已結案紀錄'}
        </h3>
        
        {activeTab === 'active' ? (
            <>
                {/* 案件 1: 緊急 */}
                <RepairCard 
                    id="R-20240211-01"
                    room="文心館 - 305 室"
                    issue="熱水器故障，沒熱水"
                    status="pending"
                    date="今天 10:30"
                    tenant="陳小明"
                />
                {/* 案件 2: 處理中 */}
                <RepairCard 
                    id="R-20240210-02"
                    room="大墩館 - 201 室"
                    issue="冷氣不冷，需清洗濾網"
                    status="assigned"
                    date="昨天 14:20"
                    tenant="林怡君"
                    handyman="李大哥 (冷氣)"
                />
            </>
        ) : (
            <>
                {/* 歷史案件 */}
                <RepairCard 
                    id="R-20240115-05"
                    room="大墩館 - 202 室"
                    issue="更換浴室燈泡"
                    status="completed"
                    date="2024/01/15"
                    tenant="張建國"
                />
            </>
        )}
      </div>
    </div>
  );
}

// --- 元件區 ---

function RepairCard({ id, room, issue, status, date, tenant, handyman }: any) {
    // 狀態設定
    let statusConfig = { text: '待處理', color: colors.danger, bg: '#FEEEEE', icon: <AlertCircle size={14} /> };
    if (status === 'assigned') statusConfig = { text: '師傅派工中', color: colors.warning, bg: '#FFF8F0', icon: <Wrench size={14} /> };
    if (status === 'completed') statusConfig = { text: '已結案', color: colors.success, bg: '#F2F8F2', icon: <CheckCircle2 size={14} /> };

    return (
        <div className="rounded-[24px] p-5 shadow-sm bg-white border border-transparent hover:border-[#CFB3A9] transition-all relative overflow-hidden group">
            {/* 狀態標籤 */}
            <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold opacity-40">{id}</span>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1`}
                      style={{ backgroundColor: statusConfig.bg, color: statusConfig.color }}>
                    {statusConfig.icon} {statusConfig.text}
                </span>
            </div>

            {/* 主要內容 */}
            <div className="mb-4">
                <h4 className="font-bold text-lg mb-1 text-[#4B382A]">{room}</h4>
                <p className="text-sm font-medium text-[#4B382A]">{issue}</p>
            </div>

            {/* 詳細資訊 */}
            <div className="flex items-center gap-4 text-xs text-[#8C7E74]">
                <div className="flex items-center gap-1">
                    <User size={12} /> {tenant}
                </div>
                <div className="flex items-center gap-1">
                    <Clock size={12} /> {date}
                </div>
            </div>

            {/* 派工資訊 (如果有) */}
            {handyman && (
                <div className="mt-3 pt-3 border-t border-dashed border-gray-200 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#F2F0EE] flex items-center justify-center text-[#8C7E74]">
                        <Wrench size={12} />
                    </div>
                    <p className="text-xs font-bold text-[#8C7E74]">已指派：{handyman}</p>
                </div>
            )}

            {/* 待處理時的操作按鈕 */}
            {status === 'pending' && (
                <div className="mt-4 flex gap-2">
                    <button className="flex-1 py-2 rounded-xl bg-[#4B382A] text-white text-xs font-bold shadow-md active:scale-95 transition-transform">
                        指派師傅
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-[#F2F0EE] text-[#8C7E74] text-xs font-bold active:scale-95 transition-transform">
                        聯絡房客
                    </button>
                </div>
            )}
        </div>
    )
}

function HandymanCard({ name, type, phone }: any) {
    return (
        <div className="min-w-[120px] p-3 rounded-2xl bg-white border border-gray-100 flex flex-col items-center gap-2 cursor-pointer hover:border-[#CFB3A9] active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-full bg-[#F2F0EE] flex items-center justify-center text-[#4B382A]">
                <User size={20} />
            </div>
            <div className="text-center">
                <p className="text-xs font-bold text-[#4B382A]">{name}</p>
                <p className="text-[10px] text-[#8C7E74]">{type}</p>
            </div>
            <a href={`tel:${phone}`} className="w-full py-1.5 rounded-full bg-[#E4D8CB] text-white text-[10px] font-bold flex items-center justify-center gap-1 mt-1">
                <Phone size={10} /> 撥號
            </a>
        </div>
    )
}

function TabButton({ label, active, onClick }: any) {
    return (
        <button onClick={onClick} 
                className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${active ? 'bg-white text-[#4B382A] shadow-sm' : 'text-[#8C7E74] hover:bg-white/50'}`}>
            {label}
        </button>
    )
}