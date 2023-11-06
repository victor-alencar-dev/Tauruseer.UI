import { GridCellProps } from '@progress/kendo-react-grid';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { Link } from '@remix-run/react';
import { Chip, ExternalService, FaIcon, Icon, TChipModifier, capitalize } from '@tauruseer/core';
import dayjs from 'dayjs';

const InsightCell = (props: GridCellProps) => {
  const { title, description, vulnerabilityKey } = props.dataItem;

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <Link
        to={`/products/${props.dataItem.productId}/code-vulnerabilities/${vulnerabilityKey}`}
        className="typography-body-1 mb-2"
        style={{ textDecoration: 'underline', fontWeight: 'bold' }}
      >
        {title}
      </Link>
      <p className="typography-body-1 text-description">{description} </p>
    </td>
  );
};

const SourceCell = (props: GridCellProps) => {
  // TODO: Make this dynamic when is implemented in the backend
  // const { source } = props.dataItem;

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className="d-flex gap-2 align-items-center ms-2" title={`${'SonarQube'}`}>
        <FaIcon icon={ExternalService.Sonar} size={38} />
      </div>
    </td>
  );
};

const SeverityCell = (props: GridCellProps) => {
  const severityModifier: { [a: string]: TChipModifier } = {
    info: 'info',
    minor: 'warning',
    major: 'danger',
    critical: 'danger',
    blocker: 'danger',
  };

  const severityIcon: { [a: string]: string } = {
    info: 'info',
    minor: 'arrow-down',
    major: 'circle-exclamation',
    critical: 'arrow-up',
    blocker: 'circle-exclamation',
  };

  const severity: string = props.dataItem['severity'];

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <Chip
        copy={capitalize(severity.toLowerCase())}
        type={'badge'}
        modifier={severityModifier[severity.toLowerCase()]}
        icon={severityIcon[severity.toLowerCase()]}
      />
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
      {firstDetectionDate && lastDetectionDate && (
        <>
          <div className="typography-body1 text-md font-regular mb-1">
            Last {dayjs(lastDetectionDate).fromNow()}
          </div>
          <div className="typography-body1 text-md font-light text-muted">
            First {dayjs(firstDetectionDate).fromNow()}
          </div>
        </>
      )}
      {firstDetectionDate && !lastDetectionDate && (
        <div className="typography-body1 text-md font-regular mb-1">
          {dayjs(firstDetectionDate).fromNow()}
        </div>
      )}
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
      <div className="d-flex align-items-cente text-muted">{'No Training Available'}</div>
    </td>
  );
};

const StatusCell = (props: GridCellProps) => {
  const statusModifier: { [a: string]: TChipModifier } = {
    info: 'info',
    minor: 'warning',
    major: 'danger',
    critical: 'danger',
    blocker: 'danger',
  };

  const statusIcon: { [a: string]: string } = {
    info: 'info',
    minor: 'arrow-down',
    major: 'circle-exclamation',
    critical: 'arrow-up',
    blocker: 'circle-exclamation',
  };

  const status: string = props.dataItem['sonarQubeStatus'];

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <Chip
        copy={capitalize(status.toLowerCase())}
        type={'badge'}
        modifier={statusModifier[status.toLowerCase()]}
        icon={statusIcon[status.toLowerCase()]}
      />
    </td>
  );
};

const PathCell = (props: GridCellProps) => {
  const fullPath = props.dataItem.component;
  const pathSlices = fullPath.split('/');
  const shortPath = [pathSlices[0], '...', pathSlices[pathSlices.length - 1]].join('/');

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <Tooltip anchorElement="target" position="top" style={{ width: 500 }}>
        <p
          title={fullPath}
          className="typography-body1 text-md font-regular mb-1"
          style={{ overflowWrap: 'break-word' }}
        >
          {shortPath}
        </p>
      </Tooltip>
      <p className="typography-body1 text-md font-light text-muted">Line {props.dataItem.line}</p>
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
    name: 'StatusCell',
    Element: StatusCell,
  },
  { name: 'PathCell', Element: PathCell },
  {
    name: 'InstancesCell',
    Element: InstancesCell,
  },
];
