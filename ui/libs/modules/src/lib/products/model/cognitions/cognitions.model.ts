import { IBreadcrumb } from '@tauruseer/core';
import { ICognitionDetails, IHeaderButton, IProducts } from '@tauruseer/module';

export enum CognitionStatus {
  Active = 1,
  UserDismissed = 2,
  AutoDismissed = 3,
}

export enum CognitionSeverity {
  None = 0,
  Critical = 1,
  Warning = 2,
  Notice = 3,
  Information = 4,
}

export enum CognitionCategories {
  SDLCIntel = 0,
  ThreatIntel = 1,
  Economics = 2,
  Sourcing = 3,
  Governance = 4,
}

export enum CognitionsStatus {
  New = 0,
  Active = 1,
}

export const cognitionsBreadcrumbData: (product: IProducts) => IBreadcrumb[] = (
  product: IProducts,
) => [
  { id: 'products', text: 'Products', to: '/products' },
  { id: 'product-name', to: `/products/${product.id}/detail`, text: product.name },
  { id: 'cognitions', text: 'Cognitions', to: '/#', disabled: true },
];

export const cognitionsHeaderButtons: IHeaderButton[] = [
  { title: 'New', hasIndicator: true },
  { title: 'In Progress', hasIndicator: true },
  { title: 'Risk Accepted', hasIndicator: true },
];

export const cognitionDetailsBreadcrumbData: (
  product: IProducts,
  cognition: ICognitionDetails,
) => IBreadcrumb[] = (product: IProducts, cognition: ICognitionDetails) => [
  { id: 'products', text: 'Products', to: '/products' },
  { id: 'product-name', to: `/products/${product.id}/detail/`, text: product.name as string },
  {
    id: 'cognitions',
    text: 'Cognitions',
    to: `/products/${product.id}/cognitions`,
  },
  {
    id: 'cognitions-name',
    text: cognition.insightTypeName as string,
    to: '/#',
    disabled: true,
  },
];

export const severityNames: Record<CognitionSeverity, string> = {
  [CognitionSeverity.None]: 'None',
  [CognitionSeverity.Critical]: 'Critical',
  [CognitionSeverity.Warning]: 'Warning',
  [CognitionSeverity.Notice]: 'Notice',
  [CognitionSeverity.Information]: 'Information',
};

export const severityChipTypes: Record<CognitionSeverity, string> = {
  [CognitionSeverity.None]: 'secondary',
  [CognitionSeverity.Critical]: 'danger',
  [CognitionSeverity.Warning]: 'warning',
  [CognitionSeverity.Notice]: 'info',
  [CognitionSeverity.Information]: 'primary',
};

export const categoryNames: Record<CognitionCategories, string> = {
  [CognitionCategories.SDLCIntel]: 'SDLC Intelligence',
  [CognitionCategories.ThreatIntel]: 'Threat Intelligence',
  [CognitionCategories.Economics]: 'Economics',
  [CognitionCategories.Sourcing]: 'Sourcing',
  [CognitionCategories.Governance]: 'Governance',
};
