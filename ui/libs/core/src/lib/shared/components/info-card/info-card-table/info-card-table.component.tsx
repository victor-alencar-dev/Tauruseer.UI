import DataGrid from '../../data-grid/data-grid.component';
import { DataGridColumn } from '../../data-grid/data-grid-interface';
import { InfoCardContext, setColumnsWidthCell } from '@tauruseer/core';
import React, { useContext } from 'react';
import { CustomCellCollection, columnsWidth } from './info-card-table-grid';
import { Button } from '@progress/kendo-react-buttons';

export type TTableField = {
  field: string;
  title: string;
  isKey?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export type TTableData = {
  [key: string]:
    | {
        title?: string;
        description?: string;
        referenceLink?: string;
        copyToClipboard?: string;
        badge?: { copy: string; type: string; modifier: string };
        buttons?: {
          icon: string;
          color: string;
          tooltip: string;
          callback?: () => void;
          referenceLink?: string;
          disabled?: boolean;
        }[];
      }
    | string;
};

export type TInfoCardTableProps = {
  data: TTableData[];
  fields: TTableField[];
  confirmationFields: TTableField[];
  title: string;
  action: {
    copy: string;
    onClick?: (selectedState: any) => void;
    disabled?: (selectedState: any) => boolean;
  };
};

export const InfoCardTable: React.FC = () => {
  const content = useContext(InfoCardContext);
  const [selectedState, setSelectedState] = React.useState({});

  if (!content?.table) {
    return null;
  }

  const { fields, data, title, action } = content.table;

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

  const actions = action && (
    <Button
      className="button button-secondary text-md me-3"
      onClick={() => action.onClick && action.onClick(selectedState)}
      disabled={
        !Object.values(selectedState).some((value) => value === true) ||
        (action.disabled && action.disabled(selectedState))
      }
    >
      {action.copy}
    </Button>
  );

  return (
    <section className="info-card-table">
      <DataGrid
        title={title}
        data={data}
        filter
        filterField={filters.flat()}
        columnModel={columnsModel as Record<DataGridColumn, any>[]}
        customCellComponents={CustomCellCollection}
        filterPlaceholder="Filter vulnerabilities"
        sortable={true}
        resizable={false}
        setSelectedState={setSelectedState}
        selectedState={selectedState}
        dataItemKey="id"
        buttonGroup={actions}
      />
    </section>
  );
};
