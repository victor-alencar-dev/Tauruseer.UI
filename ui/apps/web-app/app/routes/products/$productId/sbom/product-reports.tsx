import { LoaderArgs, LoaderFunction } from '@remix-run/node';
import { Error } from '@tauruseer/core';
import { SbomProductAggregated } from '@tauruseer/module';
import { MetaProductList } from '@tauruseer/ui';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';

export const meta = () => MetaProductList;
export const loader: LoaderFunction = async ({ request, params }: LoaderArgs) => {
  const { productId } = params;
  await checkAuth(request);
  return productId;
};
export default function Index() {
  return (
    <>
      <SbomProductAggregated currentReports={[]} sbomReport="SbomRepository" />
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
