import { LoaderFunction } from '@remix-run/node';
import { getPolicyViolationsDetail, getProductsDetail, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { IPolicyViolation, IProducts, PolicyViolationDetails } from '@tauruseer/module';
import { LinkCommonProductStyles } from '@tauruseer/ui';
import { useLoaderData } from 'react-router';
import { checkAuth } from '../../../../auth/auth.service.server';

export const links = () => LinkCommonProductStyles;
export const loader: LoaderFunction = async ({ request, params }) => {
  const { productId, policyViolationId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { data: product } = await getProductsDetail(productId as string);
  const policyViolations = await getPolicyViolationsDetail(`${productId}`, `${policyViolationId}`);
  return { product, policyViolations };
};

export default function PolicyViolationsPage() {
  const { product, policyViolations }: any = useLoaderData();
  return (
    <PolicyViolationDetails
      product={product as IProducts}
      policyViolation={policyViolations as IPolicyViolation}
    />
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
