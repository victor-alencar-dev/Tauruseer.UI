import { Error } from '@tauruseer/core';
import { tokenInterceptor, getExternalServices } from '@tauruseer/api';
import { useLoaderData } from 'react-router';
import { LoaderFunction } from '@remix-run/node';
import { checkAuth } from '../../auth/auth.service.server';
import { DataSourcesPage } from '@tauruseer/module';

export const loader: LoaderFunction = async ({ request }) => {
  const token = await checkAuth(request);
  tokenInterceptor(token);

  const externalServices = await getExternalServices();

  return {
    externalServices: externalServices,
  };
};

export default function DataSourcesRoute() {
  const { externalServices }: any = useLoaderData();
  return <DataSourcesPage externalServices={externalServices} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
