import { LoaderArgs, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSbomRunningReport } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { SbomProductAggregated } from '@tauruseer/module';
import { MetaProductList } from '@tauruseer/ui';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';

export const meta = () => MetaProductList;
export const loader: LoaderFunction = async ({ request, params }: LoaderArgs) => {
  const { productId } = params;
  await checkAuth(request);
  const currentReports = await getSbomRunningReport(productId, 'SbomProduct');
  return { currentReports };
};
export default function Index() {
  const { currentReports } = useLoaderData();
  return (
    <>
      <SbomProductAggregated currentReports={currentReports.data} sbomReport="SbomProduct" />
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
