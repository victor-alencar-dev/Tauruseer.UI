import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPolicyConditions, setConditionsPolicy, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { PolicyConditions } from '@tauruseer/module';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';

export const action: ActionFunction = async ({ request }) => {
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const params = await request.formData();
  const { policyConditions: policyConditionsFormEntry } = Object.fromEntries(params);
  if (policyConditionsFormEntry) {
    const conditionsData = JSON.parse(policyConditionsFormEntry.toString());

    const response = await setConditionsPolicy(conditionsData).catch((error) => {
      const { data, status } = error.response;
      return { data, status };
    });
    if (response.status === 400) {
      return { error: response.data };
    }
    if (response.status === 200) {
      return { successUpdate: true, message: 'Conditions updated successfully' };
    }
  }
  return { error: 'Something when wrong' };
};
export const loader: LoaderFunction = async ({ request, params }) => {
  const { policyId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { data } = await getPolicyConditions(`${policyId}`);
  return { conditions: data, id: policyId };
};

export default function PoliciesConditions() {
  const data = useLoaderData();
  return <PolicyConditions {...data} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
