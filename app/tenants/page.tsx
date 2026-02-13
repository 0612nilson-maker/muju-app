'use client';
import React from 'react';
import { useApp } from '../context';
import { ChevronLeft, CheckCircle2, User, Phone, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TenantListPage() {
  const { assets } = useApp();

  // ✨ 從所有標的中攤平抓取「已出租」的租客
  const allTenants = assets.flatMap(asset => 
    asset.units
      .filter(unit => unit.status === 'rented' && unit.tenant)
      .map(unit => ({
        ...unit.tenant!,
        roomInfo: `${asset.name} - ${unit.roomNumber}`,
        rent: unit.currentRent
      }))
  );

  return (
    <div className="min-h-screen bg-[#F1EEEB] text-[#4B382A] pb-24">
      <header className="sticky top-0 z-20 px-5 h-20 flex justify-between items-center bg-[#F1EEEB]/80 backdrop-blur-md">
        <Link href="/"><ChevronLeft size={24} /></Link>
        <div className="text-center">
            <h1 className="text-base font-bold tracking-widest uppercase">Tenant Roster</h1>
            <p className="text-[10px] text-[#8C7E74] font-bold">目前共 {allTenants.length} 位房客</p>
        </div>
        <div className="w-10"></div>
      </header>

      <div className="px-5 space-y-4 mt-2">
          {allTenants.length === 0 && (
              <div className="text-center py-20 opacity-30">
                  <User size={48} className="mx-auto mb-4"/>
                  <p className="text-sm font-bold">目前尚無租客資料</p>
                  <p className="text-[10px]">請先至資產管家進行簽約</p>
              </div>
          )}

          {allTenants.map((t, idx) => (
              <div key={idx} className="bg-white rounded-[32px] p-6 shadow-sm border border-white hover:border-[#CFB3A9] transition-all group">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-[#A09086] flex items-center justify-center text-xl font-bold text-white shadow-inner">
                            {t.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">{t.name}</h3>
                            <p className="text-xs text-[#7D9D75] font-bold">{t.roomInfo}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Monthly Rent</p>
                        <p className="text-xl font-bold text-[#4B382A]">${t.rent.toLocaleString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-50 text-[11px] font-bold text-[#8C7E74]">
                    <div className="flex items-center gap-2"><Phone size={14}/> {t.phone}</div>
                    <div className="flex items-center gap-2"><Calendar size={14}/> {t.endDate} 到期</div>
                </div>

                <button className="w-full py-3 bg-gray-50 group-hover:bg-[#4B382A] group-hover:text-white rounded-2xl text-[10px] font-bold transition-all flex items-center justify-center gap-2">
                    查看完整合約細節 <ArrowRight size={12}/>
                </button>
              </div>
          ))}
      </div>
    </div>
  );
}