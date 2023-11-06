import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { createPolicy, getPolicyDetail, setPolicyDetail, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { PolicyDetail } from '@tauruseer/module';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';
import validator from 'validator';

const saveActionMethod = async (payload: any) => {
  let response;
  if (payload?.uniqueId) {
    response = await setPolicyDetail(payload).catch((error) => {
      const { data, status } = error.response;
      return { data, status };
    });
  } else {
    response = await createPolicy(payload).catch((error) => {
      const { data, status } = error.response;
      return { data, status };
    });
  }
  return response;
};
export const action: ActionFunction = async ({ request }) => {
  const params = await request.formData();
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { policy: policyFormEntry } = Object.fromEntries(params);
  const policyData = JSON.parse(policyFormEntry.toString());
  if (policyData) {
    const response = await saveActionMethod(policyData);

    if (response.status === 400 || response.status === 500) {
      return { error: response.data };
    }
    if (policyData.uniqueId) {
      return { successUpdate: true, message: 'Policy updated successfully' };
    } else {
      const uniqueId = await response.data;
      return { successCreated: true, message: 'Policy created successfully', uniqueId };
    }
  }
  return { policyFormEntry };
};
export const loader: LoaderFunction = async ({ request, params }) => {
  const { policyId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  if (!validator.isUUID(`${policyId}`)) {
    return { name: '' };
  } else {
    const { data } = await getPolicyDetail(`${policyId}`);
    return data;
  }
};
export default function PoliciesDetails() {
  const data = useLoaderData();
  return <PolicyDetail isNew={Boolean(data.name)} policy={data} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
