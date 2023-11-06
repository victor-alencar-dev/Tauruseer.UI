export enum BusinessCriticalities {
  Critical = 0,
  Important = 1,
  Strategic = 2,
  Internal_Support = 3,
  General_Support = 4,
}

export enum OutcomeCategoryTypes {
  Run_The_Business = 0,
  Grow_The_Business = 1,
  Transform_The_Business = 2,
  Regulatory = 3,
}
export enum BusinessPurposes {
  Operational_Efficiency = 0,
  Customer_Experience = 1,
  Value_Proposition = 2,
}
export enum InternetExposure {
  Not_Exposed = 0,
  Exposed = 1,
}

export enum Regulation {
  SOC = 1,
  NIST = 2,
  ISO_27001 = 3,
  PCI = 4,
  HIPAA = 5,
  FedRAMP = 6,
  CMMC = 7,
}

export enum SensitiveDataClassification {
  PII = 1,
  PHI = 2,
  PCI = 3,
  ACP = 4,
  IP = 5,
  PW = 6,
  CUI = 7,
  CDI = 8,
}

export enum LifeCycleStages {
  Research_And_Development = 0,
  Analysis = 1,
  Design = 2,
  Construction = 3,
  Testing = 4,
  Maintenance = 5,
  Sunset = 6,
  Retired = 7,
}
export enum FinancialImpacts {
  Risk_Avoidance = 1,
  Avoid_Cost = 2,
  Reduce_Cost = 3,
  Protect_Revenue = 4,
  Grow_Revenue = 5,
}

export enum RiskIQLevel {
  Level_1 = 1,
  Level_2 = 2,
  Level_3 = 3,
  Level_4 = 4,
  Level_5 = 5,
}
export enum BusinessTypes {
  Enterprise = 1,
  Non_Profit = 2,
  Startup = 3,
  Government = 4,
}

export enum GradeTypes {
  A = 1,
  B = 2,
  C = 3,
  D = 4,
  F = 5,
}

export enum PolicyType {
  Other = 0,
  Architectural = 1,
  Financial = 2,
  Regulatory = 3,
  Security = 4,
}

export enum ToolStatus {
  Unauthorized = 0,
  Allow = 1,
  Fail = 2,
}
export enum RuleResult {
  Approved = 1,
  Required = 2,
  Prohibited = 3,
}
export enum PolicyScope {
  Business = 1,
}

export enum RuleType {
  Technology = 2,
}

export enum InsightDismissedReason {
  Resolved = 1,
  Incorrect = 2,
  NotApplicable = 3,
  Other = 4,
}
export enum RiskType {
  DependencyVulnerability = 1,
  CodeVulnerability = 2,
  Cognition = 3,
}
export enum AssetType {
  SourceRepo = 1,
  CloudService = 2,
}
export enum ProductEnumsReference {
  BusinessCriticalities = 'BusinessCriticalities',
  BusinessPurposes = 'BusinessPurposes',
  OutcomeCategoryTypes = 'OutcomeCategoryTypes',
  InternetExposure = 'InternetExposure',
  Regulation = 'Regulation',
  SensitiveDataClassification = 'SensitiveDataClassification',
  LifeCycleStages = 'LifeCycleStages',
  FinancialImpacts = 'FinancialImpacts',
  RiskIQLevel = 'RiskIQLevel',
  BusinessTypes = 'BusinessTypes',
  PolicyType = 'PolicyType',
  ToolStatus = 'ToolStatus',
  PolicyScope = 'PolicyScope',
  RuleType = 'RuleType',
  RuleResult = 'RuleResult',
  InsightDismissedReason = 'InsightDismissedReason',
}
