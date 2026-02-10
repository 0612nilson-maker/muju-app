'use client';

import React, { useState } from 'react';
import { ChevronLeft, Camera, Upload, User, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 官方定案色票：溫柔拿鐵 + 深棕字
const colors = {
  bgMain: '#F1EEEB',       
  textPrimary: '#4B382A',  
  textSecondary: '#8C7E74',
  accent: '#CFB3A9',       
  accentWarm: '#E4D8CB',   
  cardBg: '#FFFFFF',       
  success: '#7D9D75',      // 新增：成功綠色
};

export default function CreatePropertyPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [isScanning, setIsScanning] = useState(false); // 控制掃描狀態
  
  // 表單資料狀態 (為了讓 AI 自動填寫)
  const [formData, setFormData] = useState({
    name: '',
    city: '請選擇',
    district: '請選擇',
    address: '',
    rooms: '0',
    halls: '0',
    baths: '0',
    floors: '',
    area: '',
    landNo: '',
    buildNo: ''
  });

  // 模擬 AI 辨識過程
  const handleSmartScan = () => {
    if(formData.address) return; // 如果已經填了就不重複掃
    
    setIsScanning(true);
    // 假裝跑了 1.5 秒
    setTimeout(() => {
        setFormData({
            ...formData,
            name: '暮居文心創始館',
            city: '台中市',
            district: '南屯區',
            address: '文心南路 289 號 12 樓之 3',
            rooms: '3',
            halls: '2',
            baths: '2',
            floors: '12',
            area: '32.5',
            landNo: '南屯段 1024 號',
            buildNo: '02893'
        });
        setIsScanning(false);
        setActiveTab('basic'); // 掃描完跳回基本資料看結果
    }, 1500);
  };

  // 處理輸入變更
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-screen flex flex-col font-sans overflow-hidden" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 頂部導覽 */}
      <header className="flex-none px-5 h-16 flex justify-between items-center z-20 shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>建立房源</h1>
        
        {/* 儲存按鈕 (帶有返回首頁的功能) */}
        <Link href="/">
            <button className="px-5 py-2 rounded-full text-xs font-bold tracking-wide shadow-md active:scale-95 transition-transform text-white" 
                    style={{ backgroundColor: colors.textPrimary }}>
            儲存
            </button>
        </Link>
      </header>

      {/* 2. 照片上傳區 (核心功能) */}
      <div className="flex-none p-5 z-10" style={{ backgroundColor: colors.bgMain }}>
        <div className="rounded-[24px] p-4 shadow-sm flex gap-4 h-36 relative overflow-hidden" style={{ backgroundColor: colors.cardBg }}>
             
             {/* 掃描動畫遮罩 */}
             {isScanning && (
                <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
                    <Loader2 className="animate-spin mb-2" size={32} style={{ color: colors.textPrimary }} />
                    <p className="text-xs font-bold animate-pulse" style={{ color: colors.textPrimary }}>AI 辨識權狀中...</p>
                </div>
             )}

             <div onClick={handleSmartScan} className="flex-1">
                <UploadBox 
                    icon={formData.address ? <CheckCircle2 size={24} /> : <Upload size={20} />} 
                    label={formData.address ? "辨識完成" : "上傳權狀"} 
                    sub={formData.address ? "資料已帶入" : "點擊測試 AI"} 
                    colors={colors} 
                    active={!!formData.address}
                    success={!!formData.address}
                />
             </div>
             
             <div className="flex-1">
                <UploadBox icon={<Camera size={20} />} label="封面照片" sub="設定首圖" colors={colors} />
             </div>
        </div>
      </div>

      {/* 3. 分頁切換鈕 */}
      <div className="flex-none px-5 pb-2 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 p-1 rounded-full" style={{ backgroundColor: colors.accentWarm }}>
            <TabPill label="基本資料" active={activeTab === 'basic'} onClick={() => setActiveTab('basic')} colors={colors} />
            <TabPill label="建物資訊" active={activeTab === 'building'} onClick={() => setActiveTab('building')} colors={colors} />
            <TabPill label="管理人員" active={activeTab === 'manager'} onClick={() => setActiveTab('manager')} colors={colors} />
        </div>
      </div>

      {/* 4. 內容捲動區 */}
      <div className="flex-1 overflow-y-auto px-5 pb-20 pt-4 space-y-6">
        
        {/* === 分頁 A: 基本資料 === */}
        {activeTab === 'basic' && (
            <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <WarmInput label="物件名稱" value={formData.name} onChange={(v: string) => handleChange('name', v)} placeholder="例如：暮居南屯一館" colors={colors} />
                <div className="grid grid-cols-2 gap-4">
                    <WarmSelect label="縣市" value={formData.city} onChange={(v: string) => handleChange('city', v)} colors={colors} />
                    <WarmSelect label="區域" value={formData.district} onChange={(v: string) => handleChange('district', v)} colors={colors} />
                </div>
                {/* 地址欄位加入 highlight 效果 */}
                <div className={`transition-all duration-500 ${formData.address ? 'ring-2 ring-[#CFB3A9] rounded-[24px]' : ''}`}>
                    <WarmInput label="詳細地址" value={formData.address} onChange={(v: string) => handleChange('address', v)} placeholder="街道、巷弄、門牌號碼..." colors={colors} />
                </div>
                
                <div className="p-5 rounded-[24px] shadow-sm" style={{ backgroundColor: colors.cardBg }}>
                    <label className="block text-xs font-bold mb-3 tracking-widest px-1 uppercase" style={{ color: colors.textSecondary }}>出租型態</label>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <TypePillBtn label="整層住家" active colors={colors} />
                        <TypePillBtn label="獨立套房" colors={colors} />
                        <TypePillBtn label="分租套房" colors={colors} />
                    </div>
                </div>
            </div>
        )}

        {/* === 分頁 B: 建物資訊 === */}
        {activeTab === 'building' && (
            <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <div className="p-5 rounded-[24px] shadow-sm grid grid-cols-3 gap-3" style={{ backgroundColor: colors.cardBg }}>
                    <Counter label="房數" value={formData.rooms} onChange={(v: string) => handleChange('rooms', v)} colors={colors} />
                    <Counter label="廳數" value={formData.halls} onChange={(v: string) => handleChange('halls', v)} colors={colors} />
                    <Counter label="衛數" value={formData.baths} onChange={(v: string) => handleChange('baths', v)} colors={colors} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <WarmInput label="總樓層" value={formData.floors} onChange={(v: string) => handleChange('floors', v)} placeholder="例如：12" colors={colors} />
                    <WarmInput label="總坪數" value={formData.area} onChange={(v: string) => handleChange('area', v)} placeholder="坪" colors={colors} />
                </div>
                <WarmInput label="地號" value={formData.landNo} onChange={(v: string) => handleChange('landNo', v)} placeholder="地號資訊" colors={colors} />
                <WarmInput label="建號" value={formData.buildNo} onChange={(v: string) => handleChange('buildNo', v)} placeholder="建號資訊" colors={colors} />
            </div>
        )}

        {/* === 分頁 C: 管理人員 === */}
        {activeTab === 'manager' && (
            <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <div className="p-4 rounded-[24px] shadow-sm flex items-center gap-4" style={{ backgroundColor: colors.cardBg }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.textPrimary }}>
                        N
                    </div>
                    <div>
                        <div className="font-bold text-sm" style={{ color: colors.textPrimary }}>Nilson</div>
                        <div className="text-xs" style={{ color: colors.textSecondary }}>擁有者 (Owner)</div>
                    </div>
                    <button className="ml-auto text-xs px-4 py-2 rounded-full font-bold" 
                            style={{ backgroundColor: colors.bgMain, color: colors.textSecondary }}>移除</button>
                </div>
                
                <button className="w-full py-4 border-2 border-dashed rounded-[24px] font-bold text-sm flex items-center justify-center gap-2 transition-colors hover:bg-white/50"
                        style={{ borderColor: colors.accent, color: colors.accent }}>
                    <User size={18} /> 新增管理員
                </button>
            </div>
        )}

      </div>
    </div>
  );
}

