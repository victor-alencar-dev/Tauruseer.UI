import { ActionArgs, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getCognitionsList, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { ManageCognitions } from '@tauruseer/module';
import { LinkManageCognitions, MetaManageCognitions } from '@tauruseer/ui';
import { checkAuth } from '../../auth/auth.service.server';
export const links = () => LinkManageCognitions;
export const meta = () => MetaManageCognitions;

export const loader: LoaderFunction = async ({ request }: ActionArgs) => {
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { data } = await getCognitionsList();
  return { response: data };
};

export default function Index() {
  const { response } = useLoaderData();
  return <ManageCognitions cognitionsList={response} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
