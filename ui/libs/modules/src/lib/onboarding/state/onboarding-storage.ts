import { create, StateCreator } from 'zustand';
import { ONBOARDING } from '../model/onboarding.model';

export type DataSource =
  | 'Github'
  | 'Bitbucket'
  | 'BitbucketServer'
  | 'Gitlab'
  | 'Azure'
  | 'All'
  | null;
export interface OnboardingStorage {
  step: ONBOARDING;
  isActionDisabled: boolean;
  isDeleteBtnDisabled: boolean;
  isDeleteBtnEnabled: boolean;
  isSecondaryBtnVisible: boolean;
  primaryBtnText: string;
  secondaryBtnText: string;
  containerClsName: string;
  currentSelectedDataSource: DataSource;
  selectedDataSourceCard: DataSource;
  dataSources: DataSource[];

  setStep: (st: number) => void;
  setActionDisabled: (isDisabled: boolean) => void;
  setDeleteBtnDisabled: (isDisabled: boolean) => void;
  setDeleteBtnEnabled: (isEnabled: boolean) => void;
  setSecondaryBtnVisible: (isVisible: boolean) => void;
  setPrimaryBtnText: (text: string) => void;
  setSecondaryBtnText: (text: string) => void;
  setCurrentContainerClsName: (clsName: string) => void;
  setCurrentSelectedDataSource: (dataSource: DataSource) => void;
  setDataSource: (dataSource: DataSource) => void;
  setSelectedDataSourceCard: (dataSource: DataSource) => void;
}

export const createOnboardingStorage: StateCreator<OnboardingStorage> = (set) => ({
  step: ONBOARDING.welcome,
  isActionDisabled: false,
  isDeleteBtnDisabled: false,
  isDeleteBtnEnabled: false,
  isSecondaryBtnVisible: false,
  primaryBtnText: '...',
  secondaryBtnText: 'Back to Data Sources',
  containerClsName: 'onboarding-container-welcome',
  currentSelectedDataSource: null,
  dataSources: [],
  selectedDataSourceCard: null,
  setStep: (st) => set(() => ({ step: st })),
  setActionDisabled: (isDisabled) => set(() => ({ isActionDisabled: isDisabled })),
  setDeleteBtnDisabled: (isDisabled) => set(() => ({ isDeleteBtnDisabled: isDisabled })),
  setDeleteBtnEnabled: (isEnabled) => set(() => ({ isDeleteBtnEnabled: isEnabled })),
  setSecondaryBtnVisible: (isVisible) => set(() => ({ isSecondaryBtnVisible: isVisible })),
  setPrimaryBtnText: (btnText) => set(() => ({ primaryBtnText: btnText })),
  setSecondaryBtnText: (btnText) => set(() => ({ secondaryBtnText: btnText })),
  setCurrentContainerClsName: (clsName) => set(() => ({ containerClsName: clsName })),
  setCurrentSelectedDataSource: (dataSource: DataSource) =>
    set(() => ({ currentSelectedDataSource: dataSource })),
  setDataSource: (dataSource) =>
    set((state) => ({ dataSources: [...state.dataSources, dataSource] })),
  setSelectedDataSourceCard: (dataSource: DataSource) =>
    set(() => ({ selectedDataSourceCard: dataSource })),
});

export const OnboardingStore = create<OnboardingStorage>()((...a) => ({
  ...createOnboardingStorage(...a),
}));
