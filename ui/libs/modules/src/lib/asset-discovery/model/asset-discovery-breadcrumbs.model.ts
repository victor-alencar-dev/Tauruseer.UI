import { IBreadcrumb } from '@tauruseer/core';

export const assetDetailBreadcrumbs: (assetName: string) => IBreadcrumb[] = (
  assetName: string,
) => [
  { id: 'asset-discovery', text: 'Asset Discovery', to: '/asset-discovery' },
  { id: 'asset-name', text: assetName, to: '/#', disabled: true },
];