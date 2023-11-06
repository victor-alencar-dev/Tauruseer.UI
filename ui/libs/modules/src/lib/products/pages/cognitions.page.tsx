import { ProductDataGridPage, TAction } from '@tauruseer/core';
import {
  CognitionStatus,
  ICognition,
  IProducts,
  VulnerabilitiesStatus,
  cognitionsBreadcrumbData,
} from '@tauruseer/module';
import { useState } from 'react';
import CognitionsDataGrid from '../components/cognitions/cognitions-data-grid.component';
import CognitionsHeader from '../components/cognitions/header/cognitions-header.component';

export interface CognitionsProps {
  product: IProducts;
  cognitions: ICognition[];
}

export const Cognitions = ({ product, cognitions }: CognitionsProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const setSelected = (key: number) => {
    setSelectedTab(key);
  };

  const newCognitions: ICognition[] = cognitions.filter((cognition: ICognition) => {
    const isDismissed = [CognitionStatus.UserDismissed, CognitionStatus.AutoDismissed].includes(
      cognition.status,
    );
    const hasWorkItem = cognition.workItemId != null;
    return !isDismissed && !hasWorkItem;
  });

  const inProgressCognitions: ICognition[] = cognitions.filter((cognition: ICognition) => {
    const isDismissed = [CognitionStatus.UserDismissed, CognitionStatus.AutoDismissed].includes(
      cognition.status,
    );
    const hasWorkItem = cognition.workItemId != null;
    return !isDismissed && hasWorkItem;
  });

  const dismissedCognitions: ICognition[] = cognitions.filter((cognition: ICognition) =>
    [CognitionStatus.UserDismissed, CognitionStatus.AutoDismissed].includes(cognition.status),
  );

  const actions: TAction[] = [
    {
      title: 'New',
      event: () => setSelectedTab(VulnerabilitiesStatus.New),
      valueIndicator: newCognitions.length,
      isActive: selectedTab === VulnerabilitiesStatus.New,
      hasIndicator: true,
    },
    {
      title: 'In Progress',
      event: () => setSelectedTab(VulnerabilitiesStatus.Active),
      valueIndicator: inProgressCognitions.length,
      isActive: selectedTab === VulnerabilitiesStatus.Active,
      hasIndicator: true,
    },
    {
      title: 'Risk Accepted',
      event: () => setSelectedTab(VulnerabilitiesStatus.Dismissed),
      valueIndicator: dismissedCognitions.length,
      isActive: selectedTab === VulnerabilitiesStatus.Dismissed,
      hasIndicator: true,
    },
  ];

  return (
    <ProductDataGridPage breadcrumbData={cognitionsBreadcrumbData(product)} product={product}>
      <CognitionsDataGrid
        data={
          selectedTab === 0
            ? newCognitions
            : selectedTab === 1
            ? inProgressCognitions
            : dismissedCognitions
        }
        productId={product.id}
        actions={actions}
      />
    </ProductDataGridPage>
  );
};
