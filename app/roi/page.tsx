// 這裡是：投報率計算器 (ROI Calculator) - V3.0 專業折線圖版
'use client';

import React, { useState } from 'react';
import { ChevronLeft, Save, Trash2, Home, Briefcase, RefreshCw, TrendingUp, DollarSign, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// 官方定案色票
const colors = {
  bgMain: '#F1EEEB', textPrimary: '#4B382A', textSecondary: '#8C7E74',
  cardBg: '#FFFFFF', highlight: '#6C8CC6', sublet: '#E8B05C',
  chartLine: '#4B382A', chartGrid: '#E5E5E5',
  profit: '#7D9D75', loss: '#C66C6C'
};

type Scenario = { id: number; name: string; mode: 'buy' | 'sublet'; data: any; };

export default function ROIPage() {
  const [mode, setMode] = useState<'buy' | 'sublet'>('buy');
  
  // 參數設定 (預設值)
  const [buyParams, setBuyParams] = useState({ price: '1200', renovation: '100', loan: '80', rate: '2.1', rent: '35000' });
  const [subletParams, setSubletParams] = useState({ cost: '50', rentOut: '25000', rentIn: '12000', contract: '5' });
  const [savedScenarios, setSavedScenarios] = useState<Scenario[]>([]);

  // --- 核心計算引擎 ---
  const calculate = () => {
    let initialCost = 0;
    let annualNet = 0;
    let chartData = [];

    if (mode === 'buy') {
      const housePrice = parseFloat(buyParams.price) * 10000;
      const renoCost = parseFloat(buyParams.renovation) * 10000;
      const loanPercent = parseFloat(buyParams.loan) / 100;
      
      const loanAmount = housePrice * loanPercent;
      const downPayment = housePrice * (1 - loanPercent);
      initialCost = downPayment + renoCost; // 總投入現金 (負值起點)

      const annualIncome = parseFloat(buyParams.rent) * 12;
      const annualInterest = loanAmount * (parseFloat(buyParams.rate) / 100);
      annualNet = annualIncome - annualInterest;

    } else {
      initialCost = parseFloat(subletParams.cost) * 10000;
      const spread = parseFloat(subletParams.rentOut) - parseFloat(subletParams.rentIn);
      annualNet = spread * 12;
    }

    // 計算指標
    const roi = initialCost > 0 ? (annualNet / initialCost) * 100 : 0;
    const paybackYears = (initialCost > 0 && annualNet > 0) ? initialCost / annualNet : 0;

    // 生成折線圖數據 (預測 20 年)
    // 邏輯：第 0 年是負的投入成本，之後每年加上淨利
    for (let year = 0; year <= 20; year++) {
        const balance = -initialCost + (annualNet * year);
        chartData.push({ year, value: balance });
    }

    return { 
        roi: roi.toFixed(1), 
        cashFlow: Math.round(annualNet / 12).toLocaleString(), 
        payback: paybackYears > 0 ? paybackYears.toFixed(1) : '∞',
        initialCost: (initialCost/10000).toFixed(0),
        chartData
    };
  };

  const result = calculate();

  // --- 存檔功能 ---
  const loadScenario = (s: Scenario) => {
    setMode(s.mode);
    if (s.mode === 'buy') setBuyParams(s.data); else setSubletParams(s.data);
  };
  const saveCurrent = () => {
    const name = prompt('命名此方案：', mode === 'buy' ? '新買房案' : '新包租案');
    if (name) setSavedScenarios([...savedScenarios, { id: Date.now(), name, mode, data: mode === 'buy' ? { ...buyParams } : { ...subletParams } }]);
  };
  const deleteScenario = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); setSavedScenarios(savedScenarios.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen font-sans pb-10" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 導覽列 */}
      <header className="sticky top-0 z-20 px-5 h-16 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>投報分析</h1>
        <button onClick={saveCurrent} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50 active:scale-90" style={{ color: colors.textPrimary }}>
            <Save size={20} />
        </button>
      </header>

      {/* 2. 模式切換 (縮小版) */}
      <div className="px-5 mt-2 mb-4">
        <div className="bg-white p-1 rounded-full flex shadow-sm">
            <ModeBtn label="買房出租" icon={<Home size={14} />} active={mode === 'buy'} onClick={() => setMode('buy')} activeColor={colors.highlight} />
            <ModeBtn label="包租代管" icon={<Briefcase size={14} />} active={mode === 'sublet'} onClick={() => setMode('sublet')} activeColor={colors.sublet} />
        </div>
      </div>

      {/* 3. 關鍵指標 (Compact Metrics) - 上半部縮小 */}
      <div className="px-5 mb-4">
          <div className="grid grid-cols-3 gap-3">
              {/* ROI */}
              <div className="p-3 rounded-2xl bg-white shadow-sm flex flex-col justify-between h-24 border-l-4" style={{ borderColor: mode === 'buy' ? colors.highlight : colors.sublet }}>
                  <p className="text-[10px] font-bold opacity-60 uppercase">年化報酬率</p>
                  <p className="text-2xl font-bold flex items-end gap-1" style={{ color: colors.textPrimary }}>
                      {result.roi}<span className="text-xs mb-1">%</span>
                  </p>
                  <div className="w-full h-1 rounded-full bg-[#F2F0EE] overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${Math.min(parseFloat(result.roi)*2, 100)}%`, backgroundColor: mode === 'buy' ? colors.highlight : colors.sublet }}></div>
                  </div>
              </div>

              {/* 回本年數 */}
              <div className="p-3 rounded-2xl bg-white shadow-sm flex flex-col justify-between h-24">
                  <p className="text-[10px] font-bold opacity-60 uppercase">預估回本</p>
                  <p className="text-2xl font-bold flex items-end gap-1" style={{ color: colors.textPrimary }}>
                      {result.payback}<span className="text-xs mb-1">年</span>
                  </p>
                  <div className="flex items-center gap-1 text-[10px] opacity-50">
                      <Clock size={10} /> 損益平衡
                  </div>
              </div>

              {/* 現金流 */}
              <div className="p-3 rounded-2xl bg-white shadow-sm flex flex-col justify-between h-24">
                  <p className="text-[10px] font-bold opacity-60 uppercase">月現金流</p>
                  <p className="text-lg font-bold flex items-end gap-1" style={{ color: colors.profit }}>
                      ${result.cashFlow}
                  </p>
                  <p className="text-[9px] opacity-40">扣除成本後</p>
              </div>
          </div>
      </div>

      {/* 4. 輸入參數 (可摺疊或精簡) */}
      <div className="px-5 space-y-4 mb-6">
        <h3 className="text-xs font-bold tracking-widest uppercase mb-1 ml-2 opacity-60">參數設定</h3>
        <div className="rounded-[24px] p-5 shadow-sm space-y-4 bg-white">
             {mode === 'buy' ? (
                <>
                    <InputRow label="房屋總價 (萬)" value={buyParams.price} onChange={(v: string) => setBuyParams({...buyParams, price: v})} />
                    <InputRow label="裝修與雜支 (萬)" value={buyParams.renovation} onChange={(v: string) => setBuyParams({...buyParams, renovation: v})} />
                    <InputRow label="預期月租 (元)" value={buyParams.rent} onChange={(v: string) => setBuyParams({...buyParams, rent: v})} />
                    <div className="flex gap-4">
                        <RangeRow label="貸款成數" value={buyParams.loan} unit="成" min="0" max="90" onChange={(v: string) => setBuyParams({...buyParams, loan: v})} />
                        <RangeRow label="利率" value={buyParams.rate} unit="%" min="1.5" max="4.0" step="0.1" onChange={(v: string) => setBuyParams({...buyParams, rate: v})} />
                    </div>
                </>
            ) : (
                <>
                    <InputRow label="初始成本 (萬)" value={subletParams.cost} onChange={(v: string) => setSubletParams({...subletParams, cost: v})} />
                    <InputRow label="付給房東 (元)" value={subletParams.rentIn} onChange={(v: string) => setSubletParams({...subletParams, rentIn: v})} />
                    <InputRow label="預期收租 (元)" value={subletParams.rentOut} onChange={(v: string) => setSubletParams({...subletParams, rentOut: v})} />
                </>
            )}
        </div>
      </div>

      {/* 5. 視覺化圖表 (放在最下面) */}
      <div className="px-5 pb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="flex justify-between items-end mb-2 ml-1">
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-60">累積損益預測 (20年)</h3>
            <span className="text-[10px] font-bold text-[#8C7E74]">總投入: {result.initialCost} 萬</span>
          </div>
          
          <div className="rounded-[24px] p-4 shadow-md bg-white h-60 relative overflow-hidden">
             {/* 折線圖組件 */}
             <LineChart data={result.chartData} height={200} lineColor={mode === 'buy' ? colors.highlight : colors.sublet} />
          </div>
          <p className="text-[10px] text-center mt-2 opacity-40">
              *圖表顯示資產累積曲線，當線條穿過虛線(0)時即為回本點
          </p>
      </div>

      {/* 存檔列表 */}
      {savedScenarios.length > 0 && (
          <div className="px-5 pb-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {savedScenarios.map((s) => (
                    <div key={s.id} onClick={() => loadScenario(s)} className="min-w-[100px] p-2 rounded-xl bg-white border border-gray-200 flex items-center gap-2 cursor-pointer active:scale-95">
                        <div className={`w-2 h-full rounded-full`} style={{ backgroundColor: s.mode === 'buy' ? colors.highlight : colors.sublet }}></div>
                        <div className="overflow-hidden">
                            <p className="text-[10px] font-bold truncate">{s.name}</p>
                            <Trash2 size={10} className="text-gray-300 hover:text-red-400" onClick={(e) => deleteScenario(s.id, e)} />
                        </div>
                    </div>
                ))}
            </div>
          </div>
      )}
    </div>
  );
}

