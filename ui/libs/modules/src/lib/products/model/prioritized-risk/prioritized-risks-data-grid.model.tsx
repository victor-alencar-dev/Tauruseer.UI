import { IGridColumnModel } from '@tauruseer/core';

export const prioritizedRisksColumnGridModel: IGridColumnModel[] = [
  {
    field: 'insight',
    title: 'Insight',
    customCell: 'InsightCell',
  },
  {
    field: 'instances',
    title: 'Instances',
    customCell: 'InstancesCell',
  },
  {
    field: 'source',
    title: 'Source',
    customHeaderCell: 'CustomSourceHeaderCell',
    customCell: 'SourceCell',
  },
  {
    field: 'severity',
    title: 'Severity',
    customCell: 'SeverityCell',
  },
  {
    field: 'detection',
    title: 'Detection',
    customCell: 'DetectionCell',
  },
  {
    field: 'actions',
    title: 'Actions',
    customCell: 'ActionsCell',
  },
];

export const prioritizedRisksColumnWidth = {};
