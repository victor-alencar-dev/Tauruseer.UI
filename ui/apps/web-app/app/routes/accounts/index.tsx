import { LoaderArgs, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getAccountsList, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { Accounts } from '@tauruseer/module';
import { checkAuth, isAdminUser } from '../../auth/auth.service.server';

export function meta() {
  return { title: 'Accounts' };
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const token = await checkAuth(request);
  tokenInterceptor(token);
  //Check is an admin user
  const isAdmin = await isAdminUser(request);
  if (!isAdmin) throw new Response('', { status: 404 });
  const { data } = await getAccountsList();
  return data;
};

export default function Index() {
  const data = useLoaderData();
  return (
    <>
      <Accounts data={data} />
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
