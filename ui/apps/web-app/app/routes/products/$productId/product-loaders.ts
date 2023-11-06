import { LoaderArgs, LoaderFunction } from '@remix-run/node';
import {
  getPrioritizedRiskCharts,
  getPrioritizedRiskTop,
  getVulnerabilitiesRemediation,
  tokenInterceptor,
} from '@tauruseer/api';
import { DETAIL_ACTIONS } from '@tauruseer/module';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';

export const loader: LoaderFunction = async ({ params, request }: LoaderArgs) => {
  const { productId } = params;
  const url = new URL(request.url);
  const option = url.searchParams.get('option');
  const token = await checkAuth(request);
  tokenInterceptor(token);
  if (!option) {
    return { data: [] };
  }
  switch (option) {
    case DETAIL_ACTIONS.PRIORITIZED_RISK: {
      const data = await getPrioritizedRiskTop(`${productId}`);
      return { data };
    }
  }
  switch (option) {
    case DETAIL_ACTIONS.PRIORITIZED_CHARTS: {
      const data = await getPrioritizedRiskCharts(`${productId}`);
      return { data };
    }
  }
  switch (option) {
    case DETAIL_ACTIONS.REMEDIATION: {
      const data = await getVulnerabilitiesRemediation(`${productId}`);
      return { data };
    }
  }
};
