import { LoaderFunction } from '@remix-run/node';
import {
  getVulnerabilitiesAIRemediation,
  getVulnerabilitiesDetail,
  tokenInterceptor,
} from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { SearchDetails } from '@tauruseer/module';
import { LinkCommonProductStyles, LinkVulnerabilityRemediation } from '@tauruseer/ui';
import { useLoaderData } from 'react-router';
import { checkAuth } from '../../auth/auth.service.server';

export const links = () => [...LinkVulnerabilityRemediation, ...LinkCommonProductStyles];

export const loader: LoaderFunction = async ({ request, params }) => {
  const { result } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const vulnerability = await getVulnerabilitiesDetail(`${result}`);
  const aiRemediation = result
    ? await getVulnerabilitiesAIRemediation(result, 'Dependency', true, 'javascript')
    : null;
  return { vulnerability, aiRemediation };
};

export default function SearchPage() {
  const { vulnerability, aiRemediation }: any = useLoaderData();
  const { affectedProducts } = vulnerability;
  return (
    <SearchDetails
      vulnerability={vulnerability}
      affectedProducts={affectedProducts}
      aiRemediation={aiRemediation ? aiRemediation[0] : null}
    />
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
