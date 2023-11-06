import { LoaderFunction } from '@remix-run/node';
import { getPolicyViolations, getProductsDetail, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { IPolicyViolation, IProducts, PolicyViolations } from '@tauruseer/module';
import { LinkCommonProductStyles } from '@tauruseer/ui';
import { useLoaderData } from 'react-router';
import { checkAuth } from '../../../../auth/auth.service.server';

export const links = () => LinkCommonProductStyles;
export const loader: LoaderFunction = async ({ request, params }) => {
  const { productId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { data: product } = await getProductsDetail(`${productId}`);
  const policyViolations = await getPolicyViolations(`${productId}`);
  return { product, policyViolations };
};

export default function PolicyViolationsPage() {
  const { product, policyViolations }: any = useLoaderData();
  return (
    <PolicyViolations
      product={product as IProducts}
      policyViolations={policyViolations as IPolicyViolation[]}
    />
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
