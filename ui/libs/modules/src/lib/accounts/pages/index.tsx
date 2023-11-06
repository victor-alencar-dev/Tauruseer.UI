import { Header } from "@tauruseer/core";
import { AccountsGrid } from "../components/account-list/grid/accounts-grid.component";

interface IProps {
  data: [];
}

export const Accounts = ({ data }: IProps) => {
  return (
    <>
      <Header title="Manage Accounts" icon="k-i-user" buttons={[]} />
      <AccountsGrid data={data} />
    </>
  );
};