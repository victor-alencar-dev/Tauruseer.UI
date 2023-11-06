import { GridCellProps } from '@progress/kendo-react-grid';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { Link } from '@remix-run/react';
import { ExternalServiceIcon } from '@tauruseer/core';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { scanColumnConfig } from './asset-discovery-grid.model';

export const CustomNameColumn = (props: GridCellProps) => {
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className="creator-name">{props.dataItem[props.field || '']}</div>
      <div className="creator-identity">{props.dataItem['creatorIdentity']}</div>
    </td>
  );
};

export const CustomAssetNameColumn = (props: GridCellProps) => {
  return (
    <td
      colSpan={props.colSpan}
      key={props.id}
      role={'gridcell'}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <Link to={`/asset-discovery/detail/${props.dataItem['id']}`} prefetch="intent">
        {props.dataItem['displayName']}
      </Link>
    </td>
  );
};

export const CustomAssetTypeColumn = (props: GridCellProps) => {
  const { name } = props.dataItem['externalService'];
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <Tooltip anchorElement="target" position="top">
        <span className="data-source-icons ms-3" title={name}>
          <ExternalServiceIcon projectType={name} style={{ color: '#3778BF' }} />
        </span>
      </Tooltip>
    </td>
  );
};
export const CustomProjectTypeColumn = (props: GridCellProps) => {
  const { projectType, lastScanAt } = props.dataItem;
  let projectTypeStatus;
  if (lastScanAt && !projectType) {
    projectTypeStatus = '-';
  }
  if (!lastScanAt && !projectType) {
    projectTypeStatus = 'Analyzing Asset';
  }
  const child = projectType ? (
    <span className="text-md ff-montserrat font-bold">{projectType}</span>
  ) : (
    <span className="text-md ff-montserrat font-regular text-muted">{projectTypeStatus}</span>
  );
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <span className="data-source-icons">{child}</span>
    </td>
  );
};

export const CustomScanResultColumn = (props: GridCellProps) => {
  const { vulnerabilitiesCount } = props.dataItem;
  let value: string | null = null;
  if (vulnerabilitiesCount === 0) {
    value = 'noIssue';
  }
  if (vulnerabilitiesCount > 0) {
    value = 'issue';
  }
  const { title, className } = scanColumnConfig.filter((v) => v.value === value)[0];

  const classMapping: any = {
    'box-not-issue': 'success',
    'box-scan-issue': 'danger',
    'box-not-scan': 'primary-dark',
  };

  const chipClassName = `chip chip-${classMapping[className]}`;

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className={chipClassName} style={{ maxWidth: '102px' }}>
        {vulnerabilitiesCount} {title}
      </div>
    </td>
  );
};
export const CustomLastScanAtColumn = (props: GridCellProps) => {
  dayjs.extend(localizedFormat);
  const { lastScanAt } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      {lastScanAt ? (
        <>
          <div className="creator-name">{dayjs(lastScanAt).format('LL')}</div>
          <div className="creator-identity">{dayjs(lastScanAt).fromNow()}</div>
        </>
      ) : (
        <div className="chip chip-primary-dark" style={{ maxWidth: '102px' }}>
          Not Scanned
        </div>
      )}
    </td>
  );
};
export const CustomAgeColumn = (props: GridCellProps) => {
  let date;
  dayjs.extend(localizedFormat);
  const { createdAt, investigatedAt, dateTimeUtc } = props.dataItem;
  if (props.field === 'investigatedAt') {
    date = investigatedAt;
  }
  if (props.field === 'createdAt') {
    date = createdAt;
  }
  if (props.field === 'dateTimeUtc') {
    date = dateTimeUtc;
  }
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      {date && (
        <>
          <div className="creator-name">{dayjs(date).format('LL')}</div>
          <div className="creator-identity">{dayjs(date).fromNow()}</div>
        </>
      )}
    </td>
  );
};
export const CustomAcceptedByColumn = (props: GridCellProps) => {
  const { dismissedByUserName, dismissedAt } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className="creator-name">{dismissedByUserName}</div>
      <div className="creator-identity">{dayjs(dismissedAt).format('LL')}</div>
    </td>
  );
};
export const CustomCellCollection = [
  {
    name: 'CustomNameColumn',
    Element: CustomNameColumn,
  },
  {
    name: 'CustomAssetTypeColumn',
    Element: CustomAssetTypeColumn,
  },
  {
    name: 'CustomAssetNameColumn',
    Element: CustomAssetNameColumn,
  },
  {
    name: 'CustomLastScanAtColumn',
    Element: CustomLastScanAtColumn,
  },
  {
    name: 'CustomScanResultColumn',
    Element: CustomScanResultColumn,
  },
  {
    name: 'CustomAgeColumn',
    Element: CustomAgeColumn,
  },
  {
    name: 'CustomProjectTypeColumn',
    Element: CustomProjectTypeColumn,
  },
  {
    name: 'CustomAcceptedByColumn',
    Element: CustomAcceptedByColumn,
  },
];
