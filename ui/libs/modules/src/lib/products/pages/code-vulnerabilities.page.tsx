import { ProductDataGridPage, TAction } from '@tauruseer/core';

import {
  IProducts,
  VulnerabilitiesStatus,
  VulnerabilitiesItemStatus,
  vulnerabilitiesBreadcrumbData,
  TCodeVulnerabilityListItem,
} from '@tauruseer/module';
import { useState } from 'react';

import CodeVulnerabilitiesDataGrid from '../components/code-vulnerabilities/data-grid/code-vulnerabilities-data-grid.component';

export type TCodeVulnerabilitiesPageProps = {
  product: IProducts;
  codeVulnerabilityList: TCodeVulnerabilityListItem[];
  header?: string;
  sort?: boolean;
};

export const CodeVulnerabilitiesPage = ({
  product,
  codeVulnerabilityList,
}: TCodeVulnerabilitiesPageProps) => {
  const [selectedTab, setSelectedTab] = useState(VulnerabilitiesStatus.New);

  //sorts the vulnerabilities into High, Medium and Low
  const sortedVulnerabilities = codeVulnerabilityList;

  const newVulnerabilitiesList = !sortedVulnerabilities.length
    ? []
    : sortedVulnerabilities.filter((v) => v.itemStatus === VulnerabilitiesItemStatus.New);

  const vulnerabilityInActiveList = !sortedVulnerabilities.length
    ? []
    : sortedVulnerabilities.filter((v) => v.itemStatus === VulnerabilitiesItemStatus.InProgress);

  const vulnerabilitiesDismissed: TCodeVulnerabilityListItem[] = codeVulnerabilityList.filter(
    (vulnerability: TCodeVulnerabilityListItem) =>
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
      <CodeVulnerabilitiesDataGrid
        productId={Number(product.id)}
        title={'Code Vulnerabilities'}
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
