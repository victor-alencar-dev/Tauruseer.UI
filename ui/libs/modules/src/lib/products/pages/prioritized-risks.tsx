import {
  ButtonActive,
  IPrioritizedRisks,
  IProducts,
  VulnerabilitiesItemStatus,
} from '@tauruseer/module';
import { useState } from 'react';
import ProductDetailHeader from '../components/detail-header/product-detail-header';
import PrioritizedRisksBreadcrumbs from '../components/prioritized-risks/breadcrumbs/prioritized-risks.breadcrumbs.component';
import PrioritizedRisksDataGrid from '../components/prioritized-risks/data-grid/prioritized-risks-data-grid.component';
import PrioritizedRisksHeader from '../components/prioritized-risks/header/prioritized-risks-header.component';

interface IPrioritizedRisksProps {
  prioritizedRisk: Array<IPrioritizedRisks>;
  productDetail: IProducts;
}
export const PrioritizedRisks = ({ prioritizedRisk, productDetail }: IPrioritizedRisksProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const setSelected = (key: number) => {
    setSelectedTab(key);
  };

  const newVulnerabilitiesList = !prioritizedRisk.length
    ? []
    : prioritizedRisk.filter((v) => v.status === VulnerabilitiesItemStatus.New);

  const vulnerabilityInActiveList = !prioritizedRisk.length
    ? []
    : prioritizedRisk.filter((v) => v.status === VulnerabilitiesItemStatus.InProgress);

  const vulnerabilitiesDismissed: IPrioritizedRisks[] = prioritizedRisk.filter(
    (vulnerability: IPrioritizedRisks) =>
      (vulnerability.status as VulnerabilitiesItemStatus) ===
      VulnerabilitiesItemStatus.RiskAccepted,
  );

  return (
    <div className="mb-4">
      <PrioritizedRisksBreadcrumbs productName={`${productDetail.name}`} />

      <ProductDetailHeader {...productDetail} />

      <PrioritizedRisksHeader
        selectedTab={selectedTab}
        setSelected={setSelected}
        active={newVulnerabilitiesList}
        dismissed={vulnerabilitiesDismissed}
        inProgress={vulnerabilityInActiveList}
      />

      <PrioritizedRisksDataGrid
        data={
          selectedTab === ButtonActive.Active
            ? newVulnerabilitiesList
            : selectedTab === ButtonActive.InProgress
            ? vulnerabilityInActiveList
            : vulnerabilitiesDismissed
        }
        selectedTab={selectedTab}
        productId={productDetail.id}
      />
    </div>
  );
};
