import { http } from '@tauruseer/api';
import { sbomReportType } from '@tauruseer/module';
export const getProductRepositories = async (productId: string) => {
  const { data } = await http.get(`/products/mapped-repositories/${productId}`);
  return data;
};

export const getSourcesRepoReport = async (sourceId: string) => {
  const { data } = await http.get(`report/source-repo-scans/${sourceId}`);
  return data;
};

export const getVulnerabilitiesReport = async (
  scanId: string,
  page: number | string,
  limit: number | string,
  orderBy: string,
  sort: string,
) => {
  const { data } = await http.get(
    `report/sbom-vulnerabilities-report?RepositoryId=${scanId}&offset=${page}&limit=${limit}&orderby=${orderBy}&sort=${sort}`,
  );
  return data;
};

export const getProductDependency = async (
  productId: string,
  page: number | string,
  limit: number | string,
  orderBy: string,
  sort: string,
) => {
  const { data } = await http.get(
    `report/sbom-vulnerabilities-product-report?ProductId=${productId}&offset=${page}&limit=${limit}&Orderby=${orderBy}&Sort=${sort}`,
  );
  return data;
};
export const setSbomReport = async (
  format: string | undefined | null,
  objectId: string | number | undefined,
  reportType: sbomReportType,
) => {
  const { data } = await http.post(
    `report/sbom-generate-report/${objectId}?format=${format}&objectType=${reportType}`,
  );
  return data;
};
export const getReportHistory = async (
  objectId: string,
  reportType: sbomReportType,
  page: number | string,
  limit: number | string,
  orderBy: string,
  sort: string,
) => {
  const { data } = await http.get(
    `report/sbom-reports-generated/${objectId}?offset=${page}&limit=${limit}&orderby=${orderBy}&sort=${sort}&ReportType=${reportType}`,
  );
  return data;
};

export const getSbomRunningReport = async (
  objectId: string | number | undefined,
  reportType: sbomReportType,
) => {
  const { data } = await http.get(
    `report/sbom-report-in-progress/${objectId}?reportType=${reportType}`,
  );
  return data;
};

export const getURLReport = async (reportId: string | number | undefined | null) => {
  const { data } = await http.get(`report/sbom-report-download/${reportId}`);
  return data;
};
