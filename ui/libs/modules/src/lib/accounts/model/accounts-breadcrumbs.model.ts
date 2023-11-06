import { IBreadcrumb } from '@tauruseer/core';

export const accountConfigureBreadcrumbs: (accountName: string) => IBreadcrumb[] = (
  accountName: string,
) => [
  { id: 'accounts', text: 'Manage Accounts', to: '/accounts' },
  { id: 'account-configure', text: accountName === '' ? 'New Account' : accountName, to: '/#', disabled: true },
];