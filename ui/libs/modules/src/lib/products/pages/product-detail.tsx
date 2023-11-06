import { Breadcrumbs, ITimeLine, TimeLine, getActualDeviceRes } from '@tauruseer/core';
import { IProducts, productDetailBreadcrumbs } from '@tauruseer/module';
import { useEffect } from 'react';
import ProductDetailHeader from '../components/detail-header/product-detail-header';
import { InfoCards } from '../components/product-detail/info-cards/info-cards.component';
import { PrioritizedRisk } from '../components/product-detail/prioritized-risk/prioritized-risk.component';

import ProductSecurityControl from '../components/security-controls/product-security-control.component';
import { ProductStore } from '../state/product-storage';

import RepositoriesCard from '../components/product-detail/repositories/repositories.component';

export interface IProductDetailProps {
  product: IProducts;
  securityControls: any;
  cognitionCount: number;
  vulnerabilityCount: number;
  codeVulnerabilityCount: number;
  policyViolationsSummary: any;
  repositories: any;
  timeLine: ITimeLine;
}

export const ProductDetail = ({
  product,
  securityControls,
  cognitionCount,
  vulnerabilityCount,
  policyViolationsSummary,
  timeLine,
  codeVulnerabilityCount,
  repositories,
}: IProductDetailProps) => {
  const device = getActualDeviceRes();
  const store = ProductStore((state) => state);

  useEffect(() => {
    store.setProductId(product.id);
  }, []);

  return (
    <div className="product-detail">
      <div className="d-flex align-items-center justify-content-between">
        <Breadcrumbs data={productDetailBreadcrumbs(`${product.name}`)} className="mt-2 mb-3" />
      </div>

      <ProductDetailHeader {...product} />

      <div className="product-detail__grid-row-1">
        <div className="card card-content product-detail__grid--security-controls">
          <ProductSecurityControl
            securityControlsElements={securityControls}
            repositories={repositories}
            productId={product.id}
          />
        </div>
        <div
          className="card card-content product-detail__grid--repositories"
          style={{ height: 'inherit' }}
        >
          <RepositoriesCard repositories={repositories} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex" style={{ gap: '11px' }}>
          <InfoCards
            product={product}
            policyViolationsSummary={policyViolationsSummary}
            cognitionCount={cognitionCount}
            vulnerabilityCount={vulnerabilityCount}
            codeVulnerabilityCount={codeVulnerabilityCount}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 ">
          <PrioritizedRisk />
        </div>
      </div>

      <TimeLine data={timeLine} />
    </div>
  );
};
export default ProductDetail;
