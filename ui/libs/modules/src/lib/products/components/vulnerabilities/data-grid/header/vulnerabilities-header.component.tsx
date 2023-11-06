import { ButtonIndicator, Header } from '@tauruseer/core';
import {
  VulnerabilitiesStatus,
  vulnerabilitiesHeaderButtons,
} from '../../../../model/vulnerabilities/vulnerabilities.model';

interface IVulnerabilitiesHeader {
  selectedTab: number;
  setSelected: (id: number) => void;
  newVulnerabilities: number;
  activeVulnerabilities: number;
  dismissedVulnerabilities: number;
  title?: string;
}

const VulnerabilitiesHeader = ({
  newVulnerabilities,
  activeVulnerabilities,
  dismissedVulnerabilities,
  selectedTab,
  setSelected,
  title,
}: IVulnerabilitiesHeader) => {
  const Buttons = vulnerabilitiesHeaderButtons.map((item, index) => (
    <ButtonIndicator
      Event={setSelected}
      id={index}
      key={index}
      title={item.title}
      valueIndicator={
        index === VulnerabilitiesStatus.New
          ? newVulnerabilities
          : index === VulnerabilitiesStatus.Active
          ? activeVulnerabilities
          : index === VulnerabilitiesStatus.Dismissed
          ? dismissedVulnerabilities
          : 0
      }
      isActive={selectedTab === index}
      hasIndicator={item.hasIndicator}
    />
  ));

  return <Header title={title ? title : 'Vulnerabilities'} buttons={Buttons} alignBtn={'left'} />;
};

export default VulnerabilitiesHeader;
