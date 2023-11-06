import { AssetType, RiskType } from '@tauruseer/core';

export interface IPrioritizedRisks {
  assetId: number;
  assetType: AssetType;
  vulnerabilityId: number;
  prioritizedRiskType: RiskType;
  description: string;
  referenceLink: string;
  name: string;
  source: string;
  severity: string;
  firstDetection: string;
  lastDetection: string;
  status: string;
  owner?: string;
  icon?: string;
  key?: string;
}
