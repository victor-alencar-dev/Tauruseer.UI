export type ISecurityControlElementStatus = 'warning' | 'success' | 'error' | 'muted';
type SecurityControlCategory = 'Prevention' | 'Detection' | 'Protection';
export interface ISecurityControl {
  level: number;
  name: string;
  subtitle: string;
  multicolumns: boolean;
  elementMatch: number;
  category: SecurityControlCategory;
  elements: ISecurityControlElement[];
}

export interface ISecurityControlElement {
  title?: string;
  name: string;
  ref?: Array<string>;
  status: ISecurityControlElementStatus;
  connected: boolean;
}

export const securityControlsHeaders: ISecurityControl[] = [
  {
    level: 1,
    name: 'Software Supply ',
    subtitle: 'Chain Security',
    category: 'Prevention',
    elementMatch: 0,
    multicolumns: true,
    elements: [
      {
        name: 'Source Control',
        ref: ['GitHub', 'Gitlab', 'Bitbucket', 'Bitbucket Server', 'Azure DevOps'],
        status: 'muted',
        connected: false,
      },
      {
        name: 'CI/CD',
        ref: ['Jenkins', 'Bamboo', 'TravisCI', 'CircleCI'],
        status: 'muted',
        connected: false,
      },
      {
        name: 'Work Item Tracking',
        ref: ['JIRA', 'Azure DevOps', 'Github', 'GitLab'],
        status: 'muted',
        connected: false,
      },
      {
        name: 'SCA Scanner',
        ref: ['DocioScanner'],
        status: 'muted',
        connected: true,
      },
    ],
  },

  {
    level: 2,
    name: 'Application Security',
    category: 'Prevention',
    subtitle: 'Posture Management',
    multicolumns: true,
    elementMatch: 0,
    elements: [
      {
        name: 'Training',
        ref: [],
        status: 'muted',
        connected: false,
      },
      {
        name: 'DAST',
        ref: [],
        status: 'muted',
        connected: false,
      },
      {
        name: 'API Security',
        ref: [],
        status: 'muted',
        connected: false,
      },
      {
        name: 'SAST',
        ref: [],
        status: 'muted',
        connected: false,
      },

      {
        name: 'WAF',
        ref: [],
        status: 'muted',
        connected: false,
      },
    ],
  },
  {
    level: 3,
    name: 'Cloud-Native Application',
    category: 'Protection',
    subtitle: 'Protection Platform',
    multicolumns: true,
    elementMatch: 0,
    elements: [
      {
        name: 'CSPM',
        ref: [],
        status: 'muted',
        connected: false,
      },
      {
        name: 'SIEM',
        ref: [],
        status: 'muted',
        connected: false,
      },
      {
        name: 'IAM',
        ref: [],
        status: 'muted',
        connected: false,
      },
    ],
  },
];
