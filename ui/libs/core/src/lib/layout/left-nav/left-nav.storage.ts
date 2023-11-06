import { StateCreator } from 'zustand';

export interface NavStorage {
  lefNavToggle: boolean;
  setToggle: (toggle: boolean) => void;
}

export const createNavStorage: StateCreator<NavStorage> = (set) => ({
  lefNavToggle: true,
  setToggle: (toggle: boolean) => set(() => ({ lefNavToggle: toggle })),
});
