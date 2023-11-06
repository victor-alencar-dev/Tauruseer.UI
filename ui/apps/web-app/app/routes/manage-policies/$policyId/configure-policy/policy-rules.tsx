import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  deleteRule,
  getPolicyRules,
  getTechnologies,
  setNewRule,
  tokenInterceptor,
  updateRule,
} from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { PolicyRules } from '@tauruseer/module';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';

export const action: ActionFunction = async ({ request }) => {
  const params = await request.formData();
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { rule: ruleFormEntry } = Object.fromEntries(params);
  const ruleData = JSON.parse(ruleFormEntry.toString());
  if (ruleData.action === 'create') {
    const { id } = ruleData;
    delete ruleData.id;
    delete ruleData.action;
    const response = await setNewRule(ruleData, id).catch((error) => {
      const { data, status } = error.response;
      return { data, status };
    });
    if (response.status === 400) {
      return { error: response.data };
    }
    if (response.status === 200 || response.status === 204) {
      return { successUpdate: true, message: 'Rule created successfully' };
    }
  }
  if (ruleData.action === 'update') {
    console.log(ruleData);
    const { ruleId, id } = ruleData;
    const payload = {
      ruleResult: ruleData.ruleResult,
      notes: ruleData.notes,
    };
    const response = await updateRule(id, ruleId, payload).catch((error) => {
      const { data, status } = error.response;
      return { data, status };
    });
    if (response.status === 400) {
      return { error: response.data };
    }
    if (response.status === 200 || response.status === 204) {
      return { successUpdate: true, message: 'Rule updated successfully' };
    }
  }
  if (ruleData.action === 'delete') {
    const { ruleId, policyId } = ruleData;
    const response = await deleteRule(policyId, ruleId).catch((error) => {
      const { data, status } = error.response;
      return { data, status };
    });
    if (response.status === 400 || response.status === 404 || response.status === 500) {
      return { error: response.data };
    }
    if (response.status === 200 || response.status === 204) {
      return { success: true, message: 'Rule deleted successfully' };
    }
  }
  return { error: 'Something when wrong' };
};
export const loader: LoaderFunction = async ({ request, params }) => {
  const { policyId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const tech = await getTechnologies();
  const { data } = await getPolicyRules(`${policyId}`);
  return { rules: data, id: policyId, tech: tech.data };
};

export default function PoliciesRules() {
  const { rules, id, tech } = useLoaderData();

  return <PolicyRules rules={rules} ui={id} techList={tech} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
