import { redirect } from '@remix-run/node';
import console from 'console';
import jwt_decode from 'jwt-decode';
import { AuthorizationError } from 'remix-auth';
import { authenticator } from './auth.server';
import { commitSession, destroySession, getSession } from './session.server';

type Token = {
  exp: number;
  iat: number;
  iss: string;
};
export async function checkAuth(request: Request, headers = new Headers()) {
  try {
    const user = await authenticator.isAuthenticated(request);
    const session = await getSession(request.headers.get('Cookie'));
    if (!user) {
      console.info('no valid session redirecting to login ...');
      throw redirect(`${process.env['LOGIN_URL']}`, {
        headers: {
          'Set-Cookie': await destroySession(session),
        },
      });
    }
    const {
      extraParams: { expirationDate, userInfo },
      accessToken,
    } = user;
    console.info('token expire in: ', new Date(expirationDate * 1000).toLocaleString());
    const time = new Date(expirationDate * 1000);
    if (time < new Date()) {
      console.info('token expired...');
      throw redirect(`${process.env['LOGIN_URL']}`, {
        headers: {
          'Set-Cookie': await destroySession(session),
        },
      });
    }
    if (userInfo.isOnboardingNeeded) {
      console.info('is a new user redirecting to onboarding...');
      throw redirect(`${process.env['ONBOARDING']}`);
    }
    return accessToken;
  } catch (error) {
    if (error instanceof AuthorizationError) {
      console.info('requesting new token ...');
      const session = await getSession(request.headers.get('Cookie'));
      let user = session.get('user');
      const { access_token } = await getNewAccessToken(`${process.env['REFRESHTOKEN']}`);
      const { exp } = jwt_decode(access_token) as Token;
      const expirationDate = exp;
      let extraParams = user.extraParams;
      extraParams = {
        ...extraParams,
        expirationDate,
      };
      user = {
        ...user,
        extraParams,
        accessToken: access_token,
      };
      session.set('user', user);
      headers.append('Set-Cookie', await commitSession(session));
      process.env['TOKEN'] = access_token;
      if (request.method === 'GET') {
        console.info('Loader redirecting to requested page ...');
        throw redirect(request.url, { headers });
      }
      console.info('Action return token for any action ...');
      return access_token;
    }
    throw error;
  }
}

export async function getNewAccessToken(refreshToken: string) {
  console.log('getting new token ....');
  const res = await fetch(`https://${process.env['DOMAIN']}/oauth/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: `${process.env['CLIENT_ID']}`,
      client_secret: `${process.env['CLIENT_SECRET']}`,
      refresh_token: refreshToken,
    }),
  });
  const data = await res.json();
  return data;
}

export async function OnboardingAction(request: Request) {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    console.info('no valid session redirecting to login ...');
    throw redirect(`${process.env['LOGIN_URL']}`);
  }
  const {
    accessToken,
    extraParams: { userInfo },
  } = user;
  return { accessToken, userInfo };
}

export async function isOnboardingNeeded(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));
  const {
    extraParams: { userInfo },
  } = session.get('user');
  const { isOnboardingNeeded, fullName, email, accountId, gravatar, isAdmin, accountName } =
    userInfo;
  //TODO: this is just to avoid to show the account management for regular users,
  // change this ASAP when a role strategic implemented
  let accountUrl;
  const showAccountOption = isAdmin;
  const isAccountMaster = accountId === Number(process.env['ADMIN_USER']);

  if (showAccountOption && isAccountMaster) accountUrl = '/accounts';
  if (showAccountOption && !isAccountMaster)
    accountUrl = `/accounts/${accountId}/configure-account/account-details`;

  return {
    isOnboardingNeeded,
    fullName,
    email,
    showAccountOption,
    gravatar,
    accountUrl,
    accountName,
  };
}
//TODO:Changed to a real admin role logic when is ready
export async function isAdminUser(request: Request) {
  const { accountId } = await getAccountId(request);
  return accountId === Number(process.env['ADMIN_USER']);
}

export async function isAccountAdmin(request: Request) {
  const { isAdmin } = await getAccountId(request);
  return isAdmin;
}
export async function getAccountId(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));
  const {
    extraParams: { userInfo },
  } = session.get('user');
  const { accountId, isAdmin } = userInfo;
  return { accountId, isAdmin };
}
