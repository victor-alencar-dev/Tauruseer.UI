import { ExternalService } from '@tauruseer/core';
import { DataSource } from '../../state/onboarding-storage';
export interface dataSourceInfoMap {
  source: ExternalService;
  iconColor: string;
  sourceName: string;
  id: string | DataSource;
  col: number;
}
export const dataSourcesMap1: Array<dataSourceInfoMap> = [
  {
    source: ExternalService.GitHub,
    iconColor: '#1B2124',
    sourceName: 'GitHub Repository',
    id: 'Github',
    col: 1,
  },
  {
    source: ExternalService.GitLab,
    iconColor: '#FC6D26',
    sourceName: 'GitLab',
    id: 'Gitlab',
    col: 1,
  },
];
export const dataSourcesMap2: Array<dataSourceInfoMap> = [
  {
    source: ExternalService.Bitbucket,
    iconColor: '#1A74ED',
    sourceName: 'Bitbucket Server',
    id: 'Bitbucket',
    col: 2,
  },
  {
    source: ExternalService.Azure,
    iconColor: '#3778BF',
    sourceName: 'Azure DevOps',
    id: 'Azure',
    col: 2,
  },
];
