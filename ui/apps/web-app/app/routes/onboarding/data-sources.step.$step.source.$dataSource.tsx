import { ActionArgs, ActionFunction, LoaderArgs, LoaderFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getDataSourceReDirectionLink, tokenInterceptor } from '@tauruseer/api';
import { OnBoardingDataSources } from '@tauruseer/module';
import { OnboardingAction, checkAuth } from '../../auth/auth.service.server';
import { getSession } from '../../auth/session.server';

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const params = await request.formData();
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { dataSource } = Object.fromEntries(params);
  await OnboardingAction(request);
  const { data } = await getDataSourceReDirectionLink(`${dataSource}`);
  return redirect(data);
};

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get('Cookie'));
  return session.get('dataSources');
};
export default function Index() {
  const data = useLoaderData();
  return <OnBoardingDataSources dataSources={data} />;
}
