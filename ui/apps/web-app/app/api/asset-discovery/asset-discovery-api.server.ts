import { http } from '@tauruseer/api';
export const getAssetList = async () => {
  return await http.get(`shadowit`);
};

export const getAssetDetail = async (detailId: string) => {
  return await http.get(`shadowit/${detailId}`);
};

export const createProduct = async (product: any) => {
  const { data } = await http.post(`assets/${product.assetId}/create-product`, {
    name: product.name,
    description: product.description,
  });
  return data;
};

export const mapProduct = async (product: any) => {
  const { productId, assetId } = product;
  return await http.post(`assets/${assetId}/map-product`, { productId });
};

export const getScanDetail = async (assetId: string) => {
  return await http.get(`vulnerabilities/asset/${assetId}/scan-details`);
};

export const setAcceptRisk = async (assetId: string) => {
  return await http.put(`assets/${assetId}/acceptrisk`);
};

export const setInvestigateAsset = async (assetId: string) => {
  return await http.put(`assets/${assetId}/investigate-asset`);
};

export const setManualScan = async (sourceRepoId: string) => {
  return await http.post(`scanneractions/scan-now/${sourceRepoId}`);
};
