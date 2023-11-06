import { ProductDataGridPage, TAction } from '@tauruseer/core';
import {
  IPolicyViolation,
  IProducts,
  PolicyViolationsStatus,
  VulnerabilitiesStatus,
  policyViolationsBreadcrumbData,
} from '@tauruseer/module';
import { useState } from 'react';
import PolicyViolationsHeader from '../components/policy-violations/header/policy-violations-header.component';
import PolicyViolationsDataGrid from '../components/policy-violations/policy-violations-data-grid.component';

export interface IPolicyViolationsProps {
  product: IProducts;
  policyViolations: IPolicyViolation[];
}

export const PolicyViolations = ({ product, policyViolations }: IPolicyViolationsProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const setSelected = (key: number) => {
    setSelectedTab(key);
  };

  const dismissedPolicyViolations: IPolicyViolation[] = policyViolations.filter(
    (policyViolation: IPolicyViolation) => !policyViolation.isNew,
  );

  const inProgressPolicyViolations: IPolicyViolation[] = [];

  const newPolicyViolations: IPolicyViolation[] = policyViolations.filter(
    (policyViolation: IPolicyViolation) => policyViolation.isNew,
  );

  // TODO: add dismissed policy violations implementations when BE is ready

  const actions: TAction[] = [
    {
      title: 'New',
      event: () => setSelectedTab(VulnerabilitiesStatus.New),
      valueIndicator: newPolicyViolations.length,
      isActive: selectedTab === VulnerabilitiesStatus.New,
      hasIndicator: true,
    },
    {
      title: 'In Progress',
      event: () => setSelectedTab(VulnerabilitiesStatus.Active),
      valueIndicator: inProgressPolicyViolations.length,
      isActive: selectedTab === VulnerabilitiesStatus.Active,
      hasIndicator: true,
    },
    {
      title: 'Risk Accepted',
      event: () => setSelectedTab(VulnerabilitiesStatus.Dismissed),
      valueIndicator: dismissedPolicyViolations.length,
      isActive: selectedTab === VulnerabilitiesStatus.Dismissed,
      hasIndicator: true,
    },
  ];

  return (
    <ProductDataGridPage breadcrumbData={policyViolationsBreadcrumbData(product)} product={product}>
      <PolicyViolationsDataGrid
        data={
          selectedTab === PolicyViolationsStatus.Active
            ? newPolicyViolations
            : dismissedPolicyViolations
        }
        actions={actions}
      />
    </ProductDataGridPage>
  );
};
