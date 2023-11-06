import { Button } from '@progress/kendo-react-buttons';
import { GridCellProps } from '@progress/kendo-react-grid';
import { Avatar } from '@progress/kendo-react-layout';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { USER_ACTIONS } from '@tauruseer/module';
import { UserStore } from '../../state/users-storage';

export const UserNameColumn = (props: GridCellProps) => {
  const { firstName, lastName, gravatarUrl } = props.dataItem;
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className="d-flex align-items-center p-1">
        <span className="d-flex  ms-2 align-items-center">
          <Avatar type={gravatarUrl ? 'image' : 'icon'} size="medium">
            {gravatarUrl ? (
              <img src={gravatarUrl} alt="team-member-avatar" />
            ) : (
              <span className="k-icon k-i-user" />
            )}
          </Avatar>
        </span>
        <div className="ms-2">
          <div className="ff-montserrat font-bold">{`${firstName} ${lastName}`}</div>
        </div>
      </div>
    </td>
  );
};
export const UserGeneralColumn = (props: GridCellProps) => {
  const { isActive, isAccountAdmin } = props.dataItem;
  let value;
  if (`${props.field}` === 'isActive') {
    value = isActive ? 'Active' : 'Inactive';
  }
  if (`${props.field}` === 'isAccountAdmin') {
    value = isAccountAdmin ? 'Yes' : 'No';
  }
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
    >
      <div className="ff-montserrat font-regular text-md">{value}</div>
    </td>
  );
};
export const UserOptionsColumn = (props: GridCellProps) => {
  const store = UserStore((state) => state);
  const setUserActions = (actions: string) => {
    store.setUser(props.dataItem);
    if (actions === USER_ACTIONS.USER_EDIT) store.setUserFormOpen(true);
    if (actions === USER_ACTIONS.USER_INACTIVE) store.setActiveUserFormOpen(true);
  };
  return (
    <td
      colSpan={props.colSpan}
      role={'gridcell'}
      key={props.id}
      aria-colindex={props.ariaColumnIndex}
      aria-selected={props.isSelected}
      style={{ color: '#4231B4' }}
    >
      {' '}
      <Tooltip anchorElement="target" position="top">
        <div className="d-flex">
          <div className="col-1 mb-3" title="Edit">
            <Button fillMode="flat" onClick={() => setUserActions(USER_ACTIONS.USER_EDIT)}>
              <i className="fa-solid fa-pencil"></i>
            </Button>
          </div>

          {props.dataItem.isActive && (
            <div className="col-1 mb-3" title="Set inactive" style={{ position: 'relative' }}>
              <Button fillMode="flat" onClick={() => setUserActions(USER_ACTIONS.USER_INACTIVE)}>
                <i className="fa-regular fa-folder"></i>
              </Button>
            </div>
          )}
        </div>
      </Tooltip>
    </td>
  );
};
export const CustomCellCollection = [
  {
    name: 'UserNameColumn',
    Element: UserNameColumn,
  },
  {
    name: 'UserOptionsColumn',
    Element: UserOptionsColumn,
  },
  {
    name: 'UserGeneralColumn',
    Element: UserGeneralColumn,
  },
];

export const columnsGrid = [
  {
    field: 'firstName',
    title: 'User Name',
    customCell: 'UserNameColumn',
  },
  {
    field: 'email',
    title: 'Email',
  },
  {
    field: 'isActive',
    title: 'Status',
    customCell: 'UserGeneralColumn',
  },
  {
    field: 'isAccountAdmin',
    title: 'Admin',
    customCell: 'UserGeneralColumn',
  },
  {
    field: '',
    customCell: 'UserOptionsColumn',
  },
];
