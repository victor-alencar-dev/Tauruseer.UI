import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { externalServiceId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);

  return {
    externalServiceId,
  };
};

export default function DataSourcesPage() {
  const { externalServiceId }: any = useLoaderData();
  return (
    <div>
      <h1>Connection - {externalServiceId}</h1>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
