import { DataGrid, DataGridColumn, setColumnsWidthCell } from '@tauruseer/core';
import {
  IPrioritizedRisks,
  VulnerabilitiesStatus,
  prioritizedRisksColumnGridModel,
  prioritizedRisksColumnWidth,
} from '@tauruseer/module';
import { CustomCellCollection } from './custom-columns-grid';

interface IPrioritizedRisksDataGridProps {
  data: Array<IPrioritizedRisks>;
  productId: string;
  selectedTab: number;
}

const PrioritizedRisksDataGrid = ({
  data,
  productId,
  selectedTab,
}: IPrioritizedRisksDataGridProps) => {
  const columnsModel = setColumnsWidthCell(
    prioritizedRisksColumnGridModel,
    prioritizedRisksColumnWidth,
  );

  const title =
    selectedTab === VulnerabilitiesStatus.New
      ? 'New'
      : selectedTab === VulnerabilitiesStatus.Active
      ? 'In Progress'
      : 'Risk Accepted';

  return (
    <DataGrid
      title={title}
      count
      filter
      customClass="prioritized-risks-data-grid"
      data={data.map((data) => ({ ...data, productId }))}
      columnModel={columnsModel as Record<DataGridColumn, any>[]}
      customCellComponents={CustomCellCollection}
      sortable={true}
      filterPlaceholder="Filter Prioritized Risks"
      filterField={['name', 'description']}
    />
  );
};

export default PrioritizedRisksDataGrid;
