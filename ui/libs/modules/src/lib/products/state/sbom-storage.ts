import { create, StateCreator } from 'zustand';

export interface SBOMStorage {
  selectedRepository: number | null;
  setSelectedRepository: (data: number | null) => void;
  downloadReport?: boolean;
  setDownloadReport: (isDownload: boolean) => void;
  reportId?: string | number;
  setReportId: (reportId: string | number) => void;
  reportsRunning?: boolean;

  setNewReportRunning: (newReport: boolean) => void;
}

export const createSBOMStorage: StateCreator<SBOMStorage> = (set) => ({
  selectedRepository: null,
  downloadReport: false,
  setSelectedRepository: (data) => set(() => ({ selectedRepository: data })),
  setDownloadReport: (isDownload) => set(() => ({ downloadReport: isDownload })),
  setReportId: (reportId) => set(() => ({ reportId })),
  setNewReportRunning: (newReport) => set(() => ({ reportsRunning: newReport })),
});

export const SBOMStore = create<SBOMStorage>()((...a) => ({
  ...createSBOMStorage(...a),
}));
