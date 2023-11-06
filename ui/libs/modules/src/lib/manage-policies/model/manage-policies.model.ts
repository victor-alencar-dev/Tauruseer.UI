export interface Policy {
  name: string;
  policyType: number | string;
  description: string;
  isActive: boolean;
  createdByUserName?: string;
  createdByUserEmail?: string;
  createdAt?: string;
  updatedByUserName?: string;
  updatedByUserEmail?: string;
  updatedAt?: string;
  uniqueId?: string;
  unauthorizedCloudResourceTypeStrategy?: number;
  unauthorizedDependencyStrategy?: number;
  unauthorizedTechnologyStrategy?: number;
  unauthorizedToolStrategy?: number;
  unauthorizedToolTypeStrategy?: number;
}

export const defaultPolicy: Policy = {
  name: '',
  description: '',
  policyType: 0,
  isActive: true,
};

export interface IPolicyRules {
  ruleResult?: number;
  technologyId?: string;
  toolType?: number;
  externalService?: number;
  notes?: string;
  cloudResourceTypeId?: string;
  dependencyName?: string;
  dependencySourceType?: number;
  id?: string;
}
