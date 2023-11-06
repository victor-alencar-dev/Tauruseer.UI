import { LoaderArgs, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getProductsList, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { Products } from '@tauruseer/module';
import { LinkProductList, MetaProductList } from '@tauruseer/ui';
import { checkAuth } from '../../auth/auth.service.server';

export const meta = () => MetaProductList;
export const links = () => LinkProductList;
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { data } = await getProductsList();

  return data;
};

export default function Index() {
  const data = useLoaderData();
  return (
    <>
      <Products data={data} />
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
