import { http } from '@tauruseer/api';

export const getCodeVulnerabilitiesDetail = async (hash: string, productId: string) => {
  const { data } = await http.get(`codeanalysis/${productId}/${hash}/get-details`);
  return data;
};

export const getCodeVulnerabilitiesReferences = async (codeVulnerabilityId: string) => {
  const { data } = await http.get(`codeanalysis/${codeVulnerabilityId}/get-see-also-info`);
  return data;
};

export const acceptRiskOnCodeIssue = async (codeVulnerabilities: number[], productId: number) => {
  const { data } = await http.post(
    `codeanalysis/code-vulnerability-issues/accept-risk`,
    JSON.stringify({ codeAnalysisIssueIdList: codeVulnerabilities, productId }),
  );

  return data || 'success';
};

export const getCodeVulnerabilitiesDescription = async (codeVulnerabilityId: string) => {
  const { data } = await http.get(`codeanalysis/${codeVulnerabilityId}/get-description`, {
    responseType: 'text',
  });
  return data;
};

export const getCodeVulnerabilities = async (productId: string) => {
  const { data } = await http.get(`codeanalysis/code-vulnerability-issues/${productId}`);
  return data;
};

export const getCodeVulnerabilitiesCount = async (productId: string) => {
  try {
    const { data } = await http.get(`codeanalysis-stats/vulnerability-issues-count/${productId}`);
    return data;
  } catch (error) {
    return 0;
  }
};
