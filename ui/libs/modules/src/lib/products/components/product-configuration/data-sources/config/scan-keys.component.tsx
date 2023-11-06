import React, { useState } from 'react';
import {
  DataGrid,
  DataGridColumn,
  ExternalServiceIcon,
  IGridColumnModel,
  ServiceConfiguration,
  externalServiceFromInt,
  CopyTextToClipboard,
} from '@tauruseer/core';
import { IDataSourceData } from '@tauruseer/module';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { GridCellProps, GridHeaderCellProps } from '@progress/kendo-react-grid';
import { InputPrefix, TextBox } from '@progress/kendo-react-inputs';

interface ScanKeysProps {
  dataSource: IDataSourceData;
  dataSourceConfig: ServiceConfiguration;
}

export const ScanKeys: React.FC<ScanKeysProps> = ({ dataSource }) => {
  const data = dataSource.mappedAssets?.map((asset) => ({
    type: asset.externalServiceId,
    repositoryMapped: asset.name || asset.referenceId,
    scanKey: asset.scanKey,
  }));

  const ColumnsModel: IGridColumnModel[] = [
    {
      field: 'type',
      title: 'Type',
      customCell: 'CustomAssetTypeCell',
      customHeaderCell: 'CustomAssetTypeHeaderCell',
      width: 100,
    },
    {
      field: 'repositoryMapped',
      title: 'Repository Mapped',
      customHeaderCell: 'CustomHeaderCell',
    },
    {
      field: 'scanKey',
      title: 'Scan Key',
      customHeaderCell: 'CustomScanKeyHeaderCell',
      customCell: 'CustomScanKeyCell',
    },
  ];

  const CustomAssetTypeCell = (props: GridCellProps) => {
    const name = externalServiceFromInt[props.dataItem['type']];
    return (
      <td
        colSpan={props.colSpan}
        role={'gridcell'}
        key={props.id}
        aria-colindex={props.ariaColumnIndex}
        aria-selected={props.isSelected}
        className="d-flex justify-content-center align-items-center overflow-hidden"
      >
        <Tooltip anchorElement="target" position="top">
          <span className="d-flex justify-content-center data-source-icons" title={name}>
            <ExternalServiceIcon projectType={name} style={{ color: '#000' }} />
          </span>
        </Tooltip>
      </td>
    );
  };

  const CustomScanKeyCell = (props: GridCellProps) => {
    const name = externalServiceFromInt[props.dataItem['type']];
    if (name) {
      return (
        <td
          colSpan={props.colSpan}
          role={'gridcell'}
          key={props.id}
          aria-colindex={props.ariaColumnIndex}
          aria-selected={props.isSelected}
          style={{ maxHeight: '56px' }}
        >
          <CopyTextToClipboard
            copyText={props.dataItem['scanKey']}
            alertMessage={'Copied to clipboard'}
            className="p-0 m-0"
          >
            <>
              <span className="text-sm font-bolder">
                <i
                  className="fa-regular fa-copy me-1 text-primary-main"
                  style={{ color: '#4231B4' }}
                ></i>
              </span>
              {props.dataItem['scanKey']}
            </>
          </CopyTextToClipboard>
        </td>
      );
    } else {
      return (
        <td
          colSpan={props.colSpan}
          role={'gridcell'}
          key={props.id}
          aria-colindex={props.ariaColumnIndex}
          aria-selected={props.isSelected}
          className="d-flex justify-content-center"
        >
          Unknown type: {props.dataItem['type']}
        </td>
      );
    }
  };
  const CustomAssetTypeHeaderCell = (props: GridHeaderCellProps) => {
    return (
      <th
        className="d-flex justify-content-center"
        onClick={props.onClick}
        style={{ cursor: 'pointer' }}
      >
        {props.title}
      </th>
    );
  };

  const CustomHeaderCell = (props: GridHeaderCellProps) => {
    return (
      <th className="ps-0" onClick={props.onClick} style={{ cursor: 'pointer' }}>
        {props.title}
      </th>
    );
  };

  const CustomScanKeyHeaderCell = (props: GridHeaderCellProps) => {
    return (
      <th className="ps-0 cursor" onClick={props.onClick} style={{ cursor: 'pointer' }}>
        {props.title} <i className="fa fa-key me-1"></i>
      </th>
    );
  };

  const CustomCellCollection = [
    {
      name: 'CustomAssetTypeCell',
      Element: CustomAssetTypeCell,
    },
    {
      name: 'CustomAssetTypeHeaderCell',
      Element: CustomAssetTypeHeaderCell,
    },
    {
      name: 'CustomHeaderCell',
      Element: CustomHeaderCell,
    },
    {
      name: 'CustomScanKeyCell',
      Element: CustomScanKeyCell,
    },
    {
      name: 'CustomScanKeyHeaderCell',
      Element: CustomScanKeyHeaderCell,
    },
  ];

  const [filterValue, setFilterValue] = useState<string>('');
  const [filteredData, setFilteredData] = useState<typeof data>(data);

  const filterData = (inputArray: typeof data, filterValue: string) => {
    if (!inputArray) return [];
    return inputArray.filter((element) =>
      element && element.repositoryMapped
        ? element.repositoryMapped.indexOf(filterValue) > -1
        : false,
    );
  };

  return (
    <>
      <div className="my-4" style={{ minWidth: '383px', width: '40%' }}>
        <div>
          <TextBox
            placeholder={'Find repository'}
            prefix={() => (
              <InputPrefix>
                <i className="fa fa-search ms-2"></i>
              </InputPrefix>
            )}
            onChange={(e) => {
              setFilterValue(e.target.value as string);
              setFilteredData(filterData(data, e.target.value as string));
            }}
            value={filterValue}
            type="search"
          />
        </div>
      </div>
      <DataGrid
        data={filteredData ?? []}
        columnModel={ColumnsModel as Record<DataGridColumn, any>[]}
        customCellComponents={CustomCellCollection}
        sortable={true}
        pageable={false}
      />
    </>
  );
};
