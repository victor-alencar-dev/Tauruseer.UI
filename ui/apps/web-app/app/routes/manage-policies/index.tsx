import { ActionArgs, ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { createPolicy, getPoliciesList, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { ManagePolicies, Policy } from '@tauruseer/module';
import { LinkManagePolicies, MetaManagePolicies } from '@tauruseer/ui';
import { checkAuth } from '../../auth/auth.service.server';
export const links = () => LinkManagePolicies;
export const meta = () => MetaManagePolicies;
export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const params = await request.formData();
  const req = Object.fromEntries(params);
  const { action, policy: policyReq } = req;
  if (action === 'create-policy') {
    const policy = JSON.parse(policyReq.toString());
    try {
      const response = await createPolicy(policy);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    return redirect('/manage-policies');
  }
  return {};
};

export const loader: LoaderFunction = async ({ request }: ActionArgs) => {
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const response = await getPoliciesList();
  return response.data.map((policy: Policy) => ({
    ...policy,
    rules: 0,
    matchingProducts: 0,
  }));
};

export default function Index() {
  const data = useLoaderData();
  return <ManagePolicies data={data} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
