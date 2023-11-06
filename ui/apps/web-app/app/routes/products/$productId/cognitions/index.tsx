import { LoaderFunction } from '@remix-run/node';
import { getCognitionsByProductId, getProductsDetail, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { Cognitions, ICognition, IProducts } from '@tauruseer/module';
import { LinkCommonProductStyles } from '@tauruseer/ui';
import { useLoaderData } from 'react-router';
import { checkAuth } from '../../../../auth/auth.service.server';

export const links = () => LinkCommonProductStyles;
export const loader: LoaderFunction = async ({ request, params }) => {
  const { productId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { data: product } = await getProductsDetail(productId as string);
  const cognitions: ICognition[] = await getCognitionsByProductId(productId as string);
  return { product, cognitions };
};

export default function CognitionsPage() {
  const { product, cognitions }: any = useLoaderData();
  return <Cognitions product={product as IProducts} cognitions={cognitions} />;
}
export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
