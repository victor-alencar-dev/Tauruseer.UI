import type { LoaderFunction } from '@remix-run/node';
import { Error } from '@tauruseer/core';
import { authenticator } from '../auth/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  return authenticator.authenticate('auth0', request, {
    successRedirect: '/asset-discovery',
    failureRedirect: '/auth/auth0?prompt=login',
  });
};

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
