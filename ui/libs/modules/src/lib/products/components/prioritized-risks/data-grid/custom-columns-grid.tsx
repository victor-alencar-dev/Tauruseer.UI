import { GridCellProps, GridHeaderCellProps } from '@progress/kendo-react-grid';
import { Link } from '@remix-run/react';
import {
  Chip,
  DEVICES,
  ExternalService,
  FaIcon,
  Icon,
  TChipModifier,
  getActualDeviceRes,
} from '@tauruseer/core';
import { sourceUrl } from '@tauruseer/module';
import dayjs from 'dayjs';

const fontSizeCellClass = () => {
  const device = getActualDeviceRes();
  const isLaptop = device === DEVICES.LAPTOP;
  const fontTitle = isLaptop ? 'text-md' : 'text-ml';
  const fontDescription = isLaptop ? 'text-sm' : 'text-md';
  return { fontTitle, fontDescription };
};
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const InsightCell = (props: GridCellProps) => {
  const { name, description, referenceLink, key, prioritizedRiskType } = props.dataItem;
  const { fontTitle, fontDescription } = fontSizeCellClass();
  const url = sourceUrl[prioritizedRiskType - 1];
  // we need to use the name for cve vunerabilities, and the key for the rest
  const id = url === 'vulnerabilities' ? name : key;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <p
        className={`typography-body-1  ${fontTitle}`}
        style={{ textDecoration: 'underline', fontWeight: 'bold' }}
      >
        <Link to={`/products/${props.dataItem.productId}/${url}/${id}`}>{name}</Link>
      </p>
      <p className={`${fontDescription} text-description`}>
        {description}{' '}
        <a href={referenceLink} style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer">
          Source
        </a>{' '}
      </p>
    </td>
  );
};

const SourceCell = (props: GridCellProps) => {
  const { source } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className="d-flex gap-2 align-items-center justify-content-center">
        <FaIcon
          style={{
            color: source === 'SonarQube' ? '#549DD0' : '#4231b4',
          }}
          icon={source === 'SonarQube' ? ExternalService.Sonar : ExternalService.DocioScanner}
          size={38}
        />
      </div>
    </td>
  );
};

const SeverityCell = (props: GridCellProps) => {
  const severityModifier: { [a: string]: TChipModifier } = {
    info: 'info',
    low: 'low',
    medium: 'medium',
    high: 'high',
    critical: 'critical',
    blocker: 'critical',
  };

  const severity = props.dataItem['severity'];

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
        type={'severity'}
        modifier={severityModifier[severity.toLowerCase()]}
      />
    </td>
  );
};

const DetectionCell = (props: GridCellProps) => {
  const { firstDetectionDate, lastDetectionDate } = props.dataItem;
  const { fontTitle, fontDescription } = fontSizeCellClass();

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      {firstDetectionDate ? (
        <>
          <p className={`typography-body-1 mb-1 ${fontTitle}`}>
            Last {dayjs(lastDetectionDate).fromNow()}
          </p>
          <p className={`typography-body-1 text-muted ${fontDescription}`}>
            First {dayjs(firstDetectionDate).fromNow()}
          </p>
        </>
      ) : (
        <p className={`typography-body-1 mb-1 ${fontDescription}`}>{'-'}</p>
      )}
    </td>
  );
};

interface IStatusMappings {
  [key: string]: Array<string>;
}

const StatusCell = (props: GridCellProps) => {
  const statusMappings: IStatusMappings = {
    RiskAccepted: ['warning', 'Risk Accepted'],
    InProcess: ['success', 'In Process'],
    New: ['info', 'New'],
  };
  const { status } = props.dataItem;
  const chipType: Array<string> = statusMappings[status];
  const chipClassName = `chip chip-outlined-${chipType[0]}`;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className={chipClassName} style={{ fontSize: '12px', maxWidth: '96px' }}>
        {capitalize(chipType[1])}
      </div>
    </td>
  );
};

const InstancesCell = (props: GridCellProps) => {
  const { instances } = props.dataItem;
  const { fontTitle, fontDescription } = fontSizeCellClass();

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      {instances && <p className={`typography-body-1  mb-1 ${fontTitle} ps-4`}>{instances}</p>}
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
      <div className="d-flex align-items-center">{'No Training Available'}</div>
    </td>
  );
};

const CustomHeaderCell = (props: GridHeaderCellProps) => {
  return (
    <div
      className="ps-0 d-flex justify-content-center align-items-center"
      onClick={props.onClick}
      style={{ cursor: 'pointer', fontSize: '12px' }}
    >
      {props.title}
    </div>
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
    name: 'CustomSourceHeaderCell',
    Element: CustomHeaderCell,
  },
  {
    name: 'InstancesCell',
    Element: InstancesCell,
  },
];
