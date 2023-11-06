import { IBreadcrumb } from '@tauruseer/core';
import { IHeaderButton, IPolicyViolation, IProducts } from '@tauruseer/module';
export const mainPageButtonsIndicator: Array<{ title: string; hasIndicator: boolean }> = [
  { title: 'New', hasIndicator: true },
  { title: 'In Progress', hasIndicator: true },
  { title: 'Risk Accepted', hasIndicator: true },
];
export enum PolicyViolationsStatus {
  New = 0,
  Active = 1,
  Dismissed = 2,
}
export const policyViolationsBreadcrumbData: (product: IProducts) => IBreadcrumb[] = (
  product: IProducts,
) => [
  { id: 'products', text: 'Products', to: '/products' },
  { id: 'product-name', to: `/products/detail/${product.id}`, text: product.name },
  { id: 'policy-violations', text: 'Policy Violations', to: '/#', disabled: true },
];

export const policyViolationDetailsBreadcrumbData: (
  product: IProducts,
  policyViolation: IPolicyViolation,
) => IBreadcrumb[] = (product: IProducts, policyViolation: IPolicyViolation) => [
  { id: 'products', text: 'Products', to: '/products' },
  { id: 'product-name', to: `/products/${product.id}/detail/`, text: product.name as string },
  {
    id: 'policy-violations',
    text: 'Policy Violations',
    to: `/products/${product.id}/policy-violations`,
  },
  {
    id: 'policy-violations-name',
    text: policyViolation.policyName as string,
    to: '/#',
    disabled: true,
  },
];
export const policyViolationsHeaderButtons: IHeaderButton[] = [
  { title: 'New', hasIndicator: true },
  { title: 'In Progress', hasIndicator: true },
  { title: 'Risk Accepted', hasIndicator: true },
];
