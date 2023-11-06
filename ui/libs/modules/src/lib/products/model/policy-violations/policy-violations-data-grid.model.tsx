import { Breakpoints, IGridColumnModel } from '@tauruseer/core';
export type PolicyViolationField =
  | 'policyName'
  | 'severity'
  | 'detectedAt'
  | 'ruleType'
  | 'actions';
export const policyViolationsColumnGridModel: IGridColumnModel[] = [
  {
    field: 'policyName',
    title: 'Policy Violation',
    customCell: 'InsightCell',
    width: 650,
  },
  {
    field: 'severity',
    title: 'Severity',
    customCell: 'SeverityCell',
  },
  {
    field: 'detectedAt',
    title: 'Detection',
    customCell: 'DetectionCell',
  },
  {
    field: 'ruleType',
    title: 'Rule Type',
    customCell: 'RuleTypeCell',
  },
  {
    field: 'actions',
    title: 'Actions',
    customCell: 'ActionsCell',
  },
];

export const policyViolationsColumnsWidth: Record<PolicyViolationField, Breakpoints> = {
  policyName: { laptop: 500, fullHD: null },
  ruleType: { laptop: 170, fullHD: 200, '2k': null },
  severity: { laptop: 200, fullHD: 200 },
  detectedAt: { laptop: 200, fullHD: null },
  actions: { laptop: null, fullHD: null },
};
