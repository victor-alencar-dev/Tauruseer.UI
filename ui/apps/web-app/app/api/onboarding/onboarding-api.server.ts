import { http } from '@tauruseer/api';
export const getDataSourceReDirectionLink = async (type: string) => {
  const url = await getOAutDataSourcesLink(type);
  return await http(url, { method: 'POST' });
};

export const setOAuthDataSource = async (code: string, type: string) => {
  const url = await getOAutSetDataSourcesMethod(type, code);
  return await http(url, { method: 'POST' });
};

export const setFinishOnboarding = async (accountId: string) => {
  const url = `accounts/finishOnboarding?accountId=${accountId}`;
  return await http(url, { method: 'POST' });
};

export enum DataSources {
  GitHub = 'GitHub',
  Bitbucket = 'Bitbucket',
  BitbucketServer = 'BitbucketServer',
  GitLab = 'Gitlab',
  Azure = 'Azure',
  JIRA = 'JIRA',
}

export const getOAutSetDataSourcesMethod = async (dataSource: string, code: string) => {
  switch (dataSource) {
    case DataSources.GitHub:
      return `oauth/addgithubcallback?code=${code}`;
    case DataSources.Bitbucket:
    case DataSources.BitbucketServer:
      return `oauth/addbitbucketcallback?code=${code}`;
    case DataSources.GitLab:
      return `oauth/addgitlabcallback?code=${code}`;
    case DataSources.Azure:
      return `oauth/addazuredevopscallback?code=${code}`;
    case DataSources.JIRA:
      return `oauth/addjiracallback?code=${code}`;
    default:
      return `oauth/addgithubcallback?code=${code}`;
  }
};
export const getOAutDataSourcesLink = async (dataSource: string) => {
  switch (dataSource) {
    case DataSources.GitHub:
      return `oauth/addgithub`;
    case DataSources.BitbucketServer:
    case DataSources.Bitbucket:
      return `oauth/addbitbucket`;
    case DataSources.GitLab:
      return `oauth/addgitlab`;
    case DataSources.Azure:
      return `oauth/addazuredevops`;
    case DataSources.JIRA:
      return `oauth/addjira`;
    default:
      return `oauth/addgithub`;
  }
};
