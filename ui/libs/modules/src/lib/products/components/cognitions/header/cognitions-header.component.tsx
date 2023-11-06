import { ButtonIndicator, Header } from '@tauruseer/core';

import { cognitionsHeaderButtons, ICognition } from '@tauruseer/module';

interface ICognitionsHeader {
  selectedTab: number;
  setSelected: (id: number) => void;
  newCognitions: Array<ICognition>;
  inProgressCognitions: Array<ICognition>;
  dismissedCognitions: Array<ICognition>;
}

const CognitionsHeader = ({
  newCognitions,
  inProgressCognitions,
  dismissedCognitions,
  selectedTab,
  setSelected,
}: ICognitionsHeader) => {
  const valueIndicator = cognitionsHeaderButtons.map((item) => {
    if (item.title === 'New') {
      return newCognitions.length;
    } else if (item.title === 'In Progress') {
      return inProgressCognitions.length;
    } else {
      return dismissedCognitions.length;
    }
  });

  const Buttons = cognitionsHeaderButtons.map((item, index) => (
    <ButtonIndicator
      Event={setSelected}
      id={index}
      key={index}
      title={item.title}
      valueIndicator={valueIndicator[index]}
      isActive={selectedTab === index}
      hasIndicator={item.hasIndicator}
    />
  ));

  return <Header title="Cognitions" buttons={Buttons} alignBtn={'left'} />;
};

export default CognitionsHeader;
