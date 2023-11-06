import { create, StateCreator } from 'zustand';

export interface ProductStorage {
  isCardOpen: boolean;
  productId: string;
  setIsCardOpen: (isOpen: boolean) => void;
  setProductId: (productId: string) => void;
}

export const createProductStorage: StateCreator<ProductStorage> = (set) => ({
  isCardOpen: false,
  productId: '',
  setIsCardOpen: (isOpen) => set(() => ({ isCardOpen: isOpen })),
  setProductId: (productId) => set(() => ({ productId: productId })),
});

export const ProductStore = create<ProductStorage>()((...a) => ({
  ...createProductStorage(...a),
}));
