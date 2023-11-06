import { DataGrid, DataGridColumn, TAction, setColumnsWidthCell } from '@tauruseer/core';

import {
  policyViolationsColumnGridModel,
  policyViolationsColumnsWidth,
} from '../../model/policy-violations/policy-violations-data-grid.model';

import { IPolicyViolation } from '@tauruseer/module';

import { CustomCellCollection } from './custom-columns-grid';

interface IPolicyViolationsDataGridProps {
  data: IPolicyViolation[];
  actions: TAction[];
}

const PolicyViolationsDataGrid = ({ data, actions }: IPolicyViolationsDataGridProps) => {
  const columnsGridModelData = setColumnsWidthCell(
    policyViolationsColumnGridModel,
    policyViolationsColumnsWidth,
  );

  return (
    <DataGrid
      headline="Policy Violations"
      data={data}
      count
      filter
      columnModel={columnsGridModelData as Record<DataGridColumn, any>[]}
      customCellComponents={CustomCellCollection}
      filterPlaceholder="Filter policy violations"
      sortable={true}
      actions={actions}
      filterField={['policyName', 'policyDescription']}
    />
  );
};

export default PolicyViolationsDataGrid;
