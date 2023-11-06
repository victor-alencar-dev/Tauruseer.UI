import { Header } from '@tauruseer/core';
import { PoliciesGrid } from '../components/policies-list/policies-grid.component';

interface IProps {
  data: [];
}

export const ManagePolicies = ({ data }: IProps) => {
  return (
    <>
      <Header title="Manage Policies" icon="k-i-track-changes-enable" buttons={[]} />
      <PoliciesGrid data={data} />
    </>
  );
};
