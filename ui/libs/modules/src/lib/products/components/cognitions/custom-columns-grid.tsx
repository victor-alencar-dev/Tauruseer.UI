import { GridCellProps } from '@progress/kendo-react-grid';
import { Link } from '@remix-run/react';
import { Icon } from '@tauruseer/core';
import {
  CognitionSeverity,
  severityChipTypes,
  severityNames,
} from '../../model/cognitions/cognitions.model';
import { ProductStore } from '../../state/product-storage';

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const InsightCell = (props: GridCellProps) => {
  const { id, title, message } = props.dataItem;

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <Link
        to={`${id}`}
        className="typography-body-1 mb-2"
        style={{ textDecoration: 'underline', fontWeight: 'bold' }}
      >
        {title || `ID-${id}`}
      </Link>
      <p className="typography-body-1">{message}</p>
    </td>
  );
};

const SeverityCell = (props: GridCellProps) => {
  const severity = props.dataItem['severityType'] as CognitionSeverity;

  const chipType: string = severityChipTypes[severity];
  const chipClassName = `chip chip-outlined-${chipType}`;

  const severityName = severityNames[severity];

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className={chipClassName} style={{ fontSize: '12px', maxWidth: '74px' }}>
        {capitalize(severityName)}
      </div>
    </td>
  );
};

const DetectionCell = (props: GridCellProps) => {
  const { firstDetectedAtString, lastDetectedAtString } = props.dataItem;

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className="typography-body1 mb-1 font-regular text-md">Last {lastDetectedAtString}</div>
      <div className="typography-body1 text-muted font-ligh text-md">
        First {firstDetectedAtString}
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
      <div className="d-flex align-items-center">
        {!props.dataItem.workItemId ? (
          <>
            <Icon icon="zoom" style={{ color: '#49A2F4' }} />{' '}
            <Link
              to={`/products/${props.dataItem.productId}/track-item?cognitionId=${props.dataItem.id}`}
              className="typography-body-1 px-2 text-anchor"
              style={{ fontWeight: 'normal' }}
            >
              Track item
            </Link>
          </>
        ) : (
          <a href={props.dataItem.workItemExternalUrl}>{props.dataItem.workItemExternalKey}</a>
        )}
      </div>
    </td>
  );
};

export const CustomCellCollection = [
  { name: 'InsightCell', Element: InsightCell },
  { name: 'SeverityCell', Element: SeverityCell },
  { name: 'DetectionCell', Element: DetectionCell },
  { name: 'ActionsCell', Element: ActionsCell },
];
