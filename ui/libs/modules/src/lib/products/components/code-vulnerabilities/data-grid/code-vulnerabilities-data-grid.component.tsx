import { DataGrid, DataGridColumn, TAction, setColumnsWidthCell } from '@tauruseer/core';
import {
  TCodeVulnerabilityListItem,
  VulnerabilitiesStatus,
  codeVulnerabilitiesColumnGridModel,
  codeVulnerabilitiesColumnsWidth,
} from '@tauruseer/module';
import { CustomCellCollection } from './custom-columns-grid';

interface IVulnerabilitiesDataGridProps {
  data: Array<TCodeVulnerabilityListItem>;
  title: string;
  productId: number;
  actions: TAction[];
}

const CodeVulnerabilitiesDataGrid = ({
  data,
  title,
  productId,
  actions,
}: IVulnerabilitiesDataGridProps) => {
  const columnsModel = setColumnsWidthCell(
    codeVulnerabilitiesColumnGridModel,
    codeVulnerabilitiesColumnsWidth,
  );

  return (
    <DataGrid
      headline={title}
      data={data.map((data) => ({ ...data, productId }))}
      customClass="code-vulnerabilities-data-grid"
      count
      filter
      columnModel={columnsModel as Record<DataGridColumn, any>[]}
      customCellComponents={CustomCellCollection}
      filterPlaceholder="Filter vulnerabilities"
      filterField={['message', 'ruleName', 'component']}
      sortable={true}
      actions={actions}
    />
  );
};

export default CodeVulnerabilitiesDataGrid;
