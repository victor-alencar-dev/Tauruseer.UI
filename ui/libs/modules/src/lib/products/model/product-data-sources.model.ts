export interface IExternalService {
  dataSourceOAuthTokenId: number;
  externalServiceId: number;
  externalServiceName: string;
  uniqueId: string;
  urlInfo: string;
  userName: string;
  expiresIn: string;
}

export interface IDataSourceMappedAsset {
  id: number;
  userName: string;
  name: string;
  assetId: number;
  productId: number;
  externalServiceId: number;
  externalServiceVersionId?: number;
  referenceId: string;
  apiKey?: string;
  dataSourceOAuthTokenId?: number;
  description?: string;
  createdAt: string;
  userId: number;
  urlInfo: string;
  lastSync: string;
  isActive: boolean;
  isEncrypted: boolean;
  faultStatus?: string;
  payload?: any;
  isAgentMapping: boolean;
  apiKeyEncryptionParameters?: any;
  uniqueId: string;
  productExternalServiceMappingOptions?: any;
  workTrackingProjectId?: string;
  assetMappingType: AssetMappingType;
}

export interface IDataSourceUnmappedAsset {
  id: number;
  accountId: number;
  createdAt: string;
  creatorIdentity: string;
  creatorName: string;
  dataSourceOAuthTokenId?: number;
  dateTimeUtc: string;
  dismissedAt?: string;
  dismissedByUserId?: number;
  externalUrl: string;
  userName?: string;
  isActive: boolean;
  isDismissed: boolean;
  isMapped: boolean;
  mappedAt?: string;
  mappedByUserId?: number;
  name: string;
  pendingChangeToPublicInsight: boolean;
  private: boolean;
  referenceId: string;
  repoProvider: number;
  repoType: number;
  sourceRepoId: number;
  uniqueId: string;
}

export interface IUnmappedWorkTrackingProject {
  workTrackingProjectId: number;
  referenceProjectId: string;
  referenceProjectKey: string;
  externalServiceId: number;
  accountId: number;
  dataSourceOAuthTokenId: number;
  name: string;
  externalUrl: string | null;
  userName?: string;
  isActive: boolean;
  creatorName: string | null;
  creatorIdentity: string | null;
  createdAt: string;
  isMapped: boolean;
  mappedAt: string | null;
  mappedByUserId: string | null;
  lastIssueSyncUtc: string | null;
  workTrackingIssues: {
    workTrackingIssueId: number;
    workTrackingProjectId: number;
  }[];
}

export interface IUnmappedCodeAnalysisProject {
  codeAnalysisProjectId: number;
  codeAnalysisProjectKey: string;
  externalServiceId: number;
  accountId: number;
  dataSourceOAuthTokenId: number;
  name: string;
  visibility: string;
  lastAnalysisDateUTC: string;
  revision: null;
  isActive: boolean;
  creatorName: null;
  creatorIdentity: null;
  createdAt: null;
  isMapped: boolean;
  mappedAt: null;
  mappedByUserId: null;
  codeAnalysisIssues: null;
  codeAnalysisHotspots: null;
}

export interface IWorkTrackingTool {
  productExternalServiceMappingId: number;
  workTrackingProjectId: number;
  externalServiceId: number;
  name: string;
}
export enum AssetMappingType {
  None = -1,
  SourceRepo = 1,
  WorkTrackingProject = 2,
  SASTProject = 3,
}
