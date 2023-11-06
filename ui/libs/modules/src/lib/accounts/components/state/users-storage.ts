import { User } from '@tauruseer/module';
import { StateCreator, create } from 'zustand';

export interface UserStorage {
  user: User;
  userFormOpen: boolean;
  activeUserFormOpen: boolean;
  setUser: (user: User) => void;
  setUserFormOpen: (isOpen: boolean) => void;
  setActiveUserFormOpen: (isOpen: boolean) => void;
}

export const createUserStorage: StateCreator<UserStorage> = (set) => ({
  user: {},
  userFormOpen: false,
  activeUserFormOpen: false,
  setUser: (user) => set(() => ({ user })),
  setUserFormOpen: (isOpen) => set(() => ({ userFormOpen: isOpen })),
  setActiveUserFormOpen: (isOpen) => set(() => ({ activeUserFormOpen: isOpen })),
});

export const UserStore = create<UserStorage>()((...a) => ({
  ...createUserStorage(...a),
}));
