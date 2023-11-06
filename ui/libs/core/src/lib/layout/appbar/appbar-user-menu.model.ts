import { FormMethod } from '@remix-run/react';

export interface IMenuOption {
  key: string;
  name: string;
  iconClass: string;
  action: {
    method: FormMethod;
    url: string;
  };
}

export interface IAppBarUserMenuProps {
  userName?: string;
  onboardingCompleted?: boolean;
  email?: string;
  imgSrc?: string;
  gravatar?: string;
}

export const menuOptions: Array<IMenuOption> = [
  {
    key: 'accounts',
    name: 'Account Management',
    iconClass: 'k-icon k-i-user',
    action: {
      method: 'get',
      url: '/accounts',
    },
  },
  {
    key: 'managePolicies',
    name: 'Manage Policies',
    iconClass: 'k-icon k-i-track-changes-enable',
    action: {
      method: 'get',
      url: '/manage-policies',
    },
  },
  {
    key: 'manageCognitions',
    name: 'Manage Cognitions',
    iconClass: 'fa-light fa-lightbulb-gear',
    action: {
      method: 'get',
      url: '/manage-cognitions',
    },
  },
  {
    key: 'datasources',
    name: 'Data Sources',
    iconClass: 'fa fa-database',
    action: {
      method: 'get',
      url: '/datasources',
    },
  },
  {
    key: 'logout',
    name: 'Logout',
    iconClass: 'k-icon k-i-logout',
    action: {
      method: 'post',
      url: '/auth/logout',
    },
  },
];
