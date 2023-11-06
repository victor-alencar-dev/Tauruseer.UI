import { Breadcrumbs, ITimeLine, TimeLine } from '@tauruseer/core';
import { PolicyConditionsCard } from '../components/policy-conditions-card/policy-conditions-card';
import { PolicyInfoCard } from '../components/policy-info-card/policy-info-card';
import { PolicyRulesGrid } from '../components/policy-rules-grid/policy-rules-grid';
import { managePolicyBreadcrumbs } from '../model/manage-policies-breadcrumb';
import { Policy } from '../model/manage-policies.model';

export interface IManagePoliciesFormProps {
  policy: Policy;
  rules: [];
  conditions: [];
  traceability: ITimeLine;
}

export const ManagePoliciesForm = ({
  policy,
  rules,
  conditions,
  traceability,
}: IManagePoliciesFormProps) => (
  <>
    <Breadcrumbs data={managePolicyBreadcrumbs(policy.name)} className="mb-3" />
    <div className="d-flex justify-content-around align-items-stretch">
      <div className="w-50 me-3">
        <PolicyInfoCard policy={policy} />
        <PolicyConditionsCard conditions={conditions} />
      </div>
      <div className="w-50">
        <PolicyRulesGrid rules={rules} />
      </div>
    </div>
    <div className="mt-1 w-100">
      <TimeLine data={traceability} />
    </div>
  </>
);
