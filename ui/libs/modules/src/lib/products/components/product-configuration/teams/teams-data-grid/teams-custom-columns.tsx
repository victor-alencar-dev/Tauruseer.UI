import { GridCellProps } from '@progress/kendo-react-grid';
import { Link } from '@remix-run/react';
import classNames from 'classnames';
import dayjs from 'dayjs';

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const UserCell = (props: GridCellProps) => {
  const { name, email } = props.dataItem;

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <p className="typography-body-1 mb-2 text-md">{name}</p>
      <p className="typography-body-1 text-muted text-md">{email}</p>
    </td>
  );
};

const StartDateCell = (props: GridCellProps) => {
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <p className="typography-body1 text-md">
        {dayjs(props.dataItem.startDate).format('MMM DD, YYYY')}
      </p>
    </td>
  );
};

const EndDateCell = (props: GridCellProps) => {
  const { active, endDate } = props.dataItem;

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      {!active ? (
        <p className="typography-body1 text-md">{dayjs(endDate).format('MMMM DD, YYYY')}</p>
      ) : (
        <p className="typography-body1 text-md">Still on project</p>
      )}
    </td>
  );
};

const StatusCell = (props: GridCellProps) => {
  const { isPending } = props.dataItem;

  const chipClassName = classNames('chip', {
    'chip-success': !isPending,
    'chip-primary-dark': isPending,
  });

  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div style={{ width: 130 }} className={chipClassName}>
        {!isPending ? 'Active' : 'Inactive'}
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
      <Link to={`#`} prefetch="intent" style={{ color: '#49A2F4' }}>
        Merge Profile
      </Link>
    </td>
  );
};

const EmailCell = (props: GridCellProps) => {
  const { primaryEmail } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      {primaryEmail}
    </td>
  );
};

export const TeamCustomCellCollection = [
  {
    name: 'UserCell',
    Element: UserCell,
  },
  {
    name: 'StartDateCell',
    Element: StartDateCell,
  },
  {
    name: 'EndDateCell',
    Element: EndDateCell,
  },
  {
    name: 'StatusCell',
    Element: StatusCell,
  },
  {
    name: 'EmailCell',
    Element: EmailCell,
  },
];
