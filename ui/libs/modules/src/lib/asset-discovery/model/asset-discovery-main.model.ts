export enum BtnActive {
  Discovered = 0,
  Investigating = 1,
  RiskAccepted = 2,
  IsMapped = 3,
}
export enum mapActiveProduct {
  MapExisting = 0,
  NewProduct = 1,
}
export enum scannerStatus {
  NotScanned = -1,
  WaitingScanAnalysis = 1,
  ScanInProgress = 2,
  Completed = 3,
  Failed = 4,
}
export const ASSET_DISCOVERY_ACTION = {
  MAP_PRODUCT: 'MAP_PRODUCT',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  ACCEPT_RISK: 'ACCEPT_RISK',
  INVESTIGATE_ASSET: 'INVESTIGATE_ASSET',
  SET_MANUAL_SCAN: 'SET_MANUAL_SCAN',
};
export const scannerStatusInfo = [
  {
    text: 'Waiting Scan Analysis',
    type: 'warning',
  },
  {
    text: 'Scan In Progress',
    type: 'info',
  },
  {
    text: 'Completed',
    type: 'success',
  },
  {
    text: 'Failed',
    type: 'danger',
  },
  {
    text: 'Not Scanned',
    type: 'warning',
  },
];
export const mainPageBtnIndicator: Array<{ title: string; hasIndicator: boolean }> = [
  {
    title: 'Unmanaged',
    hasIndicator: true,
  },
  {
    title: 'Investigating',
    hasIndicator: true,
  },
  {
    title: 'Risk Accepted',
    hasIndicator: true,
  },
  {
    title: 'Managed',
    hasIndicator: true,
  },
];

export const actionCards = [
  {
    icon: 'fa-regular fa-location-plus',
    text: 'Map to Product',
    isDisabled: false,
    action: ASSET_DISCOVERY_ACTION.MAP_PRODUCT,
  },
  {
    icon: 'fa-light fa-file-magnifying-glass',
    text: 'Investigate Asset',
    isDisabled: false,
    action: ASSET_DISCOVERY_ACTION.INVESTIGATE_ASSET,
  },
  {
    icon: 'fa-regular fa-triangle-exclamation',
    text: 'Accept Risk',
    isDisabled: false,
    action: ASSET_DISCOVERY_ACTION.ACCEPT_RISK,
  },
  {
    icon: 'fa-regular fa-radar',
    text: 'Scan Asset',
    isDisabled: false,
    action: ASSET_DISCOVERY_ACTION.SET_MANUAL_SCAN,
  },
];

export const mapProductBtnIndicator: Array<{ title: string; hasIndicator: boolean }> = [
  {
    title: 'Map to Existing Product',
    hasIndicator: false,
  },
  {
    title: 'Create New Product',
    hasIndicator: false,
  },
];

export const ASSET_DISCOVERY_ACTION_MSG = {
  MAP_PRODUCT_SUCCESS: 'The Asset was successfully mapped to',
  ACCEPT_RISK_SUCCESS: 'Success, risk accepted ',
  ACTION_ERROR: 'There seems to be something that went wrong, Please try again',
  INVESTIGATE_ASSET_SUCCESS: 'Success, Investigate Asset ',
};

export const DIALOG_TEXT_ACTIONS = {
  ACCEPT_RISK: {
    TEXT_DESCRIPTION:
      'By moving forward you are accepting the risk and this asset will not be managed, your request is going to be sent up for approval. Do you accept the risk?',
    ACTION_TEXT: 'Accepting risk please wait ',
    btnText: 'Accept Risk',
  },
  INVESTIGATE_ASSET: {
    TEXT_DESCRIPTION: 'Confirm you want to move this asset for investigation',
    ACTION_TEXT: 'Investigating this Asset please wait ',
    btnText: 'Investigate Asset',
  },
  SET_MANUAL_SCAN: {
    TEXT_DESCRIPTION: 'Are you sure you want to scan this asset?',
    ACTION_TEXT: 'Starting Manual scan please wait',
    btnText: 'Scan Asset',
  },
};
