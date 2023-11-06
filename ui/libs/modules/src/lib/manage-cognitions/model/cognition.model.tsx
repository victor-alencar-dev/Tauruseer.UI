export interface Cognitions {
  code: string;
  id: string;
  title: string;
  category: cognitionCategory;
  description: string;
  severity: cognitionSeverity;
  isActive: boolean;
}

export enum cognitionCategory {
  SDlCIntel = 0,
  ThreatIntel = 1,
  Economics = 2,
  Sourcing = 3,
  Governance = 4,
}
export enum cognitionSeverity {
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4,
  Blocker = 5,
}
export const SeverityMap = new Map<cognitionSeverity, string>([
  [1, 'Low'],
  [2, 'Medium'],
  [3, 'High'],
  [4, 'Critical'],
  [5, 'Blocker'],
]);
export const CategoryMap = new Map<cognitionCategory, string>([
  [0, 'SDlC Intel'],
  [1, 'Threat Intel'],
  [2, 'Economics'],
  [3, 'Sourcing'],
  [4, 'Governance'],
]);
