import { ActionArgs, ActionFunction, LoaderArgs, LoaderFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { setFinishOnboarding, tokenInterceptor } from '@tauruseer/api';
import { DataSourcesMapped } from '@tauruseer/core';
import { OnBoarding } from '@tauruseer/module';
import { LinkOnboarding } from '@tauruseer/ui';
import { OnboardingAction, checkAuth } from '../auth/auth.service.server';
import { commitSession, getSession } from '../auth/session.server';
import { getAccountDataSources } from '../auth/user-info.server';
export const links = () => LinkOnboarding;
export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const headers = new Headers();
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const session = await getSession(request.headers.get('Cookie'));
  const params = await request.formData();
  const { dataSourceToDelete, onboardingEnds } = Object.fromEntries(params);
  if (onboardingEnds) {
    let user = session.get('user');
    let extraParams = user.extraParams;
    let userInfo = extraParams.userInfo;
    await OnboardingAction(request);
    const { data } = await setFinishOnboarding(`${userInfo.accountId}`);
    if (data === 'Ok') {
      return redirect('/onboarding/data-sources/step/3/source/all');
    }
    userInfo = {
      ...userInfo,
      isOnboardingNeeded: false,
    };
    extraParams = {
      ...extraParams,
      userInfo,
    };
    user = {
      ...user,
      extraParams,
    };
    session.set('user', user);
    headers.append('Set-Cookie', await commitSession(session));
    return redirect('/asset-discovery', { headers });
  }
  const dataSources = session.get('dataSources');
  if (!dataSources) {
    return redirect('data-sources/step/1/source/all');
  }
  const removeDataSource = dataSources.filter((ds: string) => ds !== dataSourceToDelete);
  headers.append('Set-Cookie', await commitSession(session));
  if (!removeDataSource.length) {
    return redirect('data-sources/step/1/source/all', { headers });
  }
  if (removeDataSource.length) {
    console.log('data sources left', removeDataSource);
    return redirect('data-sources/step/2/source/all', { headers });
  }
};

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');
  const headers = new Headers();
  const {
    extraParams: { userInfo },
  } = user;
  console.log('isOnboardingNeeded', userInfo.isOnboardingNeeded);
  if (!userInfo.isOnboardingNeeded) {
    return redirect('/asset-discovery');
  }
  const dataSources = session.get('dataSources');
  if (!dataSources) {
    const dt = await getAccountDataSources();
    const dataSourcesMapped = DataSourcesMapped(dt.data);
    session.set('dataSources', dataSourcesMapped);
    headers.append('Set-Cookie', await commitSession(session));
    if (dataSourcesMapped && dataSourcesMapped.length) {
      return redirect('data-sources/step/2/source/all', { headers });
    } else {
      return redirect('/', { headers });
    }
  }
  return { dataSources };
};
export default function Index() {
  const data = useLoaderData();
  const { dataSources } = data;
  return <OnBoarding dataSources={dataSources} />;
}
