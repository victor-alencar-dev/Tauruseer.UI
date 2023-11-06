import jwt_decode from 'jwt-decode';
import { Authenticator } from 'remix-auth';
import { Auth0Profile, Auth0Strategy } from 'remix-auth-auth0';
import { sessionStorage } from './session.server';
import { getLoginInformation } from './user-info.server';

type Token = {
  exp: number;
  iat: number;
  iss: string;
};

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
type User = {
  accessToken?: string;
  refreshToken?: string;
  extraParams?: any;
  profile: Auth0Profile;
};

export const authenticator = new Authenticator<User>(sessionStorage);

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: `${process.env['CALLBACKURL']}`,
    clientID: `${process.env['CLIENT_ID']}`,
    scope: 'offline_access',
    clientSecret: `${process.env['CLIENT_SECRET']}`,
    domain: `${process.env['DOMAIN']}`,
    audience: `${process.env['AUDIENCE']}`,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    process.env['TOKEN'] = accessToken;
    process.env['REFRESHTOKEN'] = refreshToken;
    const { exp } = jwt_decode(`${process.env['TOKEN']}`) as Token;
    console.log('login token expire in seconds: ', exp);
    const accountInfo = await getLoginInformation(accessToken);
    const expirationDate = exp;
    const userInfo = accountInfo;
    extraParams = { ...extraParams, expirationDate, userInfo };
    // Get the user data from your DB or API using the tokens and profile
    return { profile, accessToken, extraParams, userInfo };
  },
);

authenticator.use(auth0Strategy);
