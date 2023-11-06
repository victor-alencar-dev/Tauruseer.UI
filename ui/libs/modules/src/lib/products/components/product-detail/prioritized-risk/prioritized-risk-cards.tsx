import classNames from 'classnames';
import { ReactElement, useState } from 'react';
import { PrioritizedRisk } from './prioritized-risk-list';
import {
  RiskStateRemediationCharts,
  SeveritiesTrendCharts,
} from './prioritized-risk-tabs-container';

export interface ITab {
  title: string;
  onclick: React.EventHandler<any>;
  tab: string;
  isActive: boolean;
}
export const TabContainer = ({ title, onclick, tab, isActive }: ITab): ReactElement => {
  const tabClass = classNames('prioritized-risk-tabs', { isTabCvssActive: isActive });
  return (
    <div className={tabClass} onClick={() => onclick(tab)}>
      {title}
    </div>
  );
};

export interface IPrioritizedRiskItemProps {
  title: string;
  element: string;
  tabs: Array<any>;
  data: any;
  isLoading?: boolean;
}

const PrioritizedRiskItem = ({
  title,
  tabs,
  element,
  data,
  isLoading,
}: IPrioritizedRiskItemProps) => {
  const [activeTabSeverity, setActiveTabSeverity] = useState<string>('risk');
  const [activeTabState, setActiveTabState] = useState<string>('remediation');

  const contentElements: any = [
    { element: 'prioritizedRisk', ref: PrioritizedRisk },
    { element: 'SeveritiesCharts', ref: SeveritiesTrendCharts },
    { element: 'StateRemediation', ref: RiskStateRemediationCharts },
  ];
  const CardElement = (element: string, data: any): React.ReactNode => {
    const { ref } = contentElements.filter((ele: any) => ele.element === element).pop();
    let activeTab = null;
    if (element === 'SeveritiesCharts') activeTab = activeTabSeverity;
    if (element === 'StateRemediation') activeTab = activeTabState;
    return ref({ data, isLoading, activeTab });
  };
  const handleTabs = (tab: any) => {
    if (tab.ref === 'severity') setActiveTabSeverity(tab.tab);
    if (tab.ref === 'state') setActiveTabState(tab.tab);
  };
  const tabsEle: React.ReactNode = tabs.map((item, index) => {
    return (
      <TabContainer
        title={item.title}
        key={index}
        onclick={() => handleTabs(item)}
        tab={item.tab}
        isActive={
          item.ref === 'severity' ? activeTabSeverity === item.tab : activeTabState === item.tab
        }
      />
    );
  });
  return (
    <div className="card prioritized-risk-cards">
      <span className="ff-ubuntu  font-medium prioritized-risk-cards_title">
        {title ? title : tabsEle}
      </span>
      <div
        className="d-flex flex-column 
          align-self-stretch 
          align-items-md-stretch align-items-md-start 
          prioritized-risk-cards_content"
      >
        {CardElement(element, data)}
      </div>
    </div>
  );
};

export default PrioritizedRiskItem;
