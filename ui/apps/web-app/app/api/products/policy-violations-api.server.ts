import { http } from '@tauruseer/api';
export const getPolicyViolations = async (productId: string) => {
  const { data } = await http.get(`policies/violations/${productId}`);
  return data;
};

export const getPolicyViolationsCount = async (productId: string) => {
  const { data } = await http.get(`policies/violations/${productId}/summary`);
  return data;
};

export const getPolicyViolationsDetail = async (productId: string, policyId: string) => {
  const { data } = await http.get(`policies/violations/${productId}/${policyId}`);
  return data;
};
