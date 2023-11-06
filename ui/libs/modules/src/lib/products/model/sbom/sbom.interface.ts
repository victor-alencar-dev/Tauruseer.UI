export interface IMappedAsset {
  apiKey?: string;
  apiKeyEncryptionParameters?: string;
  assetId?: number;
  createdAt?: string;
  dataSourceOAuthTokenId?: number;
  description?: string;
  externalServiceId?: number;
  externalServiceVersionId?: number;
  faultStatus?: string;
  id?: number;
  isActive?: boolean;
  isAgentMapping?: boolean;
  isEncrypted?: boolean;
  isWorkTrackingProjectActive?: boolean;
  lastSync?: string;
  name?: string;
  payload?: null;
  productExternalServiceMappingOptions?: Array<any>;
  productId?: number;
  projectKey?: null;
  referenceId?: string;
  uniqueId?: string;
  urlInfo?: string;
  userId?: number;
  workTrackingProjectId?: number;
}

export interface IRepository {
  id?: number;
  assetId?: number;
  name?: string;
  productId?: number;
}
