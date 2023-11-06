import { LoaderArgs, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getProductRepositories, getProductsDetail, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { SbomReport } from '@tauruseer/module';
import { LinkSBOMProduct, MetaProductList } from '@tauruseer/ui';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';

export const meta = () => MetaProductList;
export const links = () => LinkSBOMProduct;
export const loader: LoaderFunction = async ({ request, params }: LoaderArgs) => {
  const { productId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { data } = await getProductsDetail(`${productId}`);
  const repositories = await getProductRepositories(`${productId}`);
  return { data, repositories };
};

export default function Index() {
  const { data, repositories } = useLoaderData();
  const p = { id: data.id, name: data.name };

  return (
    <>
      <SbomReport mappedAsset={repositories.data} product={p} />
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
