import { StateCreator } from 'zustand';

export interface LayoutStorage {
  innerWidth: number;
  innerHeight: number;
  showAccountOption: boolean;
  accountManagementUrl: string;
  setShowAccountOption: (canShowOption: boolean) => void;
  setAccountManagementUrl: (url: string) => void;
  setScreenResolution: (width: number, height: number) => void;
}

export const createLayoutStorage: StateCreator<LayoutStorage> = (set) => ({
  innerWidth: 0,
  innerHeight: 0,
  showAccountOption: false,
  accountManagementUrl: '',
  setScreenResolution: (width: number, height: number) =>
    set(() => ({ innerWidth: width, innerHeight: height })),
  setShowAccountOption: (canShowOption: boolean) =>
    set(() => ({ showAccountOption: canShowOption })),
  setAccountManagementUrl: (url: string) => set(() => ({ accountManagementUrl: url })),
});
