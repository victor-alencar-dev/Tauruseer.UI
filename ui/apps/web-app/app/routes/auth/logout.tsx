import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { destroySession, getSession } from '../../auth/session.server';
import { authenticator } from '../../auth/auth.server';

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: `${process.env['LOGIN_URL']}` });
};
