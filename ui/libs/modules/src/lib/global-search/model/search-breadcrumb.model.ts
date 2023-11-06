import { IBreadcrumb } from '@tauruseer/core';

export const SearchDetailBreadcrumbs = (searchDetail: string): IBreadcrumb[] => {
  return [
    { id: 'search', text: 'Search', to: '/#', disabled: true },
    { id: 'search-name', text: searchDetail, to: '/#', disabled: true },
  ];
};
