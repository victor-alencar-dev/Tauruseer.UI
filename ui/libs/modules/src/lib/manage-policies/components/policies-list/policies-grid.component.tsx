import { useNavigate } from '@remix-run/react';
import { DataGrid, DataGridColumn } from '@tauruseer/core';
import { PoliciesCustomCells } from './policies-grid-columns';
import { PoliciesGridModel } from './policies-grid.model';

export function PoliciesGrid({ data }: any) {
  const navigate = useNavigate();
  return (
    <DataGrid
      data={data}
      customClass="data-grid-spaceless"
      columnModel={PoliciesGridModel as Record<DataGridColumn, any>[]}
      customCellComponents={PoliciesCustomCells}
      btnText="Add new Policy"
      title="All Policies"
      button
      BtnOnClick={() => navigate('/manage-policies/new/configure-policy/policy-detail')}
      count
      countStrings={{ singular: 'policy', plural: 'policies' }}
      sortable={true}
    />
  );
}
