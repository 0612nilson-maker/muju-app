// 這裡是：App 的中央大腦 (Global Context) - V15 (暮居實務簽約版)
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. 租客與合約細節
export type TenantInfo = {
  name: string;        // 租客姓名
  phone: string;       // 聯絡電話
  startDate: string;   // 租期開始
  endDate: string;     // 租期結束
  contractUrl?: string; // 合約文件路徑 (模擬)
  deposit: number;     // 押金金額
};

// 2. 房間單位
export type RoomUnit = {
  id: string;
  roomNumber: string;
  status: 'vacant' | 'rented' | 'self';
  currentRent: number;
  tenant?: TenantInfo; // ✨ 新增：租客完整資訊
};

// 3. 資產標的 (維持之前的詳細財務欄位)
export type Asset = {
  id: string; name: string; address: string; ownership: 'own' | 'sublease'; type: string; units: RoomUnit[];
  price: number; decorationFee: number; agentFee: number; miscFee: number; marketValue: number;
  loanAmount: number; interestRate: number; monthlyPayment: number; managementFee: number; mujuServiceFee: number;
};

// ... 其餘 Transaction 與 RepairTicket 定義維持不變

interface AppContextType {
  assets: Asset[]; cashBalance: number; repairs: any[];
  addAsset: (asset: Asset) => void;
  deleteAsset: (id: string) => void;
  // ✨ 升級：簽約連動功能
  signContract: (assetId: string, roomId: string, rent: number, tenant: TenantInfo) => void;
  updateRoomStatus: (assetId: string, roomId: string, status: 'vacant' | 'rented' | 'self') => void;
  processMonthlyDeduction: () => void;
  resetData: () => void;
  addRepair: (t: any) => void; updateRepairStatus: (id: string, s: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [cashBalance, setCashBalance] = useState<number>(500000);
  const [repairs, setRepairs] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const load = (k: string) => localStorage.getItem(k);
      if (load('muju_assets')) setAssets(JSON.parse(load('muju_assets')!));
      if (load('muju_cash')) setCashBalance(Number(load('muju_cash')));
      if (load('muju_repairs')) setRepairs(JSON.parse(load('muju_repairs')!));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('muju_assets', JSON.stringify(assets));
      localStorage.setItem('muju_cash', cashBalance.toString());
      localStorage.setItem('muju_repairs', JSON.stringify(repairs));
    }
  }, [assets, cashBalance, repairs]);

  const addAsset = (asset: Asset) => setAssets(p => [asset, ...p]);
  
  // ✨ 核心邏輯：正式簽約匯入
  const signContract = (assetId: string, roomId: string, rent: number, tenant: TenantInfo) => {
    setAssets(prev => prev.map(asset => {
      if (asset.id !== assetId) return asset;
      return {
        ...asset,
        units: asset.units.map(unit => {
          if (unit.id !== roomId) return unit;
          return { ...unit, status: 'rented', currentRent: rent, tenant: tenant };
        })
      };
    }));
  };

  const updateRoomStatus = (assetId: string, roomId: string, status: 'vacant' | 'rented' | 'self') => {
    setAssets(prev => prev.map(asset => asset.id === assetId ? { ...asset, units: asset.units.map(u => u.id === roomId ? { ...u, status, tenant: undefined } : u) } : asset));
  };

  const processMonthlyDeduction = () => { /* 邏輯維持... */ };
  const addRepair = (t: any) => setRepairs(p => [t, ...p]);
  const updateRepairStatus = (id: string, s: any) => setRepairs(p => p.map(r => r.id === id ? { ...r, status: s } : r));
  const resetData = () => { localStorage.clear(); window.location.reload(); };

  return (
    <AppContext.Provider value={{ assets, cashBalance, repairs, addAsset, signContract, updateRoomStatus, processMonthlyDeduction, resetData, addRepair, updateRepairStatus }}>
      {children}
    </AppContext.Provider>
  );
}
export function useApp() { return useContext(AppContext)!; }