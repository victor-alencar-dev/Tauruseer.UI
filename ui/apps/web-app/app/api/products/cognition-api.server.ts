import { http } from '@tauruseer/api';
export const getCognitionsByProductId: (productId: string) => any = async (productId) => {
  const { data } = await http.get(`Cognitions/${productId}`);
  return data;
};

export const getCognitionsCountByProductId: (productId: string) => any = async (productId) => {
  const { data } = await http.get(`Cognitions/${productId}/count`);
  return data;
};

export const getCognitionsDetail = async (cognitionId: string, productId: string) => {
  const { data } = await http.get(`Cognitions/${productId}/${cognitionId}`);
  return data;
};
export const setCognitionsDismiss = async (productId: string, insightId: string, dismiss: any) => {
  const { data } = await http.post(`Cognitions/${productId}/${insightId}/dismiss`, dismiss);
  return data;
};
