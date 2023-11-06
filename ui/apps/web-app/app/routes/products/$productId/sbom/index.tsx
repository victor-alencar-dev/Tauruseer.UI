import { LoaderArgs, LoaderFunction, redirect } from '@remix-run/node';
import { Error } from '@tauruseer/core';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  await checkAuth(request);
  return redirect('product-aggregated');
};

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
