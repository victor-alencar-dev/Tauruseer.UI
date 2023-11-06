import { ProductDataGridPage } from '@tauruseer/core';
import {
  IPolicyViolation,
  IProducts,
  policyViolationDetailsBreadcrumbData,
} from '@tauruseer/module';
import { useEffect, useRef, useState } from 'react';
import PolicyViolationActionCard from '../components/policy-violations/detail/policy-violation.action-card';
import PolicyViolationInfoCard from '../components/policy-violations/detail/policy-violation.info-card';

export interface PolicyViolationsProps {
  product: IProducts;
  policyViolation: IPolicyViolation;
}

export const PolicyViolationDetails = ({ product, policyViolation }: PolicyViolationsProps) => {
  const [actionCardHeight, setActionCardHeight] = useState<number>(0);
  const refInfoCard = useRef(null);
  useEffect(() => {
    setHighlight();
  }, []);
  const setHighlight = () => {
    const { children }: any = refInfoCard.current;
    setActionCardHeight(children[0].clientHeight);
  };
  return (
    <ProductDataGridPage
      breadcrumbData={policyViolationDetailsBreadcrumbData(product, policyViolation)}
      product={product}
    >
      <div className="row">
        <div className="col-6" ref={refInfoCard}>
          <PolicyViolationInfoCard product={product} policyViolation={policyViolation} />
        </div>

        <div className="col-6">
          <PolicyViolationActionCard height={actionCardHeight} />
        </div>
      </div>
    </ProductDataGridPage>
  );
};
