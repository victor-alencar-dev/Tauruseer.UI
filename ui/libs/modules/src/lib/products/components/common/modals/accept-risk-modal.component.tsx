import {
  ConfirmationModal,
  DataGrid,
  DataGridColumn,
  TTableData,
  TTableField,
  setColumnsWidthCell,
} from '@tauruseer/core';

import {
  CustomCellCollection,
  columnsWidth,
} from 'libs/core/src/lib/shared/components/info-card/info-card-table/info-card-table-grid';

import React from 'react';

type AcceptRiskModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  multiple: boolean;
  data: TTableData[];
  fields: TTableField[];
};

export const AcceptRiskModal: React.FC<AcceptRiskModalProps> = ({
  onClose,
  onConfirm,
  isLoading,
  multiple,
  data,
  fields,
}) => {
  const ColumnGridModel = fields.map((field) => ({
    field: field.field,
    title: field.title,
    customCell: 'GeneralCell',
  }));

  const fieldsWidth = fields.reduce(
    (acc, field) => ({ ...acc, ...(field.size && { [field.field]: columnsWidth[field.size] }) }),
    {},
  );

  const columnsModel = setColumnsWidthCell(ColumnGridModel, fieldsWidth);
  const filters = fields.map((field) => [`${field.field}.title`, `${field.field}.description`]);

  return (
    <ConfirmationModal
      onClose={onClose}
      onConfirm={onConfirm}
      isLoading={isLoading}
      acceptCopy={multiple ? 'Accept Risks' : 'Accept Risk'}
      copy={
        multiple
          ? 'Are you sure you want to accept these risks?'
          : 'Are you sure you want to accept this risk?'
      }
    >
      {multiple && (
        <section className="info-card-table">
          <DataGrid
            data={data}
            filter
            customClass="data-grid-spaceless"
            filterField={filters.flat()}
            columnModel={columnsModel as Record<DataGridColumn, any>[]}
            customCellComponents={CustomCellCollection}
            filterPlaceholder="Filter vulnerabilities"
            sortable={true}
            resizable={false}
            dataItemKey="id"
          />
        </section>
      )}
    </ConfirmationModal>
  );
};
