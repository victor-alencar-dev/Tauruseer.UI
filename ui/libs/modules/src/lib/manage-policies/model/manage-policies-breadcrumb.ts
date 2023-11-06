import { IBreadcrumb } from '@tauruseer/core';

export const managePolicyBreadcrumbs = (policyName: string): IBreadcrumb[] => {
  const breadCrumbInfo = [
    { id: 'manage-policies', text: 'Manage Policies', to: '/manage-policies' },
    { id: 'dashboard', text: policyName === '' ? 'New' : policyName, to: '/#', disabled: true },
  ];
  return policyName ? breadCrumbInfo : breadCrumbInfo.filter((b) => b.id !== 'dashboard');
};
export const policyConfigBreadcrumbs = (policyId: string, policyName: string): IBreadcrumb[] => {
  const breadCrumbInfo = [
    { id: 'manage-policies', text: 'Manage Policies', to: '/manage-policies' },
    { id: 'policies-name', to: `/manage-policies/dashboard/${policyId}`, text: policyName },
    { id: 'configure-policies', text: 'Configure Policies', to: '/#', disabled: true },
  ];
  return policyName ? breadCrumbInfo : breadCrumbInfo.filter((b) => b.id !== 'policies-name');
};
