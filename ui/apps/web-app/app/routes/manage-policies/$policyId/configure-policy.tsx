import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPolicyDetail, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { ConfigurePolicy } from '@tauruseer/module';
import validator from 'validator';
import { checkAuth } from '../../../auth/auth.service.server';
import configureProduct from '../../../styles/modules/products/configure-product.css';
import styleDetail from '../../../styles/modules/products/detail.css';

export function links() {
  return [
    { rel: 'stylesheet', href: styleDetail },
    { rel: 'stylesheet', href: configureProduct },
  ];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { policyId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  if (!validator.isUUID(`${policyId}`)) {
    return { name: '', uniqueId: '' };
  } else {
    const { data } = await getPolicyDetail(`${policyId}`);
    return data;
  }
};

export default function ConfigurePolicies() {
  const data = useLoaderData();
  return <ConfigurePolicy {...data} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
