// 這裡是：門鎖管理 (Smart Locks) - 精緻清單版 (縮小圖示)
'use client';

import React, { useState } from 'react';
import { ChevronLeft, Lock, Unlock, Battery, Wifi, Trash2, Plus, Fingerprint, Hash, CreditCard, AlertCircle, RefreshCw, User, History } from 'lucide-react';
import Link from 'next/link';

// 官方定案色票
const colors = {
  bgMain: '#F1EEEB', textPrimary: '#4B382A', textSecondary: '#8C7E74',
  cardBg: '#FFFFFF', danger: '#C66C6C', success: '#7D9D75', warning: '#E8B05C',
  highlight: '#6C8CC6'
};

export default function SmartLockPage() {
  const [activeTab, setActiveTab] = useState<'remote' | 'access'>('remote');

  return (
    <div className="min-h-screen font-sans pb-24" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 導覽列 */}
      <header className="sticky top-0 z-20 px-5 h-16 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>門鎖管理</h1>
        <div className="w-10"></div>
      </header>

      {/* 2. 分頁切換 */}
      <div className="px-5 py-4">
        <div className="bg-white p-1 rounded-full flex shadow-sm">
            <TabButton label="遠端操作" icon={<Lock size={14} />} active={activeTab === 'remote'} onClick={() => setActiveTab('remote')} />
            <TabButton label="權限管理" icon={<User size={14} />} active={activeTab === 'access'} onClick={() => setActiveTab('access')} />
        </div>
      </div>

      {/* 3. 內容區 */}
      <div className="px-5">
        {activeTab === 'remote' ? (
            // --- 分頁 A: 遠端開門 (縮小版) ---
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <RemoteLockCardSmall 
                    room="文心館 - 1F 大門" 
                    model="Aqara A100 Pro"
                    battery="85"
                    status="locked"
                />
                 <RemoteLockCardSmall 
                    room="大墩館 - 1F 大門" 
                    model="Aqara N100"
                    battery="42"
                    status="locked"
                />
                 <RemoteLockCardSmall 
                    room="大墩館 - 2F 辦公室" 
                    model="Aqara D100"
                    battery="92"
                    status="unlocked"
                />
                <p className="text-[10px] text-center text-[#8C7E74] opacity-60 mt-4">
                    *點擊右側開關即可遠端解鎖
                </p>
            </div>
        ) : (
            // --- 分頁 B: 權限管理 ---
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="bg-[#FFF8F0] border border-[#E8B05C] rounded-xl p-3 flex gap-3 items-start mb-4">
                    <AlertCircle size={16} className="text-[#E8B05C] mt-0.5 flex-none" />
                    <p className="text-xs text-[#4B382A] leading-relaxed">
                        請對照 <span className="font-bold">「用戶編號」</span> 至電子鎖本機進行刪除，確保退租安全。
                    </p>
                </div>
                
                <AccessListCard 
                    lockName="文心館 - 1F 大門"
                    users={[
                        { id: '001', name: '房東 (Admin)', type: 'fingerprint', role: 'admin' },
                        { id: '002', name: '305 陳小明', type: 'fingerprint', role: 'tenant' },
                        { id: '003', name: '305 陳小明', type: 'password', role: 'tenant' },
                        { id: '006', name: '清潔阿姨', type: 'password', role: 'staff' },
                    ]}
                />
            </div>
        )}
      </div>
    </div>
  );
}

// --- 元件區 ---

// 1. 遠端開鎖卡片 (縮小版)
function RemoteLockCardSmall({ room, model, battery, status }: any) {
    const [isLocked, setIsLocked] = useState(status === 'locked');
    const [loading, setLoading] = useState(false);

    const handleToggle = () => {
        setLoading(true);
        setTimeout(() => {
            setIsLocked(!isLocked);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="rounded-[20px] p-4 shadow-sm bg-white border border-transparent hover:border-[#CFB3A9] flex items-center justify-between transition-all">
            {/* 左側資訊 */}
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${isLocked ? 'bg-[#4B382A]' : 'bg-[#7D9D75]'}`}>
                    {isLocked ? <Lock size={18} /> : <Unlock size={18} />}
                </div>
                <div>
                    <h3 className="text-sm font-bold text-[#4B382A]">{room}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] text-[#8C7E74]">{model}</p>
                        <div className="w-px h-2 bg-gray-300"></div>
                        <p className={`text-[10px] font-bold flex items-center gap-0.5 ${parseInt(battery) < 20 ? 'text-[#C66C6C]' : 'text-[#7D9D75]'}`}>
                            <Battery size={8} /> {battery}%
                        </p>
                    </div>
                </div>
            </div>

            {/* 右側按鈕 (縮小版開關) */}
            <button onClick={handleToggle} disabled={loading}
                    className={`h-9 px-4 rounded-full flex items-center justify-center transition-all shadow-sm active:scale-95 border
                    ${isLocked ? 'bg-white border-[#E5E5E5] text-[#4B382A]' : 'bg-[#7D9D75] border-[#7D9D75] text-white'}`}>
                {loading ? <RefreshCw size={14} className="animate-spin" /> : (
                    <span className="text-xs font-bold">{isLocked ? '解鎖' : '已開'}</span>
                )}
            </button>
        </div>
    )
}

// 2. 權限列表卡片 (保持原樣)
function AccessListCard({ lockName, users }: any) {
    const [userList, setUserList] = useState(users);

    const handleDelete = (userId: string) => {
        if (confirm(`確認要標記刪除編號 [${userId}] 嗎？`)) {
            setUserList(userList.filter((u: any) => u.id !== userId));
        }
    };

    return (
        <div className="rounded-[24px] bg-white shadow-sm overflow-hidden border border-gray-100">
            <div className="p-4 bg-[#F9F9F9] border-b border-gray-100">
                <h3 className="text-sm font-bold text-[#4B382A] flex items-center gap-2"><Lock size={16} /> {lockName}</h3>
            </div>
            <div className="p-2">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-[10px] text-[#8C7E74] border-b border-dashed border-gray-200"><th className="py-2 pl-4">編號</th><th className="py-2">使用者</th><th className="py-2 text-right pr-4">刪除</th></tr>
                    </thead>
                    <tbody>
                        {userList.map((user: any) => (
                            <tr key={user.id} className="border-b border-gray-50 last:border-0">
                                <td className="py-3 pl-4"><span className="font-mono text-xs font-bold bg-[#F2F0EE] px-2 py-1 rounded">{user.id}</span></td>
                                <td className="py-3">
                                    <div className="flex flex-col"><span className="text-xs font-bold text-[#4B382A]">{user.name}</span><div className="flex items-center gap-1 text-[10px] text-[#8C7E74]">{user.type === 'fingerprint' ? <Fingerprint size={10}/> : <Hash size={10}/>} {user.type === 'fingerprint' ? '指紋' : '密碼'}</div></div>
                                </td>
                                <td className="py-3 pr-4 text-right">
                                    {user.role !== 'admin' && <button onClick={() => handleDelete(user.id)} className="p-2 rounded-full bg-[#FFF0F0] text-[#C66C6C] active:scale-90"><Trash2 size={14} /></button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function TabButton({ label, icon, active, onClick }: any) {
    return (
        <button onClick={onClick} className={`flex-1 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all ${active ? 'bg-[#4B382A] text-white shadow-md' : 'text-[#8C7E74]'}`}>
            {icon} {label}
        </button>
    )
}