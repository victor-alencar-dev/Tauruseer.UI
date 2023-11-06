import { IGridColumnModel } from '@tauruseer/core';

export const riskManagementColumnsGridModel: IGridColumnModel[] = [
  {
    field: 'name',
    title: 'Name',
    customCell: 'CustomNameColumn',
    width: 250,
  },
  {
    field: 'riskIQLevelDescription',
    title: 'Security Control',
    customCell: 'CustomControlMaturityColumn',
    width: 100,
  },
  {
    field: 'vulnerabilities',
    title: 'Vulnerabilities',
    customCell: 'CustomCounterColumn',
    width: 90,
  },
  {
    field: 'cognitions',
    title: 'Cognitions',
    customCell: 'CustomCounterColumn',
    width: 90,
  },
  {
    field: 'averageRemediationTime',
    title: 'Avg Remediation Time',
    customCell: 'CustomAvgRemediationTimeColumn',
  },
  {
    field: 'internetExposure',
    title: 'Internet Exposure',
    customCell: 'CustomInternetExposureColumn',
  },
  {
    field: 'sensitiveDataClassifications',
    title: 'Data Classification',
    customCell: 'DataClassificationCustomCell',
  },
  {
    field: 'productOwnerName',
    title: 'Risk Owner',
    customCell: 'CustomRiskOwnerColumn',
  },
];

export const businessImpactColumnsGridModel: IGridColumnModel[] = [
  {
    field: 'name',
    title: 'Name',
    customCell: 'CustomNameColumn',
    width: 250,
  },
  {
    field: 'policies',
    title: 'Policy Violations',
    customCell: 'CustomCounterColumn',
    width: 130,
  },
  {
    field: 'complianceResult',
    title: 'GRC Violations',
    customCell: 'CustomCounterColumn',
    width: 130,
  },
  {
    field: 'businessCriticality',
    title: 'Business Criticality',
    customCell: 'GeneralCustomCell',
  },
  {
    field: 'outcomeCategory',
    title: 'Strategic Outcome',
    customCell: 'GeneralCustomCell',
  },
  {
    field: 'businessPurpose',
    title: 'Business Unit',
    customCell: 'GeneralCustomCell',
  },
  {
    field: 'financialImpact',
    title: 'Tags',
    customCell: 'GeneralCustomCell',
  },
];

export const riskManagementColumnsWidth = {
  name: { laptop: 250, fullHD: 300, '2k': null },
  riskIQLevelDescription: { laptop: 120, fullHD: 150, '2k': null },
  vulnerabilities: { laptop: 100, fullHD: 150, '2k': null },
  cognitions: { laptop: 100, fullHD: 130, '2k': null },
};

export const businessImpactColumnsWidth = {
  name: { laptop: 250, fullHD: 300, '2k': null },
  complianceResult: { laptop: 100, fullHD: 150, '2k': null },
  policies: { laptop: 130, fullHD: 170, '2k': null },
};
