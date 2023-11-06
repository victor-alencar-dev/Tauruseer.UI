import { IGridColumnModel } from '@tauruseer/core';

export const codeVulnerabilitiesColumnGridModel: IGridColumnModel[] = [
  {
    field: 'message',
    title: 'Code Vulnerabilities',
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
    customCell: 'SourceCell',
  },
  {
    field: 'severity',
    title: 'Severity',
    customCell: 'SeverityCell',
  },
  {
    field: 'lastDetectionDate',
    title: 'Detection',
    customCell: 'DetectionCell',
  },

  {
    field: 'workItemExternalKey',
    title: 'Actions',
    customCell: 'ActionsCell',
  },
];

export const codeVulnerabilitiesColumnsWidth = {};
