import { ButtonIndicator, Header } from '@tauruseer/core';

import {
  IPolicyViolation,
  policyViolationsHeaderButtons,
  PolicyViolationsStatus,
} from '../../../model/policy-violations/policy-violations.model';

interface IPolicyViolationsHeader {
  selectedTab: number;
  setSelected: (id: number) => void;
  newPolicyViolations: Array<IPolicyViolation>;
  activePolicyViolations: Array<IPolicyViolation>;
  dismissedPolicyViolations: Array<IPolicyViolation>;
}

const PolicyViolationsHeader = ({
  newPolicyViolations,
  activePolicyViolations,
  selectedTab,
  setSelected,
  dismissedPolicyViolations,
}: IPolicyViolationsHeader) => {
  const Buttons = policyViolationsHeaderButtons.map((item, index) => (
    <ButtonIndicator
      Event={setSelected}
      id={index}
      key={index}
      title={item.title}
      valueIndicator={
        index === PolicyViolationsStatus.Active
          ? newPolicyViolations.length
          : index === PolicyViolationsStatus.Active
          ? activePolicyViolations.length
          : index === PolicyViolationsStatus.Dismissed
          ? dismissedPolicyViolations.length
          : 0
      }
      isActive={selectedTab === index}
      hasIndicator={item.hasIndicator}
    />
  ));
  return <Header title="Policy Violations" buttons={Buttons} alignBtn={'left'} />;
};

export default PolicyViolationsHeader;
