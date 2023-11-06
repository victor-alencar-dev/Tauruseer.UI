import { LoaderArgs, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  getPolicyConditions,
  getPolicyDetail,
  getPolicyRules,
  getTimeline,
  tokenInterceptor,
} from '@tauruseer/api';
import { Error, ReferenceTypes } from '@tauruseer/core';
import { ManagePoliciesForm } from '@tauruseer/module';
import { LinkManagePolicies } from '@tauruseer/ui';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';

export const links = () => LinkManagePolicies;
export const loader: LoaderFunction = async ({ request, params: { policyId } }: LoaderArgs) => {
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const detail = await getPolicyDetail(`${policyId}`);
  const conditions = await getPolicyConditions(`${policyId}`);
  const rules = await getPolicyRules(`${policyId}`);
  const trace = await getTimeline(`${policyId}`, ReferenceTypes.PolicyId);
  return {
    policy: detail.data,
    conditions: conditions.data,
    rules: rules.data,
    traceability: trace,
  };
};

export default function ManagePolicy() {
  const { policy, conditions, rules, traceability } = useLoaderData();
  return (
    <ManagePoliciesForm
      policy={policy}
      conditions={conditions}
      rules={rules}
      traceability={traceability}
    />
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
