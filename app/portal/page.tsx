// 這裡是：房客端 (Portal) - 含帳務繳款功能
'use client';
import React, { useState } from 'react';
import { useApp } from '../context';
import { Wrench, X, LogOut, CheckCircle2, Clock, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function TenantPortal() {
  const { addRepair, rentStatus, notifyTransfer } = useApp(); // 引入帳務狀態
  const [showModal, setShowModal] = useState(false);
  const [desc, setDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket = { id: `R-${Date.now()}`, room: '文心館 - 305 (測試)', category: '冷氣/空調', description: desc, status: 'pending' as const, date: new Date().toISOString().split('T')[0], isRead: false };
    addRepair(newTicket);
    alert('✅ 報修單已送出！');
    setDesc('');
    setShowModal(false);
  };

  const handlePay = () => {
      if(confirm('確認已完成轉帳？\n系統將通知房東進行對帳。')) {
          notifyTransfer();
          alert('✅ 通知已送出！等待房東確認中。');
      }
  }

  return (
    <div className="min-h-screen bg-[#F1EEEB] text-[#4B382A] pb-24 max-w-md mx-auto relative">
      <div className="p-6 bg-white rounded-b-[32px] shadow-sm mb-6">
        <h1 className="text-xl font-bold">房客入口 (Portal)</h1>
        <p className="text-xs text-gray-500">測試模式：你是陳小明</p>
      </div>

      <div className="px-6 space-y-4">
        
        {/* 💰 帳務卡片 (可互動) */}
        <div className="bg-[#2C2119] rounded-[24px] p-5 text-white shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-xs opacity-60 mb-1">本月租金 (含電費)</p>
                    <h2 className="text-3xl font-bold">$16,250</h2>
                </div>
                {/* 狀態標籤 */}
                <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${rentStatus === 'paid' ? 'bg-[#7D9D75] text-white' : rentStatus === 'review' ? 'bg-[#E8B05C] text-white' : 'bg-white/20 text-white'}`}>
                    {rentStatus === 'paid' ? <><CheckCircle2 size={12}/> 已繳費</> : rentStatus === 'review' ? <><Clock size={12}/> 對帳中</> : '未繳費'}
                </div>
            </div>

            {/* 按鈕邏輯 */}
            {rentStatus === 'unpaid' && (
                <button onClick={handlePay} className="w-full py-3 bg-white text-[#2C2119] rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 hover:bg-gray-100 transition-all">
                    <Wallet size={16} /> 通知已匯款
                </button>
            )}
            {rentStatus === 'review' && (
                <div className="w-full py-3 bg-white/10 rounded-xl text-center text-xs opacity-80 border border-white/10">
                    系統已通知房東，請耐心等候對帳...
                </div>
            )}
            {rentStatus === 'paid' && (
                <div className="w-full py-3 bg-[#7D9D75]/20 rounded-xl text-center text-xs font-bold text-[#7D9D75] border border-[#7D9D75]/30">
                    🎉 感謝您！本月款項已結清
                </div>
            )}
        </div>

        <button onClick={() => setShowModal(true)} className="w-full py-4 bg-[#E8B05C] text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <Wrench /> 我要報修
        </button>
      </div>

      {/* 報修視窗代碼省略 (與之前相同) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"><div className="bg-white w-full p-6 rounded-t-[32px]"><div className="flex justify-between mb-4"><h3 className="font-bold">填寫報修單</h3><button onClick={() => setShowModal(false)}><X /></button></div><form onSubmit={handleSubmit}><textarea className="w-full h-32 bg-gray-100 rounded-xl p-4 mb-4 outline-none" placeholder="輸入問題..." value={desc} onChange={e => setDesc(e.target.value)} required /><button type="submit" className="w-full py-4 bg-[#4B382A] text-white rounded-xl font-bold">確認送出</button></form></div></div>
      )}

      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40">
        <Link href="/" className="bg-[#4B382A] text-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform border-2 border-white/20">
            <LogOut size={16} /> 結束測試
        </Link>
      </div>
    </div>
  );
}