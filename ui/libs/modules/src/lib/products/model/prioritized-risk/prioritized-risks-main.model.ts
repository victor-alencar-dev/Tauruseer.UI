export enum ButtonActive {
  Active = 0,
  InProgress = 1,
  Dismissed = 2,
}

export const prioritizedRiskCards = [
  {
    title: 'Top 5 Prioritized Risks',
    tabs: [],
    element: 'prioritizedRisk',
  },
  {
    title: 'Risks by Severity',
    tabs: [
      // { title: 'Risks by Severity', tab: 'risk', ref: 'severity' },
      // { title: 'Trend by Severity', tab: 'trend', ref: 'severity' },
    ],
    element: 'SeveritiesCharts',
  },
  {
    title: '',
    tabs: [
      { title: 'Risk Remediation', tab: 'remediation', ref: 'state' },
      { title: 'Risks by State', tab: 'state', ref: 'state' },
    ],
    element: 'StateRemediation',
  },
];

export const StatusChartList = [
  {
    text: 'Critical',
    color: '#E16666',
    ref: 4,
  },
  {
    text: 'High',
    color: '#FF961F',
    ref: 3,
  },
  {
    text: 'Medium',
    color: '#FCCA36',
    ref: 2,
  },
  {
    text: 'Low',
    color: '#70C86A',
    ref: 1,
  },
];
export const sourceUrl = ['vulnerabilities', 'code-vulnerabilities', 'cognitions'];
export const sourceType = ['Open Source', ' SonarQube', 'Cognitions'];
