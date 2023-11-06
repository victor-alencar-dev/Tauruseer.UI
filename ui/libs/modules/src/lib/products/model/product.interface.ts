export type DataPerspective = 'ASPM' | 'CSPM' | 'GRC';
export interface IProductsList {
  portfolioId: string;
  portfolio: string;
  products: Array<IProducts>;
}
export interface IProducts {
  apis?: number;
  averageRemediationTime?: number;
  birthday?: string;
  blendedRate?: string;
  buildVsBuy?: number;
  businessCriticality?: number;
  businessCriticalityDescription?: string;
  businessCriticalitySortValue?: number;
  businessPurpose?: number;
  businessPurposeDescription?: string;
  cloudResources?: number;
  code?: string;
  codeWeaknesses?: number;
  complianceResult?: number;
  dateCreatedUTC?: string;
  dependencies?: number;
  description?: string;
  estimatedLifespanYears?: string;
  financialImpact?: number;
  financialImpactDescription?: string;
  flattenedRegulations?: string;
  flattenedSensitiveData?: string;
  id: string;
  internetExposure?: number;
  isArchived?: boolean;
  isRiskIQLevelAchieved?: boolean;
  lifecycleStage?: number;
  maxCodeWeaknessSeverity?: number;
  maxVulnerabilityScore?: number;
  name?: string;
  outcomeCategory?: number;
  outcomeCategoryDescription?: string;
  policies?: number;
  portfolioOwner?: ITeamMembers;
  productOwner?: ITeamMembers;
  productId?: string;
  productKey?: string;
  productOwnerEmail?: string;
  productGrade?: number;
  productOwnerId?: string;
  productOwnerImg?: string;
  productOwnerName?: string;
  recommendedRiskIQLevel?: number;
  regulations?: Array<string>;
  riskIQLevel?: number;
  riskIQLevelDescription?: string;
  ruleViolations?: number;
  sensitiveDataClassifications?: Array<string>;
  securityLeadId?: string;
  securityLead?: ITeamMembers;
  targetRiskIQLevel?: number;
  teamSize?: number;
  techLead?: ITeamMembers;
  techLeadEmail?: string;
  techLeadId?: string;
  techLeadImg?: string;
  techLeadName?: string;
  technologies?: number;
  tools?: number;
  vulnerabilities?: number;
}
export interface IVulnerabilityRemediation {
  averageMinutes?: number;
  averageRemediationTime?: string;
  maxOpenMinutes?: number;
  maxOpenAge?: string;
  under30Days?: IRemediation;
  under60Days?: IRemediation;
  under90Days?: IRemediation;
  over90Days?: IRemediation;
}
export interface IRemediation {
  label?: string;
  count?: number;
  countAsOfTimeWindowStart?: number;
  change?: number;
}
export interface ITeamMembers {
  name?: string;
  teamMemberId?: number;
  email?: string;
  teamMemberImg?: string;
  charge?: string;
}
export interface IButtonIndicator {
  title?: string;
  hasIndicator?: boolean;
  to?: string;
}
export interface ITimeValue {
  format: string;
  value: number;
}
