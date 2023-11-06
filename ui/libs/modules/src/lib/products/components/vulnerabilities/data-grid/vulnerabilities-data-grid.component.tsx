import { DataGrid, DataGridColumn, setColumnsWidthCell, TAction } from '@tauruseer/core';
import {
  IVulnerability,
  VulnerabilitiesStatus,
  vulnerabilitiesColumnGridModel,
  vulnerabilitiesColumnsWidth,
} from '@tauruseer/module';
import { CustomCellCollection } from './custom-columns-grid';

interface IVulnerabilitiesDataGridProps {
  data: Array<IVulnerability>;
  title: string;
  productId: number;
  actions: TAction[];
}

const VulnerabilitiesDataGrid = ({
  data,
  title,
  productId,
  actions,
}: IVulnerabilitiesDataGridProps) => {
  const columnsModel = setColumnsWidthCell(
    vulnerabilitiesColumnGridModel,
    vulnerabilitiesColumnsWidth,
  );

  return (
    <DataGrid
      headline={title}
      data={data.map((data) => ({ ...data, productId }))}
      customClass="vulnerabilities-data-grid"
      count
      filter
      filterField={['title', 'description']}
      columnModel={columnsModel as Record<DataGridColumn, any>[]}
      customCellComponents={CustomCellCollection}
      filterPlaceholder="Filter vulnerabilities"
      sortable={true}
      actions={actions}
    />
  );
};

export default VulnerabilitiesDataGrid;
