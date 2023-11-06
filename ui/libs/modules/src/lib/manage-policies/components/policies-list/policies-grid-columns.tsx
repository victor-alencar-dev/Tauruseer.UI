import { GridCellProps } from '@progress/kendo-react-grid';
import { Link } from '@remix-run/react';
import { PolicyStatusBox } from '../policy-status-box/policy-status-box';

export const PolicyNameColumn = (props: GridCellProps) => (
  <td
    colSpan={props.colSpan}
    key={props.id}
    role={'gridcell'}
    aria-colindex={props.ariaColumnIndex}
    aria-selected={props.isSelected}
  >
    <span className="font-underline font-bold">
      <Link to={`/manage-policies/dashboard/${props.dataItem.uniqueId}`}>
        {props.dataItem[`${props.field}`]}
      </Link>
    </span>
  </td>
);

export const PolicyStatusColumn = (props: GridCellProps) => {
  const status = props.dataItem.isActive ? 'active' : 'inactive';

  return (
    <td
      colSpan={props.colSpan}
      key={props.id}
      role={'gridcell'}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <PolicyStatusBox status={status} />
    </td>
  );
};

export const PolicyRulesColumn = (props: GridCellProps) => {
  const rules = props.dataItem[`${props.field}`];

  return (
    <td
      colSpan={props.colSpan}
      key={props.id}
      role={'gridcell'}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className={`manage-policies-rules ${rules === 0 ? 'no-rules' : ''}`}>{rules}</div>
    </td>
  );
};

export const PoliciesCustomCells = [
  { name: 'PolicyNameColumn', Element: PolicyNameColumn },
  { name: 'PolicyStatusColumn', Element: PolicyStatusColumn },
  { name: 'PolicyRulesColumn', Element: PolicyRulesColumn },
];
