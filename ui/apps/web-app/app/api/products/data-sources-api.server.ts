import {
  IExternalService,
  IDataSourceMappedAsset,
  IDataSourceUnmappedAsset,
  IUnmappedWorkTrackingProject,
  IWorkTrackingTool,
  IUnmappedCodeAnalysisProject,
} from '@tauruseer/module';
import { http } from '../fetch-client.server';

export const getExternalServices: () => Promise<IExternalService[]> = async () => {
  const { data: externalServices }: { data: IExternalService[] } = await http.get(`oauth/getall`);
  return externalServices;
};

// Mapped Assets
export const getMappedAssets: (
  productId: string,
  externalServiceId: string,
  service?: string,
) => Promise<IDataSourceMappedAsset[]> = async (productId, externalServiceId, service) => {
  const query = service ? `?service=${service}` : '';
  const { data: mappedAssets }: { data: IDataSourceMappedAsset[] } = await http.get(
    `products/mapped-assets/${productId}/${externalServiceId}${query}`,
  );

  return mappedAssets;
};

// Unmapped assets
// Repositories
export const getUnmappedSourceRepositories: () => Promise<
  IDataSourceUnmappedAsset[]
> = async () => {
  const { data: unmappedSourceRepositories }: { data: IDataSourceUnmappedAsset[] } = await http.get(
    `products/unmapped-source-repos`,
  );

  return unmappedSourceRepositories;
};

// Work tracking projects
export const getUnmappedWorkTrackingProjects: () => Promise<
  IUnmappedWorkTrackingProject[]
> = async () => {
  const { data: unmappedWorkTrackingProjects }: { data: IUnmappedWorkTrackingProject[] } =
    await http.get(`products/unmapped-worktracking-projects`);

  return unmappedWorkTrackingProjects;
};

// Code analysis projects
export const getUnmappedCodeAnalysisProjects: () => Promise<
  IUnmappedCodeAnalysisProject[]
> = async () => {
  const { data: unmappedCodeAnalysisProject }: { data: IUnmappedCodeAnalysisProject[] } =
    await http.get(`products/unmapped-codeanalysis-projects`);

  return unmappedCodeAnalysisProject;
};

// Map asset to project
export const mapRepositoryToProduct: (
  assetId: string,
  productId: string,
  syncWorkItems: boolean,
) => Promise<null> = async (assetId, productId, syncWorkItems) => {
  try {
    await http.post(
      `assets/${assetId}/map-product`,
      JSON.stringify({ productId: Number(productId), syncWorkItems }),
    );
  } catch (e) {
    console.error(e);
  }

  return null;
};

export const mapMultipleRepositoriesToProduct: (
  assetIds: string[],
  productId: string,
  syncWorkItems: boolean,
) => Promise<{ success: boolean; message: string }> = async (
  assetIds,
  productId,
  syncWorkItems,
) => {
  try {
    await http.post(
      `assets/map-multiple-to-product`,
      JSON.stringify({ assetIdList: assetIds, productId: Number(productId), syncWorkItems }),
    );
    return { success: true, message: 'Repositories mapped successfully' };
  } catch (e) {
    console.error(e);
    return { success: false, message: 'Error mapping repositories' };
  }
};

export const mapWorkTrackingProjectToProduct: (
  assetId: string,
  productId: string,
  syncWorkItems: boolean,
) => Promise<null> = async (assetId, productId, syncWorkItems) => {
  try {
    await http.post(
      `assets/${assetId}/map-worktrackingproject-product`,
      JSON.stringify({ productId: Number(productId), syncWorkItems }),
    );
  } catch (e) {
    console.error(e);
  }

  return null;
};

export const mapMultipleWorkTrackingProjectsToProduct: (
  assetIds: string[],
  productId: string,
  syncWorkItems: boolean,
) => Promise<{ success: boolean; message: string }> = async (
  assetIds,
  productId,
  syncWorkItems,
) => {
  try {
    await http.post(
      `assets/map-multiple-worktrackingprojects-to-product`,
      JSON.stringify({ assetIdList: assetIds, productId: Number(productId), syncWorkItems }),
    );
    return { success: true, message: 'Work tracking projects mapped successfully' };
  } catch (e) {
    console.error(e);
    return { success: false, message: 'Error mapping work tracking projects' };
  }
};

export const mapMultipleCodeAnalysisProjectsToProduct: (
  assetIds: string[],
  productId: string,
  syncWorkItems: boolean,
) => Promise<{ success: boolean; message: string }> = async (
  assetIds,
  productId,
  syncWorkItems,
) => {
  try {
    await http.post(
      `assets/map-multiple-codeanalysisprojects-to-product`,
      JSON.stringify({ assetIdList: assetIds, productId: Number(productId), syncWorkItems }),
    );
    return { success: true, message: 'Code projects mapped successfully' };
  } catch (e) {
    console.error(e);
    return { success: false, message: 'Error mapping code projects' };
  }
};

export const updateAssetMapping: (
  assetId: string,
  syncWorkItems: boolean,
) => Promise<null> = async (assetId, syncWorkItems) => {
  try {
    await http.post(
      `work-items/asset/${assetId}/synchronization`,
      JSON.stringify({ syncWorkItems }),
    );
  } catch (e) {
    console.error(e);
  }

  return null;
};

export const getWorkTrackingToolsPerProduct: (
  productId: string,
) => Promise<IWorkTrackingTool[]> = async (productId) => {
  const { data: workTrackingTools }: { data: IWorkTrackingTool[] } = await http.get(
    `work-items/${productId}/tool-list`,
  );

  return workTrackingTools;
};

export const addBitbucketPersonalToken: (
  baseUrl: string,
  personalAccessToken: string,
  userName?: string,
  expireDate?: string,
) => Promise<null> = async (baseUrl, personalAccessToken, userName, expireDate) => {
  const queryParams = new URLSearchParams({
    baseUrl,
    personalAccessToken,
    ...(userName && { userName }),
    ...(expireDate && { expireDate }),
  });

  let res;

  try {
    res = (await http.post(`oauth/addbitbucketpersonaltoken?${queryParams.toString()}`)).data();
  } catch (e) {
    res = { error: e };
    console.error('ERROR', e);
  }

  return res;
};

export const addSonarQubePersonalToken: (
  baseUrl: string,
  personalAccessToken: string,
  expireDate?: string,
) => Promise<null> = async (baseUrl, personalAccessToken, expireDate) => {
  const queryParams = new URLSearchParams({
    baseUrl,
    personalAccessToken,
    ...(expireDate && { expireDate }),
  });

  let res;

  try {
    res = (await http.post(`oauth/addsonarqubepersonaltoken?${queryParams.toString()}`)).data();
  } catch (e) {
    res = { error: e };
    console.error('ERROR', e);
  }

  return res;
};

export const deleteDataSource: (uniqueId: string) => Promise<null> = async (uniqueId) => {
  try {
    await http.post(`oauth/deleteDataSource/`, JSON.stringify(uniqueId));
  } catch (e) {
    console.error(e);
  }

  return null;
};
