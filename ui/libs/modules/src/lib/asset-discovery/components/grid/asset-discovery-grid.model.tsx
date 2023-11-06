import { IGridColumnModel } from '@tauruseer/core';

export const discoveredColumnsGridModel: IGridColumnModel[] = [
  {
    field: 'displayName',
    title: 'Asset Name',
    customCell: 'CustomAssetNameColumn',
  },
  {
    field: 'assetType',
    title: 'Asset Type',
    customCell: 'CustomAssetTypeColumn',
  },
  {
    field: 'projectType',
    title: 'Project Type',
    customCell: 'CustomProjectTypeColumn',
  },
  {
    field: 'dateTimeUtc',
    title: 'Discovered',
    customCell: 'CustomAgeColumn',
  },
  {
    field: 'createdAt',
    title: 'Asset Age',
    customCell: 'CustomAgeColumn',
  },
  {
    field: 'lastScanAt',
    title: 'Last Scan',
    customCell: 'CustomLastScanAtColumn',
  },
  {
    field: 'vulnerabilitiesCount',
    title: 'Scan Result',
    customCell: 'CustomScanResultColumn',
  },
  {
    field: 'creatorName',
    title: 'Created By',
    customCell: 'CustomNameColumn',
  },
];

export const investigatingColumnsGridModel: IGridColumnModel[] = [
  {
    field: 'displayName',
    title: 'Asset Name',
    customCell: 'CustomAssetNameColumn',
  },
  {
    field: 'assetType',
    title: 'Asset Type',
    customCell: 'CustomAssetTypeColumn',
  },
  {
    field: 'projectType',
    title: 'Project Type',
    customCell: 'CustomProjectTypeColumn',
  },
  {
    field: 'investigatedByUserName',
    title: 'Investigated by',
  },
  {
    field: 'investigatedAt',
    title: 'Investigation Age',
    customCell: 'CustomAgeColumn',
  },
  {
    field: 'createdAt',
    title: 'Asset Age',
    customCell: 'CustomAgeColumn',
  },
  {
    field: 'lastScanAt',
    title: 'Last Scan',
    customCell: 'CustomLastScanAtColumn',
  },
  {
    field: 'vulnerabilitiesCount',
    title: 'Scan Result',
    customCell: 'CustomScanResultColumn',
  },
  {
    field: 'creatorName',
    title: 'Created By',
    customCell: 'CustomNameColumn',
  },
];
export const riskAcceptedColumnsGridModel: IGridColumnModel[] = [
  {
    field: 'displayName',
    title: 'Asset Name',
    customCell: 'CustomAssetNameColumn',
  },
  {
    field: 'assetType',
    title: 'Asset Type',
    customCell: 'CustomAssetTypeColumn',
  },
  {
    field: 'projectType',
    title: 'Project Type',
    customCell: 'CustomProjectTypeColumn',
  },
  {
    field: 'AcceptedBy',
    title: 'Approved by ',
  },
  {
    field: 'dismissedAt',
    title: 'Accepted by',
    customCell: 'CustomAcceptedByColumn',
  },
  {
    field: 'createdAt',
    title: 'Asset Age',
    customCell: 'CustomAgeColumn',
  },
  {
    field: 'lastScanAt',
    title: 'Last Scan',
    customCell: 'CustomLastScanAtColumn',
  },
  {
    field: 'vulnerabilitiesCount',
    title: 'Scan Result',
    customCell: 'CustomScanResultColumn',
  },
  {
    field: 'creatorName',
    title: 'Created By',
    customCell: 'CustomNameColumn',
  },
];

export const scanColumnConfig = [
  {
    value: 'issue',
    title: 'Issues',
    className: 'box-scan-issue',
  },
  {
    value: 'noIssue',
    title: 'Issues',
    className: 'box-not-issue',
  },
  {
    value: null,
    title: 'Not Scanned',
    className: 'box-not-scan',
  },
];
