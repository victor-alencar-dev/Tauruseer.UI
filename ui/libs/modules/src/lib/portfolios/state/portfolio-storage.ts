import { IPortfolio } from '@tauruseer/module';
import { create, StateCreator } from 'zustand';

export interface ProductStorage {
  portfolio: IPortfolio;
  portfolioFormOpen: boolean;
  deletePortfolioOpen: boolean;
  archivePortfolioOpen: boolean;
  setPortfolioId: (id: IPortfolio) => void;
  setPortfolioFormOpen: (isOpen: boolean) => void;
  setDeletePortfolioOpen: (isOpen: boolean) => void;
  setArchivePortfolioOpen: (isOpen: boolean) => void;
}

export const createPortfolioStorage: StateCreator<ProductStorage> = (set) => ({
  portfolio: {},
  portfolioFormOpen: false,
  deletePortfolioOpen: false,
  archivePortfolioOpen: false,
  setPortfolioId: (portfolio) => set(() => ({ portfolio })),
  setPortfolioFormOpen: (isOpen) => set(() => ({ portfolioFormOpen: isOpen })),
  setDeletePortfolioOpen: (isOpen) => set(() => ({ deletePortfolioOpen: isOpen })),
  setArchivePortfolioOpen: (isOpen) => set(() => ({ archivePortfolioOpen: isOpen })),
});

export const PortfolioStore = create<ProductStorage>()((...a) => ({
  ...createPortfolioStorage(...a),
}));
