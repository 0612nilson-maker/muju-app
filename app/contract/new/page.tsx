// 這裡是：合約製作器 (Contract Maker) - 選擇範本
'use client';

import React from 'react';
import { ChevronLeft, FileText, Shield, Star, ChevronRight, PenTool } from 'lucide-react';
import Link from 'next/link';

// 官方定案色票
const colors = {
  bgMain: '#F1EEEB', textPrimary: '#4B382A', textSecondary: '#8C7E74',
  accent: '#CFB3A9', cardBg: '#FFFFFF', highlight: '#E8B05C'
};

export default function ContractMakerPage() {
  return (
    <div className="min-h-screen font-sans pb-10" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 導覽列 */}
      <header className="sticky top-0 z-20 px-5 h-16 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>製作新合約</h1>
        <div className="w-10"></div>
      </header>

      {/* 2. 標題區 */}
      <div className="px-6 py-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>選擇合約版本</h2>
        <p className="text-sm opacity-80" style={{ color: colors.textSecondary }}>請依照租客屬性，選擇適合的簽約範本。</p>
      </div>

      {/* 3. 範本選項卡 */}
      <div className="px-6 space-y-4">
        
        {/* 選項 A: 暮居專用版 (推薦) */}
        <TemplateCard 
            title="暮居標準租約" 
            sub="Muju Residence Standard" 
            desc="針對共生公寓優化，包含生活公約、設備賠償細節，保障房東權益。"
            tag="推薦"
            icon={<Star size={24} />}
            colors={colors}
            isPrimary
        />

        {/* 選項 B: 內政部版 */}
        <TemplateCard 
            title="內政部定型化契約" 
            sub="MOI Official Version" 
            desc="符合最新租賃專法，法規最完整，適合申請補助之房客。"
            tag="官方"
            icon={<Shield size={24} />}
            colors={colors}
        />

        {/* 選項 C: 自訂範本 */}
        <TemplateCard 
            title="我的自訂範本" 
            sub="Custom Template" 
            desc="載入您上次儲存的「短期租約 - 3個月版」。"
            tag="個人"
            icon={<PenTool size={24} />}
            colors={colors}
        />

      </div>

      {/* 底部說明 */}
      <div className="px-8 mt-8 text-center">
          <p className="text-[10px] opacity-50" style={{ color: colors.textSecondary }}>
              選定後將進入資料填寫步驟，系統將自動帶入房源資訊。
          </p>
      </div>
    </div>
  );
}

// --- 元件區 ---

function TemplateCard({ title, sub, desc, tag, icon, colors, isPrimary }: any) {
    return (
        <div className="rounded-[24px] p-5 shadow-sm border-2 cursor-pointer active:scale-95 transition-all group relative overflow-hidden"
             style={{ 
                 backgroundColor: colors.cardBg,
                 borderColor: isPrimary ? colors.highlight : 'transparent'
             }}>
            
            {/* 推薦標籤 */}
            {isPrimary && (
                <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-bold text-white rounded-bl-xl"
                     style={{ backgroundColor: colors.highlight }}>
                    {tag}
                </div>
            )}

            <div className="flex items-start gap-4 mb-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm`}
                     style={{ 
                         backgroundColor: isPrimary ? '#FFF8F0' : '#F2F0EE', 
                         color: isPrimary ? colors.highlight : colors.textSecondary 
                     }}>
                    {icon}
                </div>
                <div>
                    <h3 className="text-lg font-bold" style={{ color: colors.textPrimary }}>{title}</h3>
                    <p className="text-[10px] font-bold tracking-wide uppercase" style={{ color: colors.accent }}>{sub}</p>
                </div>
            </div>
            
            <p className="text-xs leading-relaxed mb-4 opacity-80 pl-1" style={{ color: colors.textPrimary }}>
                {desc}
            </p>

            <div className="flex justify-end">
                <button className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 transition-colors group-hover:bg-[#F1EEEB]"
                        style={{ color: colors.textPrimary }}>
                    使用此範本 <ChevronRight size={14} />
                </button>
            </div>
        </div>
    )
}
