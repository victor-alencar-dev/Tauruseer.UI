// Prioritized Risk Original Code

import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPrioritizedRisk, getProductsDetail, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { PrioritizedRisks } from '@tauruseer/module';
import { LinkPrioritizedRisk } from '@tauruseer/ui';
import { checkAuth } from '../../../auth/auth.service.server';

export const links = () => LinkPrioritizedRisk;

export const loader: LoaderFunction = async ({ request, params }) => {
  const { productId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { data: product } = await getProductsDetail(`${productId}`);
  const prioritizedRisk = await getPrioritizedRisk(`${productId}`, 0);
  return { prioritizedRisk, product };
};

export default function PrioritizedRisksData() {
  const { prioritizedRisk, product } = useLoaderData();
  return <PrioritizedRisks prioritizedRisk={prioritizedRisk} productDetail={product} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
