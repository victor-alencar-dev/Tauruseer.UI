import { GridCellProps } from '@progress/kendo-react-grid';
import { Chip, TChipModifier } from '@tauruseer/core';
import { SeverityText } from '@tauruseer/module';

export const CustomGeneralColumn = (props: GridCellProps) => {
  const { type, license, vulnerabilityId, vulnerabilityIds } = props.dataItem;

  let value;
  let textClass = props.field ? '' : 'text-subtitle';
  if (`${props.field}` === 'type') {
    textClass = type ? '' : 'text-subtitle';
    value = type || 'Library';
  }
  if (`${props.field}` === 'license') {
    textClass = license === 'NOASSERTION' ? 'text-subtitle' : '';
    value = license === 'NOASSERTION' ? 'No license detected' : license;
  }
  if (`${props.field}` === 'vulnerabilityId') {
    textClass = vulnerabilityId ? '' : 'text-subtitle';
    value = vulnerabilityId || 'No CVE ID detected';
  }
  if (`${props.field}` === 'vulnerabilityIds') {
    textClass = vulnerabilityIds ? '' : 'text-subtitle';
    value = vulnerabilityIds || 'No CVE ID detected';
  }

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <span className={`text-center ff-montserrat font-regular text-md ${textClass}`}>{value}</span>
    </td>
  );
};
export const CustomSeverityColumn = (props: GridCellProps) => {
  const { severity } = props.dataItem;
  const value = SeverityText[severity || 0];
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <Chip
        copy={value.text}
        type="severity"
        modifier={value.text.toLocaleLowerCase() as TChipModifier}
      />
    </td>
  );
};
export const CustomNameColumn = (props: GridCellProps) => {
  const { name } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <span
        className={`text-center ff-montserrat font-bold text-md`}
        style={{ textDecoration: 'underline' }}
      >
        {name}
      </span>
    </td>
  );
};
export const CustomCellCollection = [
  {
    name: 'CustomGeneralColumn',
    Element: CustomGeneralColumn,
  },
  {
    name: 'CustomSeverityColumn',
    Element: CustomSeverityColumn,
  },
  {
    name: 'CustomNameColumn',
    Element: CustomNameColumn,
  },
];

export const columnsGrid = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Version',
    field: 'version',
  },
  {
    title: 'Type',
    field: 'type',
    customCell: 'CustomGeneralColumn',
  },
  {
    title: 'License',
    field: 'license',
    customCell: 'CustomGeneralColumn',
  },
  {
    title: 'CVE ID',
    field: 'vulnerabilityIds',
    customCell: 'CustomGeneralColumn',
  },
  {
    title: 'Severity',
    field: 'severity',
    customCell: 'CustomSeverityColumn',
  },
];

export const ProductDependencyColumnsGrid = [
  {
    title: 'Name',
    field: 'name',
    customCell: 'CustomNameColumn',
  },
  {
    title: 'Version',
    field: 'version',
  },
  {
    title: 'Type',
    field: 'type',
    customCell: 'CustomGeneralColumn',
  },
  {
    title: 'License',
    field: 'license',
    customCell: 'CustomGeneralColumn',
  },
  {
    title: 'Repository',
    field: 'repositoryName',
  },
  {
    title: 'CVE ID',
    field: 'vulnerabilityId',
    customCell: 'CustomGeneralColumn',
  },
  {
    title: 'Severity',
    field: 'severity',
    customCell: 'CustomSeverityColumn',
  },
];
