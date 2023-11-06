export interface TraceLog {
  title: string;
  type?: string;
  icon?: string;
  description: string;
  date: string;
}

export interface TraceItem {
  date: string;
  logs: TraceLog[];
}

export enum TimelineEventTypes {
  InsightDetected = 1,
  InsightUserDismissed = 2,
  ProductCreated = 3,
  ProductEdited = 4,
  PortfolioCreated = 5,
  ReconcilitaionDataSourceDiscoverd = 6,
  ReconcilitaionDataSourceDismissed = 7,
  ReconcilitaionDataSourceMapped = 8,
  NewTeamMember = 9,
  DatasourceMappingCreated = 10,
  PolicyCreated = 11,
  PolicyEdited = 12,
  InsightAutoDismissed = 13,
  TimelineDiscussionCreated = 14,
  TimelineCommentCreated = 15,
  OutageCreated = 16,
  OutageEdited = 17,
  ReleaseCreated = 18,
  ReleaseEdited = 19,
  PolicyRuleCreated = 20,
  PolicyRuleEdited = 21,
  PolicyRuleDeleted = 22,
  PolicyConditionsUpdated = 23,
  VulnerabilitiesDismissed = 25,
}
export enum ReferenceTypes {
  ProductId = 0,
  TechnologyId = 1,
  TechnologyVersionId = 2,
  AccountTeamMemberId = 3,
  InsightId = 4,
  UserId = 5,
  PolicyId = 6,
  UnmappedAccountDataSourceId = 7,
  PortfolioId = 8,
  TimelineEventId = 9,
  ProductExternalServiceMappingId = 10,
  VulnerabilityId = 11,
  ProductOutageId = 12,
  ProductReleaseId = 13,
  CloudResource = 14,
  DependencyId = 15,
  ExternalServiceVersionId = 16,
}
export enum InsightCategories {
  SDLCIntel = 0,
  ThreatIntel = 1,
  Economics = 2,
  Sourcing = 3,
  Governance = 4,
}
export enum AlertSeverity {
  Critical = 1,
  Warning = 2,
  Notice = 3,
  Information = 4,
}
export const EventIcons = new Map<TimelineEventTypes, string>([
  [3, 'fa fa-plus'],
  [4, 'fa fa-pencil'],
  [5, 'fa fa-briefcase'],
  [6, 'fa fa-exchange'],
  [7, 'fa fa-times'],
  [8, 'fa fa-compress'],
  [9, 'fa fa-user'],
  [10, 'fa fa-plug'],
  [11, 'fa fa-gavel'],
  [12, 'fa fa-gavel'],
  [13, 'fa fa-eye'],
  [14, 'fa fa-users'],
  [16, 'fa fa-exclamation-circle'],
  [17, 'fa fa-exclamation-circle'],
  [18, 'fa fa-external-link-square'],
  [19, 'fa fa-external-link-square'],
  [20, 'fa fa-gavel'],
  [21, 'fa fa-gavel'],
  [22, 'fa fa-gavel'],
  [23, 'fa fa-gavel'],
  [25, 'fa fa-gavel'],
]);

export const CategoryIcons = new Map<string, string>([
  ['Info', 'fa-light fa-circle-info'],
  ['Warning', 'fa-regular fa-triangle-exclamation'],
  ['Error', 'fa-regular fa-triangle-exclamation'],
  ['Successful', 'fa-regular fa-check'],
]);
