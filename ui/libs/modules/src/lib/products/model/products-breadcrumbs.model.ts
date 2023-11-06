import { IBreadcrumb } from '@tauruseer/core';

export const productDetailBreadcrumbs: (productName: string) => IBreadcrumb[] = (
  productName: string,
) => [
  { id: 'products', text: 'Products', to: '/products' },
  { id: 'product-name', text: productName, to: '/#', disabled: true },
];

export const productConfigBreadcrumbs = (productId: string, productName: string): IBreadcrumb[] => {
  const breadCrumbInfo = [
    { id: 'products', text: 'Products', to: '/products' },
    { id: 'product-name', to: `/products/${productId}/detail`, text: productName },
    { id: 'configure-product', text: 'Configure Product', to: '/#', disabled: true },
  ];
  return productName ? breadCrumbInfo : breadCrumbInfo.filter((b) => b.id !== 'product-name');
};

export const productSbomBreadcrumbs = (productId: string, productName: string): IBreadcrumb[] => {
  const breadCrumbInfo = [
    { id: 'products', text: 'Products', to: '/products' },
    { id: 'product-name', to: `/products/${productId}/detail`, text: productName },
    { id: 'configure-product', text: 'SBOM Reports', to: '/#', disabled: true },
  ];
  return productName ? breadCrumbInfo : breadCrumbInfo.filter((b) => b.id !== 'product-name');
};
