import { create } from 'zustand';
import { createNavStorage, NavStorage } from '../../layout/left-nav/left-nav.storage';
import { createLayoutStorage, LayoutStorage } from './layout.state';

export const TrStore = create<NavStorage & LayoutStorage>((...a): any => ({
  ...createNavStorage(...a),
  ...createLayoutStorage(...a),
}));
