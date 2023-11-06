import { DataGrid, DataGridColumn, TAction, setColumnsWidthCell } from '@tauruseer/core';
import { ICognition, cognitionsColumnGridModel, cognitionsColumnsWidth } from '@tauruseer/module';
import { CustomCellCollection } from './custom-columns-grid';

interface ICognitionsDataGridProps {
  data: ICognition[];
  productId: string;
  actions?: TAction[];
}

const CognitionsDataGrid = ({ data, productId, actions }: ICognitionsDataGridProps) => {
  const columnsGridModelData = setColumnsWidthCell(
    cognitionsColumnGridModel,
    cognitionsColumnsWidth,
  );

  return (
    <DataGrid
      headline="Cognitions"
      data={data.map((data) => ({ ...data, productId }))}
      count
      filter
      columnModel={columnsGridModelData as Record<DataGridColumn, any>[]}
      customCellComponents={CustomCellCollection}
      filterPlaceholder="Filter cognitions"
      sortable={true}
      actions={actions}
      filterField={['title', 'message']}
    />
  );
};

export default CognitionsDataGrid;
