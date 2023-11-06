import { Breadcrumbs, IBreadcrumb } from '@tauruseer/core';
import ProductDetailHeader from 'libs/modules/src/lib/products/components/detail-header/product-detail-header';
import { IProducts } from 'libs/modules/src/lib/products/model/product.interface';

export interface ProductDataGridPageProps {
  breadcrumbData: IBreadcrumb[];
  product: IProducts;
  children: React.ReactNode;
}

// children is the header + data grid
export const ProductDataGridPage = ({
  breadcrumbData,
  product,
  children,
}: ProductDataGridPageProps) => {
  return (
    <div className="mb-2">
      <Breadcrumbs data={breadcrumbData} />

      <ProductDetailHeader {...product} />

      {children}
    </div>
  );
};
