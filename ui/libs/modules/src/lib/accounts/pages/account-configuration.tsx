import { Breadcrumbs } from '@tauruseer/core';
import { ConfigureAccountForm } from '../components/account-configuration/configure-account/account-configuration.component';
import { Account } from '../model/account.model';
import { accountConfigureBreadcrumbs } from '../model/accounts-breadcrumbs.model';

interface IConfigureAccountsProps {
  account: Account;
  showMessage: boolean;
  showBreadCrumbs: boolean;
}

export const ConfigureAccounts = ({
  account,
  showMessage,
  showBreadCrumbs,
}: IConfigureAccountsProps) => {
  return (
    <>
      {showBreadCrumbs && (
        <Breadcrumbs data={accountConfigureBreadcrumbs(account.name)} className="mb-3" />
      )}
      <div className="mb-4 card card-content">
        <h3 className="align-middle mb-1 typography-display">
          <span className="k-icon k-i-user fs-2 me-2"></span>
          Configure Account
        </h3>
      </div>
      <ConfigureAccountForm showMessage={showMessage} account={account} />
    </>
  );
};
