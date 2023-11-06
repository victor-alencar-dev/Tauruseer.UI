import { LoaderArgs, LoaderFunction } from '@remix-run/node';
import { getSourcesRepoReport, getVulnerabilitiesReport, tokenInterceptor } from '@tauruseer/api';
import { SBOM_REPORT_ACTION } from '@tauruseer/module';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';

export const loader: LoaderFunction = async ({ params, request }: LoaderArgs) => {
  const { assetId, productId } = params;
  const url = new URL(request.url);
  const option = url.searchParams.get('option');
  const page = url.searchParams.get('page');
  const limit = url.searchParams.get('limit');
  const orderBy = url.searchParams.get('orderBy');
  const sort = url.searchParams.get('sort');
  const token = await checkAuth(request);
  tokenInterceptor(token);
  if (!option) {
    return { data: [] };
  }
  switch (option) {
    case SBOM_REPORT_ACTION.GET_REPORT_LIST: {
      const { data } = await getSourcesRepoReport(`${assetId}`);
      return { data };
    }
    case SBOM_REPORT_ACTION.GET_DEPENDENCY_LIST: {
      const offset = page || 0;
      const pageLimit = limit || 10;
      const data = await getVulnerabilitiesReport(
        `${assetId}`,
        offset,
        pageLimit,
        `${orderBy}`,
        `${sort}`,
      );
      return { data };
    }
  }
};
