import { ExternalDataSource } from '@tauruseer/core';
import { scannerStatus } from '@tauruseer/module';
export interface IAssetDiscovery {
  id: number;
  displayName: string;
  isRepoFinishedScanning: boolean;
  dataSource: any;
  externalService: ExternalDataSource;
  isInvestigated: boolean;
  isDismissed: boolean;
  discoveredAtString: string;
  isOverMonthOld: boolean;
  age: string;
  createdAtString: boolean;
  creatorName: string;
  creatorIdentity: string;
  notificationId: number;
  name: string;
  referenceId: string;
  dateTimeUtc: string;
  projectType: string;
  scanResults: string | Array<IScannerResult>;
  scanKey: string;
  lastScanAt: string;
  lastScanStatus: scannerStatus;
  vulnerabilitiesCount: number;
  isMapped: boolean;
  products: Array<IObjectList>;
  investigateReasons: Array<IObjectList>;
}

export interface IScannerResult {
  date: string;
  vulnerabilities: IScanDescription;
}

export interface IScanDescription {
  name: string;
  description: string;
}

export interface IObjectList {
  id: string;
  name: string;
}
