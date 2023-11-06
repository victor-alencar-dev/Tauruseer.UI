import { authenticator } from '../../auth/auth.server';

import { ActionArgs, LoaderFunction, redirect } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }: ActionArgs) => {
  const hasData = await authenticator.authenticate('auth0', request);
  if (hasData) {
    return redirect('/asset-discovery');
  }
  return authenticator.authenticate('auth0', request);
};