// --- SVG 折線圖組件 (無需外掛，效能最好) ---
function LineChart({ data, height, lineColor }: any) {
    const padding = 20;
    const width = 300; // 視窗寬度
    const maxY = Math.max(...data.map((d: any) => Math.abs(d.value)));
    const minY = -maxY; // 讓 0 軸置中或根據數據調整，這裡我們簡單做對稱或依比例
    
    // 計算 Y 軸縮放：讓圖表可以容納最大正值與最小負值
    const absMax = Math.max(...data.map((d: any) => Math.abs(d.value)));
    const scaleY = (val: number) => {
        // 將數值映射到 0 ~ height (注意 SVG y 軸向下是正)
        // 假設最大值在頂部 (pad)，最小值在底部 (height-pad)
        // 0 對應中間? 不一定。
        // 我們讓 -absMax 到 +absMax 對應 height 到 0
        const range = absMax * 2; // 總跨度 (假設從 -max 到 +max)
        // 其實通常起點是負的，終點是正的。
        // 我們動態計算 minVal 和 maxVal
        const minVal = Math.min(...data.map((d: any) => d.value));
        const maxVal = Math.max(...data.map((d: any) => d.value));
        const totalRange = maxVal - minVal;
        
        if (totalRange === 0) return height / 2;
        
        // 正規化：(val - minVal) / totalRange -> 0~1
        // 反轉 Y：1 - normalized
        const normalized = (val - minVal) / totalRange;
        return height - padding - (normalized * (height - padding * 2));
    };

    const points = data.map((d: any, i: number) => {
        const x = padding + (i / (data.length - 1)) * (width - padding * 2);
        const y = scaleY(d.value);
        return `${x},${y}`;
    }).join(' ');

    const zeroY = scaleY(0);

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {/* 格線 */}
            <line x1={padding} y1={zeroY} x2={width - padding} y2={zeroY} stroke="#E5E5E5" strokeWidth="2" strokeDasharray="4" />
            <text x={width-padding} y={zeroY - 5} fontSize="8" fill="#8C7E74" textAnchor="end">損益平衡點 ($0)</text>
            
            {/* 主折線 */}
            <polyline fill="none" stroke={lineColor} strokeWidth="3" points={points} strokeLinecap="round" strokeLinejoin="round" />
            
            {/* 起點圓點 (投入) */}
            <circle cx={padding} cy={scaleY(data[0].value)} r="3" fill="#C66C6C" />
            {/* 終點圓點 (獲利) */}
            <circle cx={width - padding} cy={scaleY(data[data.length-1].value)} r="3" fill="#7D9D75" />
            
            {/* 標示文字 */}
            <text x={padding} y={scaleY(data[0].value) + 12} fontSize="8" fill="#C66C6C" textAnchor="start">投入</text>
            <text x={width - padding} y={scaleY(data[data.length-1].value) - 8} fontSize="8" fill="#7D9D75" textAnchor="end">20年後</text>
        </svg>
    );
}

function ModeBtn({ label, icon, active, onClick, activeColor }: any) {
    return (
        <button onClick={onClick} className={`flex-1 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all ${active ? 'text-white shadow-md' : 'text-[#8C7E74]'}`} style={{ backgroundColor: active ? activeColor : 'transparent' }}>{icon} {label}</button>
    )
}

function InputRow({ label, value, onChange }: any) {
    return (
        <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
            <p className="text-[10px] font-bold w-24 text-[#8C7E74]">{label}</p>
            <input type="number" value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 text-right text-sm font-bold outline-none bg-transparent text-[#4B382A]" />
        </div>
    )
}

function RangeRow({ label, value, unit, min, max, step, onChange }: any) {
    return (
        <div className="flex-1">
             <div className="flex justify-between mb-1"><span className="text-[10px] text-[#8C7E74]">{label}</span><span className="text-[10px] font-bold">{value}{unit}</span></div>
             <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#6C8CC6]" />
        </div>
    )
}