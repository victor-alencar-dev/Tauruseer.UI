import { GridCellProps } from '@progress/kendo-react-grid';
import { Link } from '@remix-run/react';
import { Icon } from '@tauruseer/core';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const InsightCell = (props: GridCellProps) => {
  const { policyId, policyName, policyDescription } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <Link
        to={`${policyId}`}
        className="typography-body-1 mb-2"
        style={{ textDecoration: 'underline', fontWeight: 'bold' }}
      >
        {policyName}
      </Link>
      <p className="typography-body-1">{policyDescription}</p>
    </td>
  );
};
interface IMappings {
  [key: string]: string;
}

const RuleTypeCell = (props: GridCellProps) => {
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className="d-flex">
        <p className="typography-body-1">Technology</p>
      </div>
    </td>
  );
};

const SeverityCell = (props: GridCellProps) => {
  const severityMappings: IMappings = {
    notice: 'info',
    Warning: 'warning',
    Error: 'danger',
  };

  const severity = props.dataItem['severity'];

  const chipType: string = severityMappings[severity];

  const chipClassName = `chip chip-outlined-${chipType}`;

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className={chipClassName} style={{ fontSize: '12px', maxWidth: '74px' }}>
        {capitalize(severity)}
      </div>
    </td>
  );
};

const DetectionCell = (props: GridCellProps) => {
  dayjs.extend(localizedFormat);
  const { detectedAt } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className="typography-body1 text-md font-regular mb-1">
        {dayjs(detectedAt).format('LL')}
      </div>
      <div className="typography-body1 text-md font-light text-muted">
        {dayjs(detectedAt).fromNow()}
      </div>
    </td>
  );
};

const ActionsCell = (props: GridCellProps) => {
  const { productId } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      {productId && (
        <div className="d-flex align-items-center">
          <Icon icon="zoom" style={{ color: '#49A2F4' }} />{' '}
          <Link
            to={`/products/${productId}/track-item`}
            className="typography-body-1 px-2 text-anchor"
            style={{ fontWeight: 'normal' }}
          >
            Track item
          </Link>
        </div>
      )}
    </td>
  );
};

export const CustomCellCollection = [
  { name: 'InsightCell', Element: InsightCell },
  { name: 'RuleTypeCell', Element: RuleTypeCell },
  { name: 'SeverityCell', Element: SeverityCell },
  { name: 'DetectionCell', Element: DetectionCell },
  { name: 'ActionsCell', Element: ActionsCell },
];
