import { Icon } from '@progress/kendo-react-common';
import { GridNoRecords } from '@progress/kendo-react-grid';
import { SwitchChangeEvent } from '@progress/kendo-react-inputs';
import { DataGrid, DataGridColumn } from '@tauruseer/core';
import { useEffect, useState } from 'react';
import { User } from '../../model/account.model';
import {
  CustomCellCollection,
  columnsGrid,
} from '../account-configuration/configure-account/account-users-grid.model';
import { InactiveUserForm } from '../account-users-form/account-user-inactive';
import { AccountUsersForm } from '../account-users-form/account-users-form';
import { UserStore } from '../state/users-storage';

interface IAccountUsersListProps {
  users: User[];
  accountId: string;
}
export const AccountUsersList = ({ users, accountId }: IAccountUsersListProps) => {
  const store = UserStore((state) => state);
  const [usersData, setUserData] = useState<User[]>(users.filter((d: User) => d.isActive));
  const [filterValue, setFilterValue] = useState<boolean>(true);

  useEffect(() => {
    setUserData(users.filter((d: User) => d.isActive === filterValue));
  }, [users]);

  const toggleInactiveUser = (event: SwitchChangeEvent) => {
    setFilterValue(!event.target.value);
    setUserData(users.filter((d: User) => d.isActive === !event.target.value));
  };

  const handleUserModalClose = () => {
    store.setUserFormOpen(false);
    store.setActiveUserFormOpen(false);
    store.setUser({});
  };

  const emptyState = (
    <GridNoRecords>
      <div className="data-empty-grid" style={{ height: '200px' }}>
        <Icon name="grid-layout" size="medium" />
        <div className="data-empty-message d-flex flex-column">
          {!usersData.length && users.length ? (
            <span className="ff-ubuntu text-ml font-medium">{'No records available '}</span>
          ) : (
            <span className="ff-ubuntu text-ml font-medium">{'No users on this account'}</span>
          )}
          {!usersData?.length && users.length ? (
            <span className="ff-montserrat text-md font-regular">
              {'This Filter does not have any records'}
            </span>
          ) : (
            <div className="ff-montserrat text-md font-regular d-flex flex-column">
              <span>{'Start by adding a new user to this '}</span>
              <span>{'account to see them all here'}</span>
            </div>
          )}
        </div>
      </div>
    </GridNoRecords>
  );
  return (
    <>
      <DataGrid
        data={usersData}
        columnModel={columnsGrid as Record<DataGridColumn, any>[]}
        customCellComponents={CustomCellCollection}
        title={`${filterValue ? 'Active' : 'Inactive'} Users`}
        count
        countStrings={{ singular: 'Users', plural: 'Users' }}
        button
        switchFilter
        switchLabel="Show Inactive"
        switchFilterAction={toggleInactiveUser}
        btnText="Add new User"
        BtnOnClick={() => store.setUserFormOpen(true)}
        EmptyStateComponent={emptyState}
      />
      {store.userFormOpen && (
        <AccountUsersForm accountId={accountId} onClose={handleUserModalClose} />
      )}
      {store.activeUserFormOpen && (
        <InactiveUserForm accountId={accountId} onClose={handleUserModalClose} />
      )}
    </>
  );
};
