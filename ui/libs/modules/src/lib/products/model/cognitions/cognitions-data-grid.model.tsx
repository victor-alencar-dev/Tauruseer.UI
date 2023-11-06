import { Breakpoints, IGridColumnModel } from '@tauruseer/core';

export type CognitionField = 'title' | 'severityType' | 'lastDetectedAt' | 'workItemExternalKey';

export const cognitionsColumnGridModel: IGridColumnModel[] = [
  {
    field: 'title',
    title: 'Cognition',
    customCell: 'InsightCell',
    width: 650,
  },

  {
    field: 'severityType',
    title: 'Severity',
    customCell: 'SeverityCell',
  },

  {
    field: 'lastDetectedAt',
    title: 'Detection',
    customCell: 'DetectionCell',
  },

  {
    field: 'workItemExternalKey',
    title: 'Actions',
    customCell: 'ActionsCell',
  },
];

export const cognitionsColumnsWidth: Record<CognitionField, Breakpoints> = {
  title: { laptop: null, fullHD: 600 },
  severityType: { laptop: 200, fullHD: 200 },
  lastDetectedAt: { laptop: 200, fullHD: null },
  workItemExternalKey: { laptop: null, fullHD: null },
};
