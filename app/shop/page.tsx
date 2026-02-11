// 這裡是：暮居選品 (Selection Shop) - 會員專屬商城
'use client';

import React, { useState } from 'react';
import { ChevronLeft, ShoppingBag, Search, Star, Plus, Check, Truck, Armchair, Hammer, Zap, Heart } from 'lucide-react';
import Link from 'next/link';

// 官方定案色票
const colors = {
  bgMain: '#F1EEEB', textPrimary: '#4B382A', textSecondary: '#8C7E74',
  cardBg: '#FFFFFF', accent: '#CFB3A9', highlight: '#E8B05C', 
  price: '#4B382A', memberPrice: '#C66C6C'
};

export default function ShopPage() {
  const [activeCat, setActiveCat] = useState('furniture');
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen font-sans pb-24" style={{ backgroundColor: colors.bgMain, color: colors.textPrimary }}>
      
      {/* 1. 導覽列 */}
      <header className="sticky top-0 z-20 px-5 h-16 flex justify-between items-center shadow-sm" style={{ backgroundColor: colors.bgMain }}>
        <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50">
          <ChevronLeft size={24} style={{ color: colors.textPrimary }} />
        </Link>
        <h1 className="text-base font-bold tracking-widest" style={{ color: colors.textPrimary }}>暮居選品</h1>
        <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/50 relative" style={{ color: colors.textPrimary }}>
            <ShoppingBag size={24} />
            {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C66C6C] text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                    {cartCount}
                </span>
            )}
        </button>
      </header>

      {/* 2. 搜尋與分類 */}
      <div className="px-5 py-2 sticky top-16 z-10 backdrop-blur-md bg-[#F1EEEB]/80 pb-4">
        <div className="flex items-center gap-3 px-4 py-3 rounded-full shadow-sm bg-white mb-4">
            <Search size={18} style={{ color: colors.textSecondary }} />
            <input type="text" placeholder="搜尋家具、工班服務..." className="bg-transparent outline-none text-sm font-bold flex-1" style={{ color: colors.textPrimary }} />
        </div>
        
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <CategoryBtn label="風格家具" icon={<Armchair size={14} />} active={activeCat === 'furniture'} onClick={() => setActiveCat('furniture')} />
            <CategoryBtn label="嚴選工班" icon={<Hammer size={14} />} active={activeCat === 'service'} onClick={() => setActiveCat('service')} />
            <CategoryBtn label="智能設備" icon={<Zap size={14} />} active={activeCat === 'smart'} onClick={() => setActiveCat('smart')} />
        </div>
      </div>

      {/* 3. 商品列表 (瀑布流模擬) */}
      <div className="px-5 pb-6">
        <div className="grid grid-cols-2 gap-4">
            
            {/* 商品 1 */}
            <ProductCard 
                title="白橡木實木床架" 
                sub="雙人 / 原木色" 
                price="12,800" 
                memberPrice="9,800" 
                tag="熱銷"
                imageColor="#E4D8CB"
                onAdd={addToCart}
            />

            {/* 商品 2 */}
            <ProductCard 
                title="日式懶人沙發" 
                sub="防潑水 / 米白" 
                price="4,500" 
                memberPrice="3,200" 
                imageColor="#F2F0EE"
                onAdd={addToCart}
            />

            {/* 商品 3 (Aqara) */}
            <ProductCard 
                title="Aqara 智能網關" 
                sub="M2 Hub / 支援 HomeKit" 
                price="2,400" 
                memberPrice="1,800" 
                tag="必備"
                imageColor="#D1D5DB"
                onAdd={addToCart}
            />

            {/* 商品 4 (服務) */}
            <ProductCard 
                title="退租清潔服務" 
                sub="10坪內 / 含除蟎" 
                price="3,500" 
                memberPrice="2,500" 
                tag="服務"
                imageColor="#A09086"
                isService
                onAdd={addToCart}
            />

             {/* 商品 5 */}
            <ProductCard 
                title="立體靜音掛鐘" 
                sub="極簡白 / 12吋" 
                price="890" 
                memberPrice="590" 
                imageColor="#FFFFFF"
                onAdd={addToCart}
            />

            {/* 商品 6 */}
            <ProductCard 
                title="全室油漆粉刷" 
                sub="乳膠漆 / 連工帶料" 
                price="18,000" 
                memberPrice="12,000" 
                tag="服務"
                imageColor="#CFB3A9"
                isService
                onAdd={addToCart}
            />

        </div>
      </div>

      {/* 底部會員權益 Banner */}
      <div className="px-5 mb-6">
          <div className="rounded-[24px] p-4 bg-[#4B382A] text-[#F1EEEB] flex items-center justify-between shadow-lg">
              <div>
                  <h4 className="font-bold text-sm mb-1">PRO 會員專屬權益</h4>
                  <p className="text-[10px] opacity-80">全館商品享 7 折起批發價</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#E8B05C] text-[#4B382A] flex items-center justify-center font-bold">
                  <Star size={20} fill="#4B382A" />
              </div>
          </div>
      </div>

    </div>
  );
}

// --- 元件區 ---

function ProductCard({ title, sub, price, memberPrice, tag, imageColor, isService, onAdd }: any) {
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        setAdded(true);
        onAdd();
        setTimeout(() => setAdded(false), 1500); // 1.5秒後恢復
    };

    return (
        <div className="bg-white rounded-[24px] p-3 shadow-sm flex flex-col h-full border border-transparent hover:border-[#CFB3A9] transition-all group">
            {/* 圖片區 (用色塊模擬) */}
            <div className="w-full aspect-square rounded-2xl mb-3 relative overflow-hidden flex items-center justify-center" 
                 style={{ backgroundColor: imageColor }}>
                {tag && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#4B382A] text-white text-[9px] font-bold shadow-sm">
                        {tag}
                    </div>
                )}
                {/* 簡單的圖示代表產品 */}
                {isService ? <Hammer size={32} className="opacity-20 text-[#4B382A]" /> : <Armchair size={32} className="opacity-20 text-[#4B382A]" />}
                
                <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#C66C6C] shadow-sm active:scale-90 transition-transform">
                    <Heart size={14} />
                </button>
            </div>

            {/* 文字區 */}
            <div className="flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-[#4B382A] leading-tight mb-0.5">{title}</h3>
                <p className="text-[10px] text-[#8C7E74] mb-2">{sub}</p>
                
                <div className="mt-auto flex items-end justify-between">
                    <div>
                        <p className="text-[10px] text-[#8C7E74] line-through decoration-1 opacity-60">${price}</p>
                        <p className="text-sm font-bold text-[#C66C6C]">${memberPrice}</p>
                    </div>
                    <button onClick={handleAdd}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm active:scale-90 ${added ? 'bg-[#7D9D75] text-white' : 'bg-[#4B382A] text-white'}`}>
                        {added ? <Check size={16} /> : <Plus size={16} />}
                    </button>
                </div>
            </div>
        </div>
    )
}

function CategoryBtn({ label, icon, active, onClick }: any) {
    return (
        <button onClick={onClick} 
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all border
                ${active 
                    ? 'bg-[#4B382A] text-white border-[#4B382A]' 
                    : 'bg-white text-[#8C7E74] border-transparent shadow-sm'}`}>
            {icon} {label}
        </button>
    )
}