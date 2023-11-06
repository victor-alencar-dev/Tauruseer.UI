import { ButtonIndicator, Header } from '@tauruseer/core';

import { ButtonActive, IPrioritizedRisks, mainPageButtonsIndicator } from '@tauruseer/module';

interface IPrioritizedRisksHeaderProps {
  selectedTab: number;
  setSelected: (id: number) => void;
  active: Array<IPrioritizedRisks>;
  dismissed: Array<IPrioritizedRisks>;
  inProgress: Array<IPrioritizedRisks>;
}

const PrioritizedRisksHeader = ({
  active,
  dismissed,
  inProgress,
  selectedTab,
  setSelected,
}: IPrioritizedRisksHeaderProps) => {
  const Buttons = mainPageButtonsIndicator.map((item, index) => (
    <ButtonIndicator
      Event={setSelected}
      id={index}
      key={index}
      title={item.title}
      valueIndicator={
        index === ButtonActive.Active
          ? active.length
          : index === ButtonActive.InProgress
          ? inProgress.length
          : dismissed.length
      }
      isActive={selectedTab === index}
      hasIndicator={item.hasIndicator}
    />
  ));

  return <Header title="Prioritized Risks" buttons={Buttons} alignBtn={'left'} />;
};

export default PrioritizedRisksHeader;
