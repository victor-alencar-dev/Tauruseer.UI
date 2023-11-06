import { http } from '@tauruseer/api';

export const getTeamMembersByProduct = async (productId: string) => {
  const { data } = await http.get(`teammembers/product/${productId}`);
  return data;
};
export const getTeamMembers = async () => {
  const { data } = await http.get(`teammembers`);
  return data;
};

export const setTeamMembers = async (payload: any) => {
  const { data } = await http.post(`teammembers`, payload);
  return data;
};

export const mapTeamMembersToProducts = async (payload: any) => {
  const { data } = await http.post(`teammembers/map-to-product`, payload);
  return data;
};
