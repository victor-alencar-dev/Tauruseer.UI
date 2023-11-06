import { GridCellProps } from '@progress/kendo-react-grid';
import { Link } from '@remix-run/react';
import { BusinessTypes } from '@tauruseer/core';

export const AccountBusinessTypeColumn = (props: GridCellProps) => {
  const businessType = props.dataItem[`${props.field}`];

  return (
    <td
      colSpan={props.colSpan}
      key={props.id}
      role={'gridcell'}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      {BusinessTypes[businessType]}
    </td>
  );
};

export const AccountNameTypeColumn = (props: GridCellProps) => {
  return (
    <td
      colSpan={props.colSpan}
      key={props.id}
      role={'gridcell'}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <Link to={`${props.dataItem['accountId']}/configure-account/account-details`}>
        <span className="font-underline font-bold">{props.dataItem[`${props.field}`]}</span>
      </Link>
    </td>
  );
};

export const AccountsCustomCells = [
  { name: 'AccountBusinessTypeColumn', Element: AccountBusinessTypeColumn },
  { name: 'AccountNameTypeColumn', Element: AccountNameTypeColumn },
];
