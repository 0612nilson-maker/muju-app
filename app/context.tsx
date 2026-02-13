// 這裡是：App 的中央大腦 (Global Context) - V16 (全面修復部署錯誤版)
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- 資料型別定義 ---

export type TenantInfo = {
  name: string;
  phone: string;
  startDate: string;
  endDate: string;
  deposit: number;
  contractUrl?: string;
};

export type RoomUnit = {
  id: string;
  roomNumber: string;
  status: 'vacant' | 'rented' | 'self';
  currentRent: number;
  tenant?: TenantInfo;
};

export type Asset = {
  id: string;
  name: string;
  address: string;
  ownership: 'own' | 'sublease';
  type: string;
  units: RoomUnit[];
  price: number;
  decorationFee: number;
  agentFee: number;
  miscFee: number;
  marketValue: number;
  loanAmount: number;
  interestRate: number;
  monthlyPayment: number; // 購屋為房貸，包租為給屋主租金
  managementFee: number;
  mujuServiceFee: number;
};

export type RepairTicket = {
  id: string;
  room: string;
  category: string;
  description: string;
  status: 'pending' | 'processing' | 'done';
  date: string;
  isRead: boolean;
};

export type Transaction = {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  relatedAssetId?: string;
};

// --- Context 介面定義 ---

interface AppContextType {
  assets: Asset[];
  cashBalance: number;
  transactions: Transaction[];
  repairs: RepairTicket[];
  addAsset: (asset: Asset) => void;
  deleteAsset: (id: string) => void;
  signContract: (assetId: string, roomId: string, rent: number, tenant: TenantInfo) => void;
  updateRoomStatus: (assetId: string, roomId: string, status: 'vacant' | 'rented' | 'self') => void;
  addRepair: (ticket: RepairTicket) => void;
  updateRepairStatus: (id: string, status: 'pending' | 'processing' | 'done') => void;
  processMonthlyDeduction: () => void;
  confirmRent: (amount: number, roomName: string) => void;
  resetData: () => void;
  // 為了相容舊頁面可能需要的狀態
  rentStatus: 'unpaid' | 'review' | 'paid';
  notifyTransfer: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [cashBalance, setCashBalance] = useState<number>(500000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [repairs, setRepairs] = useState<RepairTicket[]>([]);
  const [rentStatus, setRentStatus] = useState<'unpaid' | 'review' | 'paid'>('unpaid');

  // 初始化與存取
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const load = (k: string) => localStorage.getItem(k);
      if (load('muju_assets')) setAssets(JSON.parse(load('muju_assets')!));
      if (load('muju_cash')) setCashBalance(Number(load('muju_cash')));
      if (load('muju_trans')) setTransactions(JSON.parse(load('muju_trans')!));
      if (load('muju_repairs')) setRepairs(JSON.parse(load('muju_repairs')!));
      if (load('muju_rent_status')) setRentStatus(load('muju_rent_status') as any);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('muju_assets', JSON.stringify(assets));
      localStorage.setItem('muju_cash', cashBalance.toString());
      localStorage.setItem('muju_trans', JSON.stringify(transactions));
      localStorage.setItem('muju_repairs', JSON.stringify(repairs));
      localStorage.setItem('muju_rent_status', rentStatus);
    }
  }, [assets, cashBalance, transactions, repairs, rentStatus]);

  // --- 功能實作 ---

  const addAsset = (asset: Asset) => setAssets(prev => [asset, ...prev]);
  const deleteAsset = (id: string) => setAssets(prev => prev.filter(a => a.id !== id));

  const signContract = (assetId: string, roomId: string, rent: number, tenant: TenantInfo) => {
    setAssets(prev => prev.map(asset => {
      if (asset.id !== assetId) return asset;
      return {
        ...asset,
        units: asset.units.map(unit => {
          if (unit.id !== roomId) return unit;
          return { ...unit, status: 'rented', currentRent: rent, tenant };
        })
      };
    }));
  };

  const updateRoomStatus = (assetId: string, roomId: string, status: 'vacant' | 'rented' | 'self') => {
    setAssets(prev => prev.map(asset => {
      if (asset.id !== assetId) return asset;
      return {
        ...asset,
        units: asset.units.map(unit => {
          if (unit.id !== roomId) return unit;
          return { ...unit, status, tenant: undefined };
        })
      };
    }));
  };

  const addRepair = (ticket: RepairTicket) => setRepairs(prev => [ticket, ...prev]);
  const updateRepairStatus = (id: string, status: 'pending' | 'processing' | 'done') => {
    setRepairs(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const processMonthlyDeduction = () => {
    let total = 0;
    const today = new Date().toISOString().split('T')[0];
    const newList: Transaction[] = [];

    assets.forEach(a => {
      const label = a.ownership === 'own' ? '房貸本利和' : '付屋主租金';
      const cost = a.monthlyPayment + a.mujuServiceFee + a.managementFee;
      total += cost;
      newList.push({
        id: `T-${a.id}-${Date.now()}`,
        date: today,
        type: 'expense',
        category: '標的月結',
        amount: cost,
        description: `${a.name} - ${label}及維運費`
      });
    });

    setTransactions(prev => [...newList, ...prev]);
    setCashBalance(prev => prev - total);
    alert(`結算完成，總支出 $${total.toLocaleString()}`);
  };

  const confirmRent = (amount: number, roomName: string) => {
    setRentStatus('paid');
    const newT: Transaction = {
      id: `T-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'income',
      category: '租金',
      amount,
      description: `租金收入 - ${roomName}`
    };
    setTransactions(prev => [newT, ...prev]);
    setCashBalance(prev => prev + amount);
  };

  const notifyTransfer = () => setRentStatus('review');

  const resetData = () => {
    if (confirm('確定要清空所有資料嗎？')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <AppContext.Provider value={{ 
      assets, cashBalance, transactions, repairs, rentStatus,
      addAsset, deleteAsset, signContract, updateRoomStatus, 
      addRepair, updateRepairStatus, processMonthlyDeduction, 
      confirmRent, notifyTransfer, resetData 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}