// --- 元件區 ---

function UploadBox({ icon, label, sub, active, success, colors }: any) {
    return (
        <div className={`flex-1 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300 border-2 active:scale-95`}
             style={{ 
                 backgroundColor: active ? (success ? '#F2F8F2' : colors.bgMain) : colors.cardBg, 
                 borderColor: active ? (success ? colors.success : colors.accent) : 'transparent' 
             }}>
            <div className={`p-2 rounded-full`} style={{ color: active ? (success ? colors.success : colors.textPrimary) : colors.accent }}>
                {icon}
            </div>
            <div className="text-center">
                <p className="font-bold text-sm" style={{ color: success ? colors.success : colors.textPrimary }}>{label}</p>
                <p className="text-[10px]" style={{ color: colors.textSecondary }}>{sub}</p>
            </div>
        </div>
    )
}

function TabPill({ label, active, onClick, colors }: any) {
    return (
        <button 
            onClick={onClick}
            className={`flex-1 py-2 px-4 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap shadow-sm`}
            style={{ 
                backgroundColor: active ? colors.textPrimary : 'transparent', 
                color: active ? '#FFFFFF' : colors.textSecondary 
            }}>
            {label}
        </button>
    )
}

function WarmInput({ label, value, onChange, placeholder, colors }: any) {
    return (
        <div className="px-5 py-3 rounded-[24px] shadow-sm border border-transparent focus-within:border-[#CFB3A9] transition-colors"
             style={{ backgroundColor: colors.cardBg }}>
            <label className="block text-[10px] font-bold mb-1 tracking-widest uppercase" style={{ color: colors.textSecondary }}>{label}</label>
            <input 
                type="text" 
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                className="w-full bg-transparent outline-none font-bold text-sm"
                placeholder={placeholder}
                style={{ color: colors.textPrimary }}
            />
        </div>
    )
}

