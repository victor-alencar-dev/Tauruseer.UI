export type TCodeIssueStatus = 'New' | 'InProcess' | 'RiskAccepted';

export type TCodeVulnerabilityInstance = {
  product: string;
  issueDetailUrl: string;
  codeAnalysisIssueId: number;
  codeAnalysisProjectId: number;
  codeIssueRuleInfo: null;
  key: string;
  component: string;
  ruleId: string;
  line: 160;
  itemStatus: TCodeIssueStatus;
  project: string;
  source: string;
  sonarQubeStatus: string;
  projectName: string;
  productName: string;
  ruleName: string;
  severity: string;
  hash: string;
  message: string;
  creatorCodeAnalysisUserId: number;
  assigneeCodeAnalysisUserId: number;
  authorUsername: string;
  authorEmail: null;
  authorDisplayName: string;
  assigneeUsername: string;
  assigneeEmail: null;
  assigneeDisplayName: string;
  created: string;
  updated: null;
  dueDate: null;
  rawJson: null;
  isDismissed: boolean;
  dismissedByUserId: null;
  dismissedDateTimeUTC: null;
  type: 'CODE_SMELL' | 'BUG' | 'VULNERABILITY';
  workItemId: string;
  workItemExternalId: string;
  workItemExternalUrl: string;
  workItemExternalKey: string;
  externalServiceId: string;
  dateCreated: string;
  createdByDisplayName: string;
};

export type TCodeVulnerability = {
  codeAnalysisIssueDetailList: TCodeVulnerabilityInstance[];
  htmlDescription: string;
  externalUrl: string;
  productId: string;
  productName: string;
  message: string;
  ruleName: string;
  ruleId: string;
  severity: string;
  firstDetectionDate: string;
  lastDetectionDate: string;
  referenceLinks: TCodeVulnerabilityReference[];
  type: string;
};

export type TCodeVulnerabilityListItem = {
  codeAnalysisIssueId: number;
  codeAnalysisProjectId: number;
  key: string;
  ruleId: string;
  line: number;
  sonarQubeStatus: string;
  itemStatus: string;
  severity: string;
  hash: string;
  message: string;
  type: string;
  scope: string;
  quickFixAvailable: string;
  project: string;
  creatorCodeAnalysisUserId: number;
  assigneeCodeAnalysisUserId: number;
  authorUsername: string;
  authorEmail: null;
  authorDisplayName: string;
  assigneeUsername: string;
  assigneeEmail: null;
  assigneeDisplayName: string;
  created: string;
  updated: null;
  dueDate: null;
  rawJson: null;
  workItemId: number;
  workItemExternalId: number;
  workItemExternalUrl: string;
  workItemExternalKey: string;
  isDismissed: boolean;
  dismissedByUserId: number;
  dismissedDateTimeUTC: string;
  ruleName: string;
  component: string;
};

export type TCodeVulnerabilityReference = {
  codeIssuesRulesInfoId: number;
  codeAnalysisIssueId: number;
  description: string;
  url: string;
};
