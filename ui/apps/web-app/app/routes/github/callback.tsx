import { LoaderArgs, LoaderFunction, redirect } from '@remix-run/node';
import { setOAuthDataSource, tokenInterceptor } from '@tauruseer/api';
import { OnboardingAction, checkAuth } from '../../auth/auth.service.server';
import { commitSession, getSession } from '../../auth/session.server';

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get('Cookie'));
  const headers = new Headers();
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  await OnboardingAction(request);
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { data } = await setOAuthDataSource(`${code}`, 'Github');

  // We redirect to the data source authentication page
  const redirectUrl = session.get('redirectUrl');

  if (redirectUrl) {
    // we clear the redirect url from the session
    session.unset('redirectUrl');
    headers.append('Set-Cookie', await commitSession(session));
    return redirect(redirectUrl, { headers });
  } else if (data === 'Ok') {
    let dataSources = session.get('dataSources');
    dataSources = [...dataSources, 'Github'];
    session.set('dataSources', dataSources);
    headers.append('Set-Cookie', await commitSession(session));

    return redirect('/onboarding/data-sources/step/2/source/Github', { headers });
  } else {
    return redirect('/onboarding/data-sources/step/1/source/all');
  }
};
