'use client';

import React, { useState } from 'react';
import { useApp, RoomUnit, TenantInfo } from '../context';
import { ChevronLeft, Building, Plus, Wallet, X, MapPin, Briefcase, ChevronRight, CheckCircle2, Clock, UserPlus, Calendar, DollarSign, FileText } from 'lucide-react';
import Link from 'next/link';

export default function AMSPage() {
  const { assets, cashBalance, addAsset, signContract, updateRoomStatus } = useApp();
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [showAssetModal, setShowAssetModal] = useState(false);
  
  // ✨ 簽約 Modal 狀態
  const [signingRoom, setSigningRoom] = useState<{assetId: string, room: RoomUnit} | null>(null);
  const [contractForm, setContractForm] = useState({
      name: '', phone: '', rent: '', deposit: '', startDate: '', endDate: ''
  });

  const handleSignSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!signingRoom) return;
      
      const tenant: TenantInfo = {
          name: contractForm.name,
          phone: contractForm.phone,
          startDate: contractForm.startDate,
          endDate: contractForm.endDate,
          deposit: Number(contractForm.deposit),
          contractUrl: '模擬合約路徑_muju_standard.pdf'
      };

      signContract(signingRoom.assetId, signingRoom.room.id, Number(contractForm.rent), tenant);
      setSigningRoom(null);
      setContractForm({ name: '', phone: '', rent: '', deposit: '', startDate: '', endDate: '' });
      alert('🎉 簽約成功！租客資訊已同步至名冊。');
  };

  return (
    <div className="min-h-screen pb-24 bg-[#F1EEEB] text-[#4B382A]">
      <header className="sticky top-0 z-20 px-5 h-16 flex items-center bg-[#F1EEEB] shadow-sm">
        <button onClick={() => selectedAsset ? setSelectedAsset(null) : window.history.back()} className="mr-3 p-2 bg-white rounded-full"><ChevronLeft size={20}/></button>
        <h1 className="text-base font-bold tracking-widest">{selectedAsset ? selectedAsset.name : '資產管家'}</h1>
      </header>

      <div className="px-5 mt-6">
        {!selectedAsset ? (
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">持有標的</h3>
                    <button onClick={() => setShowAssetModal(true)} className="text-xs font-bold text-[#A09086] flex items-center gap-1"><Plus size={14}/> 新增標的</button>
                </div>
                {assets.map(asset => (
                    <div key={asset.id} onClick={() => setSelectedAsset(asset)} className="bg-white p-5 rounded-[24px] shadow-sm flex justify-between items-center group cursor-pointer active:scale-95 transition-all border border-transparent hover:border-[#CFB3A9]">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${asset.ownership === 'own' ? 'bg-[#4B382A]' : 'bg-[#E8B05C]'}`}>
                                {asset.ownership === 'own' ? <Building size={24}/> : <Briefcase size={24}/>}
                            </div>
                            <div><h4 className="font-bold">{asset.name}</h4><p className="text-[10px] text-gray-400">{asset.units.length} 房 • {asset.address}</p></div>
                        </div>
                        <ChevronRight size={18} className="text-gray-300" />
                    </div>
                ))}
            </div>
        ) : (
            <div className="space-y-4 animate-in slide-in-from-right">
                <div className="bg-[#4B382A] p-6 rounded-[32px] text-white shadow-xl mb-6">
                    <p className="text-xs opacity-60 mb-1">標的營運中</p>
                    <h2 className="text-xl font-bold mb-4">{selectedAsset.address}</h2>
                    <div className="flex gap-4">
                        <div className="flex-1 bg-white/10 p-3 rounded-xl"><p className="text-[10px] opacity-60">待租中</p><p className="text-xl font-bold text-[#E8B05C]">{selectedAsset.units.filter((u:any)=>u.status==='vacant').length}</p></div>
                        <div className="flex-1 bg-white/10 p-3 rounded-xl"><p className="text-[10px] opacity-60">已出租</p><p className="text-xl font-bold text-[#7D9D75]">{selectedAsset.units.filter((u:any)=>u.status==='rented').length}</p></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {selectedAsset.units.map((unit: any) => (
                        <div key={unit.id} onClick={() => unit.status === 'vacant' ? setSigningRoom({assetId: selectedAsset.id, room: unit}) : updateRoomStatus(selectedAsset.id, unit.id, 'vacant')}
                             className={`p-4 rounded-[24px] bg-white border-2 transition-all cursor-pointer active:scale-95 ${unit.status === 'rented' ? 'border-[#7D9D75] shadow-sm' : 'border-dashed border-gray-200 opacity-80'}`}>
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-lg">{unit.roomNumber}</span>
                                {unit.status === 'rented' ? <CheckCircle2 size={16} className="text-[#7D9D75]"/> : <UserPlus size={16} className="text-[#E8B05C]"/>}
                            </div>
                            <p className={`text-[10px] font-bold ${unit.status === 'rented' ? 'text-[#7D9D75]' : 'text-[#E8B05C]'}`}>
                                {unit.status === 'rented' ? `租客：${unit.tenant?.name}` : '立即簽約'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>

      {/* ✨ 暮居寓所專屬簽約 Modal */}
      {signingRoom && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#F1EEEB] w-full p-6 rounded-t-[40px] animate-in slide-in-from-bottom max-w-md h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="font-bold text-xl text-[#4B382A]">正式簽約</h3>
                        <p className="text-xs text-[#8C7E74]">標的：永興街 • 房間：{signingRoom.room.roomNumber}</p>
                    </div>
                    <button onClick={() => setSigningRoom(null)} className="p-2 bg-white rounded-full shadow-sm"><X size={20}/></button>
                </div>

                <form onSubmit={handleSignSubmit} className="space-y-5 pb-10">
                    <div className="bg-white p-5 rounded-[24px] space-y-4 shadow-sm border border-white">
                        <h4 className="text-[10px] font-bold text-[#A09086] uppercase tracking-widest flex items-center gap-2"><UserPlus size={12}/> 租客基本資訊</h4>
                        <input type="text" placeholder="租客全名" className="w-full p-3 bg-gray-50 rounded-xl outline-none font-bold" value={contractForm.name} onChange={e => setContractForm({...contractForm, name: e.target.value})} required />
                        <input type="tel" placeholder="聯絡電話" className="w-full p-3 bg-gray-50 rounded-xl outline-none font-bold" value={contractForm.phone} onChange={e => setContractForm({...contractForm, phone: e.target.value})} required />
                    </div>

                    <div className="bg-white p-5 rounded-[24px] space-y-4 shadow-sm border border-white">
                        <h4 className="text-[10px] font-bold text-[#A09086] uppercase tracking-widest flex items-center gap-2"><DollarSign size={12}/> 租金與押金</h4>
                        <div className="flex gap-3">
                            <input type="number" placeholder="月租金 (元)" className="flex-1 p-3 bg-gray-50 rounded-xl outline-none font-bold text-[#7D9D75]" value={contractForm.rent} onChange={e => setContractForm({...contractForm, rent: e.target.value})} required />
                            <input type="number" placeholder="押金 (元)" className="flex-1 p-3 bg-gray-50 rounded-xl outline-none font-bold" value={contractForm.deposit} onChange={e => setContractForm({...contractForm, deposit: e.target.value})} required />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-[24px] space-y-4 shadow-sm border border-white">
                        <h4 className="text-[10px] font-bold text-[#A09086] uppercase tracking-widest flex items-center gap-2"><Calendar size={12}/> 租賃期間</h4>
                        <div className="flex gap-3 items-center">
                            <input type="date" className="flex-1 p-3 bg-gray-50 rounded-xl text-xs font-bold" value={contractForm.startDate} onChange={e => setContractForm({...contractForm, startDate: e.target.value})} required />
                            <span className="text-gray-300">至</span>
                            <input type="date" className="flex-1 p-3 bg-gray-50 rounded-xl text-xs font-bold" value={contractForm.endDate} onChange={e => setContractForm({...contractForm, endDate: e.target.value})} required />
                        </div>
                    </div>

                    <div className="bg-[#E4D8CB]/30 p-5 rounded-[24px] border-2 border-dashed border-[#A09086]/30 flex flex-col items-center justify-center gap-2 text-[#8C7E74]">
                        <FileText size={24} />
                        <p className="text-xs font-bold">點擊上傳暮居標準電子合約</p>
                    </div>

                    <button type="submit" className="w-full py-5 bg-[#4B382A] text-white rounded-[24px] font-bold shadow-xl active:scale-95 transition-all text-lg">確認簽約並匯入名冊</button>
                </form>
            </div>
        </div>
      )}
      
      {/* 新增資產 Modal 略... (維持原樣) */}
    </div>
  );
}