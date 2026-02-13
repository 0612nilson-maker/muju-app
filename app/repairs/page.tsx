'use client';
import React, { useState } from 'react';
import { useApp } from '../context';
import { ChevronLeft, Snowflake, Zap, Droplets, Armchair, HelpCircle, RefreshCw, Trash2 } from 'lucide-react';
import Link from 'next/link';

const getCategoryIcon = (category: string) => {
    if (category.includes('冷氣')) return <Snowflake size={18} className="text-[#6C8CC6]" />;
    if (category.includes('水電')) return <Zap size={18} className="text-[#E8B05C]" />;
    if (category.includes('漏水')) return <Droplets size={18} className="text-[#6C8CC6]" />;
    if (category.includes('家具')) return <Armchair size={18} className="text-[#8C7E74]" />;
    return <HelpCircle size={18} className="text-[#8C7E74]" />;
};

export default function RepairPage() {
  const { repairs, updateRepairStatus, resetData } = useApp();
  const [filter, setFilter] = useState('all');

  // 防止 repairs 為空時出錯
  const safeRepairs = repairs || [];
  const filteredList = safeRepairs.filter(r => filter === 'all' || r.status === filter);

  return (
    <div className="min-h-screen bg-[#F1EEEB] text-[#4B382A] pb-24">
      <header className="px-5 h-16 flex justify-between items-center bg-[#F1EEEB] sticky top-0 z-10 border-b">
        <Link href="/" className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-full text-xs font-bold shadow-sm"><ChevronLeft size={16} /> 返回</Link>
        <h1 className="font-bold">報修中心</h1>
        <button onClick={resetData} className="p-2 text-red-400"><Trash2 size={18}/></button>
      </header>

      <div className="px-5 mt-4 flex gap-2">
        {['all', 'pending', 'processing', 'done'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-[10px] font-bold ${filter === f ? 'bg-[#4B382A] text-white' : 'bg-white'}`}>
            {f === 'all' ? '全部' : f === 'pending' ? '待處理' : f === 'processing' ? '處理中' : '已完成'}
          </button>
        ))}
      </div>

      <div className="px-5 space-y-4 mt-4">
        {filteredList.map((r) => (
          <div key={r.id} className="bg-white p-5 rounded-[24px] shadow-sm relative">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">{getCategoryIcon(r.category)}</div>
                <div><h3 className="font-bold text-sm">{r.room}</h3><p className="text-[10px] text-gray-400">{r.category} • {r.date}</p></div>
              </div>
              <span className={`text-[9px] px-2 py-1 rounded-full font-bold ${r.status === 'pending' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{r.status}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl text-xs mb-4">{r.description}</div>
            {r.status !== 'done' && (
              <button onClick={() => updateRepairStatus(r.id, r.status === 'pending' ? 'processing' : 'done')} className="w-full py-3 bg-[#4B382A] text-white rounded-xl text-xs font-bold">
                {r.status === 'pending' ? '開始處理' : '結案'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}