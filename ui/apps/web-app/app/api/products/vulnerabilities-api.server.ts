import { http } from '@tauruseer/api';
export const getVulnerabilities = async (productId: string) => {
  const { data } = await http.get(`vulnerabilities/product/${productId}`);
  return data;
};

export const getVulnerabilitiesDependencies = async (vulnerabilityId: string) => {
  const { data } = await http.get(`vulnerabilities/dependencies/${vulnerabilityId}`);
  return data;
};
export const getVulnerabilitiesDetail = async (vulnerabilityId: string) => {
  const { data } = await http.get(`vulnerabilities/${vulnerabilityId}`);
  return data;
};

export const getVulnerabilitiesDetailOfProduct = async (
  productId: string,
  vulnerabilityId: string,
) => {
  const { data } = await http.get(`vulnerabilities/product/${productId}/${vulnerabilityId}`);
  return data;
};

export const getVulnerabilitiesCount = async (productId: string) => {
  const { data } = await http.get(`vulnerabilities/product/${productId}/count`);
  return data;
};

export const getVulnerabilitiesRemediation = async (productId: string) => {
  const { data } = await http.get(`vulnerability-remediation/${productId}?TimeWindow=6`);
  return data;
};

export const getVulnerabilitiesAIRemediation = async (
  id: string,
  type: 'Code' | 'Dependency',
  includeCodeExamples: boolean,
  language?: string,
) => {
  try {
    const queryParams = new URLSearchParams({
      key: id,
      type: type,
      includeCodeExamples: includeCodeExamples ? 'true' : 'false',
      ...(language && { language }),
    });

    const { data } = await http.get(
      `vulnerability-remediation/${type.toLowerCase()}?${queryParams.toString()}`,
    );

    return data;
  } catch (e) {
    return null;
  }
};

export const acceptRiskOnVulnerability = async (vulnerabilityIds: number[], productId: string) => {
  const { data } = await http.post(
    `vulnerabilities/accept-risk`,
    JSON.stringify({ vulnerabilityIds, productId }),
  );

  return data || 'success';
};

//TODO:move this when the global search is complete on the backend now just return vulnerabilities result
export const getSuggestions = async (searchTerm: string) => {
  return await http.get(`Search?searchTerm=${searchTerm}`);
};