function WarmSelect({ label, value, onChange, colors }: any) {
    return (
        <div className="px-5 py-3 rounded-[24px] shadow-sm relative" style={{ backgroundColor: colors.cardBg }}>
            <label className="block text-[10px] font-bold mb-1 tracking-widest uppercase" style={{ color: colors.textSecondary }}>{label}</label>
            <select 
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                className="w-full bg-transparent outline-none font-bold text-sm appearance-none relative z-10" 
                style={{ color: colors.textPrimary }}>
                <option>請選擇</option>
                <option>台中市</option>
                <option>台北市</option>
            </select>
            <div className="absolute right-4 bottom-3 pointer-events-none text-xs" style={{ color: colors.accent }}>▼</div>
        </div>
    )
}

function TypePillBtn({ label, active, colors }: any) {
    return (
        <button className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border`}
                style={{ 
                    backgroundColor: active ? colors.textPrimary : colors.bgMain, 
                    borderColor: active ? colors.textPrimary : 'transparent',
                    color: active ? '#FFFFFF' : colors.textSecondary 
                }}>
            {label}
        </button>
    )
}

function Counter({ label, value, onChange, colors }: any) {
    return (
        <div className="rounded-xl p-2 flex flex-col items-center" style={{ backgroundColor: colors.bgMain }}>
            <span className="text-[10px] mb-1" style={{ color: colors.textSecondary }}>{label}</span>
            <input 
                type="number" 
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                className="w-full text-center bg-transparent text-xl font-bold outline-none" 
                style={{ color: colors.textPrimary }}/>
        </div>
    )
}