export type PolicyViolationSeverity = 'Error' | 'Warning' | 'Notice' | 'Critical';
export interface IDependenciesTechnologies {
  name: string;
  detectedOn: string;
  dismissedOn: string;
  version: string;
}
export interface IPolicyViolation {
  id: string;
  isNew: boolean;
  productId: number;
  productGuid: string;
  productCode: string;
  productName: string;
  policyId: number;
  policyName: string;
  policyDescription: string;
  severity: PolicyViolationSeverity;
  detection: IDetection;
  actions: IPolicyViolationActions;
  ruleType: string;
  policyType: number;
  externalServiceId: number;
  toolType: number;
  technologyId: number;
  cloudResourceTypeId: number;
  dependencyName: string;
  dependencySourceType: number;
  ruleResult: number;
  detectedAt: string;
  policyRuleType: number;
}
export interface IPolicyViolationActions {
  trackItem: boolean;
  trainingAvailable: boolean;
}
export interface IDetection {
  first: number;
  last: number;
}
export interface IHeaderButton {
  title: string;
  hasIndicator: boolean;
}
