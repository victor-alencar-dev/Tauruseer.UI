import { GridCellProps } from '@progress/kendo-react-grid';
import { Link } from '@remix-run/react';
import { Icon } from '@tauruseer/core';
import dayjs from 'dayjs';

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const InsightCell = (props: GridCellProps) => {
  const { title, vulnerabilityKey, description, referenceLink } = props.dataItem;

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <Link
        to={`/products/${props.dataItem.productId}/vulnerabilities/${vulnerabilityKey}`}
        className="typography-body-1 mb-2"
        style={{ textDecoration: 'underline', fontWeight: 'bold' }}
      >
        {title}
      </Link>
      <p className="typography-body-1 text-description">
        {description}{' '}
        {referenceLink && (
          <a
            href={referenceLink}
            style={{ textDecoration: 'none' }}
            target="_blank"
            rel="noreferrer"
          >
            Source
          </a>
        )}
      </p>
    </td>
  );
};

const SourceCell = (props: GridCellProps) => {
  const { source } = props.dataItem;

  const imgSource = `/icons/tauruseer_logo.svg`;

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className="d-flex gap-2 align-items-center ms-2" title={`${source} Scanner`}>
        <img src={imgSource} alt={imgSource} style={{ width: '38px', height: '38px' }} />
      </div>
    </td>
  );
};

interface ISeverityMappings {
  [key: string]: string;
}

const SeverityCell = (props: GridCellProps) => {
  const severityMappings: ISeverityMappings = {
    Medium: 'info',
    High: 'warning',
    Critical: 'danger',
    Low: 'primary',
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
  const { firstDetectionDate, lastDetectionDate } = props.dataItem;

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className="typography-body1 text-md font-regular mb-1">
        Last {dayjs(lastDetectionDate).fromNow()}
      </div>
      <div className="typography-body1 text-md font-light text-muted">
        First {dayjs(firstDetectionDate).fromNow()}
      </div>
    </td>
  );
};

const ActionsCell = (props: GridCellProps) => {
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className="d-flex align-items-center text-muted">{'No Training Available'}</div>
    </td>
  );
};

const InstancesCell = (props: GridCellProps) => {
  const { instances } = props.dataItem;

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className="typography-body1 text-md font-regular mb-1 ps-4">{instances ?? '-'}</div>
    </td>
  );
};

export const CustomCellCollection = [
  {
    name: 'InsightCell',
    Element: InsightCell,
  },
  {
    name: 'SourceCell',
    Element: SourceCell,
  },
  {
    name: 'SeverityCell',
    Element: SeverityCell,
  },
  {
    name: 'DetectionCell',
    Element: DetectionCell,
  },
  {
    name: 'ActionsCell',
    Element: ActionsCell,
  },
  {
    name: 'InstancesCell',
    Element: InstancesCell,
  },
];
