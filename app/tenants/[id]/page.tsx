// 這裡是：房客詳情頁 (Tenant Detail) - 包含合約、撥號功能與離線門鎖管理
'use client';

import React, { useState } from 'react';
import { ChevronLeft, User, Phone, MessageCircle, FileText, Key, Fingerprint, Hash, CreditCard, Trash2, Plus, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// 官方定案色票
const colors = {
  bgMain: '#F1EEEB', textPrimary: '#4B382A', textSecondary: '#8C7E74',
  cardBg: '#FFFFFF', danger: '#C66C6C', success: '#7D9D75', warning: '#E8B05C',
  tagBg: '#F2F0EE'
};

export default function TenantDetailPage() {
  // 模擬資料：這是某位房客「陳小明」的資料
  const tenant = {
    name: '陳小明',
    room: '文心館 - 305 室',
    phone: '0912345678', // 格式化為連線用
    status: 'active', // active | leaving
    contractEnd: '2026-06-30'
  };

  // 模擬門禁資料 (這就是你的「帳本」)
  const [accessLogs, setAccessLogs] = useState([
    { id: 1, lock: '1F 大門', type: 'fingerprint', slot: '003', value: '(指紋數據)', note: '主要進出' },
    { id: 2, lock: '1F 大門', type: 'password', slot: '003', value: '882525', note: '備用密碼' },
    { id: 3, lock: '305 房門', type: 'password', slot: '01', value: '123456', note: '自訂密碼' },
  ]);

  // 刪除處理 (模擬)
  const handleDelete = (logId: number, slot: string, lock: string) => {
    // 這裡的確認視窗是關鍵！提醒你去實體鎖操作
    if (confirm(`【重要提醒】\n\n請務必先走到 [${lock}] 前，\n手動刪除編號 [${slot}] 的權限！\n\n確認已在實體鎖刪除？`)) {
        setAccessLogs(accessLogs.filter(log => log.id !== logId));
    }
  };

  return (
    <div className="min-h-screen font-sans pb-24" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 導覽列 */}
      <header className="sticky top-0 z-20 px-5 h-16 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/tenants" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>租客詳情</h1>
        <div className="w-10"></div>
      </header>

      {/* 2. 租客基本資料卡 */}
      <div className="px-5 py-4">
        <div className="bg-white rounded-[24px] p-5 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-[#A09086] flex items-center justify-center text-xl font-bold text-white border-2 border-white shadow-md">
                        陳
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#4B382A]">{tenant.name}</h2>
                        <p className="text-xs text-[#8C7E74] font-medium">{tenant.room}</p>
                    </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32] flex items-center gap-1">
                    <CheckCircle2 size={10} /> 租約正常
                </span>
            </div>
            
            {/* 這裡的按鈕現在真的能撥電話了 */}
            <div className="flex gap-2 mt-2">
                <ActionButton icon={<Phone size={14} />} label="撥電話" href={`tel:${tenant.phone}`} />
                <ActionButton icon={<MessageCircle size={14} />} label="傳訊息" href={`sms:${tenant.phone}`} />
                <ActionButton icon={<FileText size={14} />} label="看合約" />
            </div>
        </div>
      </div>

      {/* 3. 重頭戲：門禁權限帳本 (Access Ledger) */}
      <div className="px-5">
        <div className="flex justify-between items-end mb-2 ml-1">
            <h3 className="text-xs font-bold tracking-widest uppercase text-[#8C7E74]">
                門禁權限帳本 (離線紀錄)
            </h3>
            <button className="text-[10px] font-bold text-[#CFB3A9] flex items-center gap-1 active:scale-95">
                <Plus size={12} /> 新增權限
            </button>
        </div>

        {/* 提示卡 */}
        <div className="bg-[#FFF8F0] border border-[#E8B05C] rounded-xl p-3 flex gap-3 items-start mb-4">
            <AlertTriangle size={16} className="text-[#E8B05C] mt-0.5 flex-none" />
            <p className="text-[11px] text-[#4B382A] leading-relaxed opacity-90">
                此處僅為紀錄。若要刪除權限，請務必對照 <span className="font-bold underline">「編號 (Slot)」</span> 至實體電子鎖上操作刪除。
            </p>
        </div>

        {/* 列表清單 */}
        <div className="space-y-3">
            {accessLogs.map((log) => (
                <div key={log.id} className="bg-white rounded-[20px] p-4 shadow-sm border border-transparent hover:border-[#CFB3A9] transition-all relative group">
                    
                    <div className="flex justify-between items-start">
                        {/* 左側：編號與類型 */}
                        <div className="flex items-center gap-4">
                            {/* 編號顯示區 (重點) */}
                            <div className="flex flex-col items-center justify-center w-12 h-12 bg-[#F2F0EE] rounded-xl border border-gray-100">
                                <span className="text-[9px] text-[#8C7E74] font-bold uppercase">Slot</span>
                                <span className="text-lg font-bold text-[#4B382A] font-mono">{log.slot}</span>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-[#4B382A] flex items-center gap-2">
                                    {log.lock}
                                    <span className="text-[10px] font-normal text-[#8C7E74] bg-gray-100 px-1.5 py-0.5 rounded-md">
                                        {log.note}
                                    </span>
                                </h4>
                                
                                <div className="flex items-center gap-2 mt-1">
                                    {/* 類型圖示 */}
                                    <div className="flex items-center gap-1 text-[11px] text-[#8C7E74] font-medium">
                                        {log.type === 'fingerprint' && <><Fingerprint size={12} /> 指紋</>}
                                        {log.type === 'password' && <><Hash size={12} /> 密碼</>}
                                        {log.type === 'card' && <><CreditCard size={12} /> 卡片</>}
                                    </div>
                                    <div className="w-px h-3 bg-gray-300"></div>
                                    <span className="text-[11px] text-[#4B382A] font-mono tracking-wider opacity-80">
                                        {log.value}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 右側：刪除按鈕 */}
                        <button 
                            onClick={() => handleDelete(log.id, log.slot, log.lock)}
                            className="w-8 h-8 rounded-full bg-[#FFF0F0] text-[#C66C6C] flex items-center justify-center active:scale-90 transition-transform shadow-sm"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>

                </div>
            ))}

            {/* 如果清單空了 */}
            {accessLogs.length === 0 && (
                <div className="text-center py-8 opacity-40">
                    <Key size={32} className="mx-auto mb-2 text-[#8C7E74]" />
                    <p className="text-xs">目前沒有登記任何門禁權限</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

// --- 元件區 ---

// 支援連結 (href) 的按鈕元件
function ActionButton({ icon, label, href }: any) {
    // 如果有 href (例如 tel:...)，就回傳 <a> 標籤
    if (href) {
        return (
            <a href={href} className="flex-1 py-2 rounded-xl border border-gray-100 flex items-center justify-center gap-2 text-xs font-bold text-[#8C7E74] hover:bg-[#F9F9F9] active:scale-95 transition-all">
                {icon} {label}
            </a>
        )
    }
    // 否則回傳一般 <button>
    return (
        <button className="flex-1 py-2 rounded-xl border border-gray-100 flex items-center justify-center gap-2 text-xs font-bold text-[#8C7E74] hover:bg-[#F9F9F9] active:scale-95 transition-all">
            {icon} {label}
        </button>
    )
}