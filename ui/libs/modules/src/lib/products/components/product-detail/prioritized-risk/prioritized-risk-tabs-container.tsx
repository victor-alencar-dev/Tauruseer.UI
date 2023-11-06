import {
  SeveritiesCharts,
  StateRemediation,
  TrendBySeverityChart,
} from './prioritized-risk-charts';
import { RemediationContent } from './prioritized-risk-remediation';

interface ITabContent {
  data: any;
  activeTab: string;
  isLoading: boolean;
}

export const RiskStateRemediationCharts = (content: ITabContent) => {
  const { activeTab, data, isLoading } = content;
  return activeTab === 'state' ? (
    <StateRemediation data={data.state} isLoading={isLoading} />
  ) : (
    <RemediationContent data={data.remediationData} isLoading={isLoading} />
  );
};

export const SeveritiesTrendCharts = (content: ITabContent) => {
  const { activeTab, data, isLoading } = content;
  return activeTab === 'risk' ? (
    <SeveritiesCharts data={data.severity || []} isLoading={isLoading} />
  ) : (
    <TrendBySeverityChart data={data.trend || []} isLoading={isLoading} />
  );
};
