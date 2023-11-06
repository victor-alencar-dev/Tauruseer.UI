import { ExternalService } from '@tauruseer/core';

export const modifiers = {
  warning: {
    icon: 'circle-exclamation',
    color: '#FF8A00',
  },
  success: {
    icon: 'circle-check',
    color: '#378632',
  },
  error: {
    icon: 'circle-xmark',
    color: '#DC2626',
  },
  unavailable: {
    icon: 'circle-minus',
    color: '#ACACAC',
  },
};

export const defaultItems: { [a: string]: TSecurityControlItem } = {
  sourceControl: {
    icon: 'circle-minus',
    color: 'rgba(172, 172, 172, 0.70)',
    caption: 'Not Configured',
    category: 'Source Control',
  },
  workTrackingItem: {
    icon: 'circle-minus',
    color: 'rgba(172, 172, 172, 0.70)',
    caption: 'Not Configured',
    category: 'Work Tracking Item',
  },
  cicd: {
    icon: 'circle-minus',
    color: 'rgba(172, 172, 172, 0.70)',
    caption: 'Not Configured',
    category: 'CI/CD',
  },
  sca: {
    icon: ExternalService.DocioScanner,
    color: '#0F0B29',
    caption: 'Not Configured',
    category: 'SCA Scanner',
    modifier: modifiers.unavailable,
  },
  sast: {
    icon: 'circle-minus',
    color: 'rgba(172, 172, 172, 0.70)',
    caption: 'Not Configured',
    category: 'SAST',
  },
  dast: {
    icon: 'circle-minus',
    color: 'rgba(172, 172, 172, 0.70)',
    caption: 'Not Configured',
    category: 'DAST',
  },
  training: {
    icon: 'SecureCodeWarrior',
    color: '#EE9000',
    caption: 'Not Configured',
    category: 'Training',
    modifier: modifiers.unavailable,
    name: 'Secure Code Warrior',
  },
  apiSecurity: {
    icon: 'circle-minus',
    color: 'rgba(172, 172, 172, 0.70)',
    caption: 'Not Configured',
    category: 'API Security',
  },
  waf: {
    icon: 'circle-minus',
    color: 'rgba(172, 172, 172, 0.70)',
    caption: 'Not Configured',
    category: 'WAF',
  },
  cspm: {
    icon: 'circle-minus',
    color: 'rgba(172, 172, 172, 0.70)',
    caption: 'Not Configured',
    category: 'CSPM',
  },
  siem: {
    icon: 'circle-minus',
    color: 'rgba(172, 172, 172, 0.70)',
    caption: 'Not Configured',
    category: 'SIEM',
  },
  iam: {
    icon: 'circle-minus',
    color: 'rgba(172, 172, 172, 0.70)',
    caption: 'Not Configured',
    category: 'IAM',
  },
};
