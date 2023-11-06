import { ProductDataGridPage, TAction } from '@tauruseer/core';

import {
  IProducts,
  IVulnerability,
  VulnerabilitiesStatus,
  VulnerabilitiesItemStatus,
  vulnerabilitiesBreadcrumbData,
} from '@tauruseer/module';
import { useState } from 'react';
import VulnerabilitiesDataGrid from '../components/vulnerabilities/data-grid/vulnerabilities-data-grid.component';

export interface VulnerabilitiesProps {
  product: IProducts;
  vulnerabilityList: IVulnerability[];
  header?: string;
  sort?: boolean;
}

export const Vulnerabilities = ({
  product,
  vulnerabilityList,
  header,
  sort,
}: VulnerabilitiesProps) => {
  const [selectedTab, setSelectedTab] = useState(VulnerabilitiesStatus.New);

  //sorts the vulnerabilities into High, Medium and Low
  const sortedVulnerabilities = sort
    ? vulnerabilityList.sort((a, b) => {
        const severity = ['High', 'Medium', 'Low'];
        return severity.indexOf(a.severity) - severity.indexOf(b.severity);
      })
    : vulnerabilityList;

  const newVulnerabilitiesList = !sortedVulnerabilities.length
    ? []
    : sortedVulnerabilities.filter((v) => v.itemStatus === VulnerabilitiesItemStatus.New);

  const vulnerabilityInActiveList = !sortedVulnerabilities.length
    ? []
    : sortedVulnerabilities.filter((v) => v.itemStatus === VulnerabilitiesItemStatus.InProgress);

  const vulnerabilitiesDismissed: IVulnerability[] = vulnerabilityList.filter(
    (vulnerability: IVulnerability) =>
      ![VulnerabilitiesItemStatus.New, VulnerabilitiesItemStatus.InProgress].includes(
        (vulnerability.itemStatus as VulnerabilitiesItemStatus) ?? '',
      ),
  );

  const actions: TAction[] = [
    {
      title: 'New',
      event: () => setSelectedTab(VulnerabilitiesStatus.New),
      valueIndicator: newVulnerabilitiesList.length,
      isActive: selectedTab === VulnerabilitiesStatus.New,
      hasIndicator: true,
    },
    {
      title: 'In Progress',
      event: () => setSelectedTab(VulnerabilitiesStatus.Active),
      valueIndicator: vulnerabilityInActiveList.length,
      isActive: selectedTab === VulnerabilitiesStatus.Active,
      hasIndicator: true,
    },
    {
      title: 'Risk Accepted',
      event: () => setSelectedTab(VulnerabilitiesStatus.Dismissed),
      valueIndicator: vulnerabilitiesDismissed.length,
      isActive: selectedTab === VulnerabilitiesStatus.Dismissed,
      hasIndicator: true,
    },
  ];

  return (
    <ProductDataGridPage breadcrumbData={vulnerabilitiesBreadcrumbData(product)} product={product}>
      <VulnerabilitiesDataGrid
        productId={Number(product.id)}
        title={'OSS Vulnerabilities'}
        actions={actions}
        data={
          selectedTab === VulnerabilitiesStatus.New
            ? newVulnerabilitiesList
            : selectedTab === VulnerabilitiesStatus.Active
            ? vulnerabilityInActiveList
            : vulnerabilitiesDismissed
        }
      />
    </ProductDataGridPage>
  );
};
