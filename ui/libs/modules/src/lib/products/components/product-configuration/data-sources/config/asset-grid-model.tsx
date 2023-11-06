import { GridCellProps } from '@progress/kendo-react-grid';
import { IGridColumnModel } from '@tauruseer/core';
import { MappingsType } from '@tauruseer/module';

export const MappingColumnModelList: IGridColumnModel[] = [
  {
    field: 'name',
    title: 'Asset Name',
  },
  {
    field: 'mappingType',
    title: 'Type',
    customCell: 'CustomMappingTypeColumn',
  },
  {
    field: 'url',
    title: 'Data Source Url',
    customCell: 'CustomUrlColumn',
  },
];

export const CustomUrlColumn = (props: GridCellProps) => {
  const { url } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      key={props.id}
      role={'gridcell'}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <a href={url} style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer">
        {url || '-'}
      </a>{' '}
    </td>
  );
};

export const CustomMappingTypeColumn = (props: GridCellProps) => {
  const { mappingType } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      key={props.id}
      role={'gridcell'}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      {MappingsType[mappingType]}
    </td>
  );
};

export const CustomCellCollection = [
  {
    name: 'CustomUrlColumn',
    Element: CustomUrlColumn,
  },
  {
    name: 'CustomMappingTypeColumn',
    Element: CustomMappingTypeColumn,
  },
];
