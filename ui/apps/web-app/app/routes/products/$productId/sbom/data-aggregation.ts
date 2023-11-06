import { LoaderArgs, LoaderFunction } from '@remix-run/node';
import {
  getProductDependency,
  getReportHistory,
  getSbomRunningReport,
  getURLReport,
  setSbomReport,
  tokenInterceptor,
} from '@tauruseer/api';
import { SBOM_REPORT_ACTION, sbomReportType } from '@tauruseer/module';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';

export const loader: LoaderFunction = async ({ params, request }: LoaderArgs) => {
  const { productId } = params;
  const url = new URL(request.url);
  const option = url.searchParams.get('option');
  const page = url.searchParams.get('page');
  const limit = url.searchParams.get('limit');
  const orderBy = url.searchParams.get('orderBy');
  const sort = url.searchParams.get('sort');
  const reportFormat = url.searchParams.get('format');
  const reportId = url.searchParams.get('reportId');
  const reportPage = url.searchParams.get('reportPage') as sbomReportType;
  const objectId = url.searchParams.get('objectId');
  const token = await checkAuth(request);
  const offset = page || 0;
  const pageLimit = limit || 10;
  tokenInterceptor(token);
  if (!option) {
    return { data: [] };
  }
  switch (option) {
    case SBOM_REPORT_ACTION.GET_PRODUCT_DEPENDENCY: {
      const data = await getProductDependency(
        `${productId}`,
        offset,
        pageLimit,
        `${orderBy}`,
        `${sort}`,
      );
      return { data };
    }
    case SBOM_REPORT_ACTION.GET_PRODUCT_REPORT_HISTORY: {
      const data = await getReportHistory(
        `${objectId}`,
        reportPage,
        offset,
        pageLimit,
        `${orderBy}`,
        `${sort}`,
      );
      return { data };
    }
    case SBOM_REPORT_ACTION.GENERATE_NEW_REPORT: {
      const data = await setSbomReport(reportFormat, `${objectId}`, reportPage);
      return { data };
    }
    case SBOM_REPORT_ACTION.GET_REPORT_DOWNLOAD_URL: {
      const data = await getURLReport(reportId);
      return { data };
    }
    case SBOM_REPORT_ACTION.GET_REPORTS_IN_PROCESS: {
      const data = await getSbomRunningReport(`${objectId}`, reportPage);
      return { data };
    }
  }
};
