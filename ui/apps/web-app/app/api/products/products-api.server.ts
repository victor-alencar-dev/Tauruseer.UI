import { http } from '@tauruseer/api';
import { ReferenceTypes } from '@tauruseer/core';

export const getProductsList = async () => {
  return await http.get(`products`);
};

export const getProductsDetail = async (productId: string) => {
  return await http.get(`products/${productId}`);
};

export const setConfigureProduct = async (product: any) => {
  const { data } = await http.post(`products/configureProduct`, product);
  return data;
};

//Security control Calls
export const getSecurityControlsByProductId = async (productId: string) => {
  const { data: securityControls } = await http.get(
    `security-controls/${productId}/external-services`,
  );
  return securityControls;
};

//Prioritized Risks Calls
export const getPrioritizedRisk = async (productId: string, limit?: number) => {
  const { data } = await http.get(`prioritized-risks/${productId}/?limit=${limit}`);
  return data;
};
export const getPrioritizedRiskTop = async (productId: string) => {
  const { data } = await http.get(`/prioritized-risks/${productId}/top?limit=5`);
  return data;
};
export const getPrioritizedRiskCharts = async (productId: string) => {
  const { data } = await http.get(`prioritized-risks/charts/${productId}`);
  return data;
};

// repositories
export const getRepositories = async (productId: string) => {
  try {
    const { data } = await http.get(`shadowit/product/${productId}`);
    return data;
  } catch (error) {
    return [];
  }
};

//TimeLine
export const getTimeline = async (
  primaryReferenceId: string,
  primaryReferenceType: ReferenceTypes,
) => {
  const { data } = await http.post('timeline', {
    primaryReferenceType,
    primaryReferenceId,
  });
  return data;
};
