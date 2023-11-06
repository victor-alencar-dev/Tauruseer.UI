import React from 'react';
import { Breadcrumbs } from '@tauruseer/core';
import { useParams } from '@remix-run/react';

interface IPrioritizedRisksBreadcrumbs {
  productName: string;
}

const PrioritizedRisksBreadcrumbs = ({ productName }: IPrioritizedRisksBreadcrumbs) => {
  const { productId } = useParams();

  const data = [
    { id: 'products', text: 'Products', to: '/products' },
    { id: 'product', text: productName, to: `/products/${productId}/detail` },
    { id: 'prioritized-risks', text: 'Prioritized Risks', disabled: true, to: '/#' },
  ];

  return <Breadcrumbs data={data} className="mt-2 mb-3" />;
};

export default PrioritizedRisksBreadcrumbs;
