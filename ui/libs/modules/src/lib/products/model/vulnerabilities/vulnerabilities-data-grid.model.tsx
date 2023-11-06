import { IGridColumnModel } from '@tauruseer/core';

export const vulnerabilitiesColumnGridModel: IGridColumnModel[] = [
  {
    field: 'name',
    title: 'Vulnerability',
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
    field: 'lastDetection',
    title: 'Detection',
    customCell: 'DetectionCell',
  },
  {
    field: 'workItemExternalKey',
    title: 'Actions',
    customCell: 'ActionsCell',
  },
];
export const dependenciesTechnologiesColumnGridModel: IGridColumnModel[] = [
  {
    field: 'name',
    title: 'Product',
    customCell: 'CustomNameCell',
    width: 100,
  },
  {
    field: 'dependency',
    title: 'Dependencies',
    customCell: 'CustomDependencyCell',
  },
  {
    field: 'lastDetected',
    title: 'Last Detected',
    customCell: 'DetectedOnCell',
  },
  {
    field: 'sourceRepo',
    title: 'Source Repo',
    customCell: 'CustomDependencyCell',
  },
  {
    field: 'Owner',
    title: 'owner',
    customCell: 'CustomOwnerColumn',
  },
];

export const vulnerabilitiesColumnsWidth = {
  name: { laptop: 350, fullHD: 450, '2k': null },
};

export const dependenciesTechnologiesColumnsWidth = {};
