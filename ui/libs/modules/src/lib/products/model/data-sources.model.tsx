import { ExternalService, ServiceCategory, ServiceConfiguration } from '@tauruseer/core';
import { AssetMappingType } from '@tauruseer/module';

export type TMappedAsset = {
  name: string;
  url: string;
  externalServiceId: string;
  id: string;
  hasSyncedWorkItems?: boolean;
  referenceId?: string;
  scanKey?: string;
  isWorkTrackingProject?: boolean;
  mappingType?: AssetMappingType;
};

export interface IDataSourceData {
  accountApiKey?: string | undefined;
  urlInfo?: string;
  userName?: string;
  expiresIn?: Date;
  source: ExternalService;
  iconColor: string;
  sourceName: string;
  serviceCategories: ServiceCategory[]; // Determines the dropdown options
  configurationOptions: ServiceConfiguration[]; // Determines the configuration options shown to the user
  id: string;
  uniqueId?: string;
  enabled?: boolean;
  connected?: boolean;
  externalId?: string;
  mappedAssets?: TMappedAsset[];
  unmappedAssets?: TMappedAsset[];
}
export const MappingsType: { [key: number]: string } = {
  [AssetMappingType.None]: 'None',
  [AssetMappingType.SASTProject]: 'SAST Project',
  [AssetMappingType.SourceRepo]: 'Source Repo',
  [AssetMappingType.WorkTrackingProject]: 'Work Tracking Project',
};
export const dataSourcesConfig: Array<IDataSourceData> = [
  {
    source: ExternalService.GitHub,
    iconColor: '#1B2124',
    sourceName: 'GitHub Repository',
    serviceCategories: [ServiceCategory.SourceRepos],
    configurationOptions: [ServiceConfiguration.Repository],
    id: 'Github',
    enabled: true,
  },
  {
    source: ExternalService.Bitbucket,
    iconColor: '#1A74ED',
    sourceName: 'Bitbucket',
    serviceCategories: [ServiceCategory.SourceRepos],
    configurationOptions: [ServiceConfiguration.Repository],
    id: 'Bitbucket',
    enabled: false,
  },
  {
    source: ExternalService.BitbucketServer,
    iconColor: '#1A74ED',
    sourceName: 'Bitbucket Server',
    serviceCategories: [ServiceCategory.SourceRepos],
    configurationOptions: [
      ServiceConfiguration.PersonalAccessToken,
      ServiceConfiguration.Repository,
    ],
    id: 'BitbucketServer',
    enabled: true,
  },
  {
    source: ExternalService.GitLab,
    iconColor: '#FC6D26',
    sourceName: 'GitLab',
    serviceCategories: [ServiceCategory.SourceRepos, ServiceCategory.WorkTrackingTools],
    configurationOptions: [ServiceConfiguration.Repository],
    id: 'Gitlab',
    enabled: false,
  },
  {
    source: ExternalService.VisualStudioOnline,
    iconColor: '#3778BF',
    sourceName: 'Azure DevOps',
    serviceCategories: [
      ServiceCategory.SourceRepos,
      ServiceCategory.WorkTrackingTools,
      ServiceCategory.ContinuousIntegration,
    ],
    configurationOptions: [ServiceConfiguration.Repository],
    id: 'Azure',
    enabled: true,
  },
  {
    source: ExternalService.JIRA,
    iconColor: '#1A74ED',
    sourceName: 'JIRA',
    serviceCategories: [ServiceCategory.WorkTrackingTools],
    configurationOptions: [ServiceConfiguration.TrackingTool],
    id: 'JIRA',
    enabled: true,
  },
  {
    source: ExternalService.DocioScanner,
    iconColor: '#261C67',
    sourceName: 'Start Left Scanner',
    serviceCategories: [ServiceCategory.SCA],
    configurationOptions: [ServiceConfiguration.ScanKeys],
    id: 'DocioScanner',
    enabled: true,
  },
  {
    source: ExternalService.Jenkins,
    iconColor: '#1B2124',
    sourceName: 'Jenkins',
    serviceCategories: [ServiceCategory.ContinuousIntegration],
    configurationOptions: [ServiceConfiguration.Repository],
    id: 'Jenkins',
  },
  {
    source: ExternalService.Bamboo,
    iconColor: '#1A74ED',
    sourceName: 'Bamboo',
    serviceCategories: [ServiceCategory.ContinuousIntegration],
    configurationOptions: [ServiceConfiguration.Repository],
    id: 'Bamboo',
  },
  {
    source: ExternalService.TravisCI,
    iconColor: '#3C3A3E',
    sourceName: 'TravisCI',
    serviceCategories: [ServiceCategory.ContinuousIntegration],
    configurationOptions: [ServiceConfiguration.Repository],
    id: 'TravisCI',
  },
  {
    source: ExternalService.CircleCI,
    iconColor: '#343434',
    sourceName: 'CircleCI',
    serviceCategories: [ServiceCategory.ContinuousIntegration],
    configurationOptions: [ServiceConfiguration.Repository],
    id: 'CircleCI',
  },
  {
    source: ExternalService.ApplicationInsights,
    iconColor: '#775AD9',
    sourceName: 'ApplicationInsights',
    serviceCategories: [ServiceCategory.Performance],
    configurationOptions: [ServiceConfiguration.Repository],
    id: 'ApplicationInsights',
  },
  {
    source: ExternalService.NewRelic,
    iconColor: '#1CE783',
    sourceName: 'NewRelic',
    serviceCategories: [ServiceCategory.Performance],
    configurationOptions: [ServiceConfiguration.Repository],
    id: 'NewRelic',
  },
  {
    source: ExternalService.Sonar,
    iconColor: '#5BA2D1',
    sourceName: 'SonarQube',
    serviceCategories: [ServiceCategory.SAST],
    configurationOptions: [
      ServiceConfiguration.PersonalAccessToken,
      ServiceConfiguration.CodeAnalysisProject,
    ],
    enabled: true,
    id: 'Sonar',
  },
];
