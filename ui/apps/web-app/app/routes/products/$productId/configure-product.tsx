import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getProductsDetail, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { ConfigureProducts } from '@tauruseer/module';
import { LinkConfigureProduct } from '@tauruseer/ui';
import { checkAuth } from '../../../auth/auth.service.server';

export const links = () => LinkConfigureProduct;
export const loader: LoaderFunction = async ({ request, params }) => {
  const { productId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  if (isNaN(parseInt(`${productId}`))) {
    return { name: '', id: '' };
  } else {
    const { data } = await getProductsDetail(`${productId}`);
    return data;
  }
};

export default function ConfigureProduct() {
  const data = useLoaderData();
  return <ConfigureProducts {...data} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
