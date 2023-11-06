import { AccountForm } from '../../account-form/account-form.component';
import { Account } from '../../../model/account.model';
import { AccountUsersList } from '../../account-users-list/account-users-list';

interface IProps {
  account: Account;
  showMessage: boolean;
}
export const ConfigureAccountForm = ({ account, showMessage }: IProps) => {
  return (
    <>
      <AccountForm showMessage={showMessage} account={account} />
      <AccountUsersList users={account.users} accountId={account.id.toString()} />
    </>
  );
};