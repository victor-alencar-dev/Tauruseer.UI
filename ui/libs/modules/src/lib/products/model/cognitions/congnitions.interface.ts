import { CognitionCategories, CognitionSeverity, CognitionStatus } from '@tauruseer/module';

export interface ICognition {
  id: number;
  status: CognitionStatus;
  severityType: CognitionSeverity;
  title: string;
  message: string;
  category: CognitionCategories;
  firstDetectedAt: string;
  firstDetectedAtString: string;
  lastDetectedAt: string;
  lastDetectedAtString: string;
  workItemId: number;
  workItemExternalId: number;
  workItemExternalUrl: string;
  workItemExternalKey: string;
}

export interface ICognitionDetails {
  insightId: number;
  insightTypeId?: number;
  insightTypeName?: string;
  category: CognitionCategories;
  categoryName?: string;
  status: CognitionStatus;
  severity: CognitionSeverity;
  firstDetectedAt?: string;
  lastDetectedAt?: string;
  primaryReference?: IPrimaryReference;
  secondaryReference?: string;
  message?: string;
  payload?: string;
  resolvedAt?: string;
  dismissedAt?: string;
  dismissedByUser?: string;
  dismissedByUserGravatarUrl?: string;
  dismissedComments?: string;
  dismissalReason?: number;
  snoozedUntil?: string;
  links?: Array<any>;
}

export interface IPrimaryReference {
  referenceType: number;
  referenceTypeName?: string;
  referenceName?: string;
  referenceId?: number;
  referenceUniqueId?: string;
}
