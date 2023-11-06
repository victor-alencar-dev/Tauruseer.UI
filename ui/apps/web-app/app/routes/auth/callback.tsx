import type { LoaderFunction } from '@remix-run/node';
import { authenticator } from '../../auth/auth.server';

export const loader: LoaderFunction = ({ request }) => {
  console.log('callback:', request);
  return authenticator.authenticate('auth0', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  });
};
