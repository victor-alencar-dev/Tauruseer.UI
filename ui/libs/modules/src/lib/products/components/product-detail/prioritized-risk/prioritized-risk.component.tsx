import { Link, useFetcher, useParams } from '@remix-run/react';
import { DETAIL_ACTIONS, IVulnerabilityRemediation, prioritizedRiskCards } from '@tauruseer/module';
import { useEffect, useState } from 'react';
import PrioritizedRiskItem from './prioritized-risk-cards';

export const PrioritizedRisk = () => {
  const { productId } = useParams();
  const fetcher = useFetcher();
  const fetcherRemediation = useFetcher();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [severityChartData, setSeverityChartData] = useState<any>({});
  const [stateChartData, setStateChartData] = useState<any>({});
  const [remediationData, setRemediationData] = useState<IVulnerabilityRemediation>({});

  useEffect(() => {
    setIsLoading(true);
    fetcher.load(
      `/products/${productId}/product-loaders?option=${DETAIL_ACTIONS.PRIORITIZED_CHARTS}`,
    );
    fetcherRemediation.load(
      `/products/${productId}/product-loaders?option=${DETAIL_ACTIONS.REMEDIATION}`,
    );
  }, []);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'loading') {
      return;
    }
    if (fetcher.data) {
      const { data } = fetcher.data;
      const severityTabContent = { severity: data.riskBySeverity, trend: data.trendBySeverity };
      setSeverityChartData(severityTabContent);
      setStateChartData(data.riskByState);
      setIsLoading(false);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (!fetcherRemediation.data && fetcherRemediation.state === 'loading') {
      return;
    }
    if (fetcherRemediation.data) {
      const { data } = fetcherRemediation.data;
      setRemediationData(data);
    }
  }, [fetcherRemediation.data]);

  return (
    <div className="card" style={{ height: '97.1%' }}>
      <div className="card-content" style={{ height: '100%', padding: '32px' }}>
        <label className="typography-h1 mb-3" style={{ marginBottom: '32px' }}>
          Prioritized Risks
        </label>
        <div
          className="row d-flex justify-content-center align-self-stretch"
          style={{ gap: '24px' }}
        >
          {prioritizedRiskCards.map((risk, index) => {
            let data = null;
            if (risk.element === 'SeveritiesCharts') data = severityChartData;
            if (risk.element === 'StateRemediation') {
              data = { state: stateChartData, remediationData: remediationData };
            }
            return (
              <PrioritizedRiskItem
                title={risk.title}
                key={index}
                tabs={risk.tabs}
                data={data}
                element={risk.element}
                isLoading={isLoading}
              />
            );
          })}
        </div>
      </div>

      <Link
        to={`/products/${productId}/prioritized-risks`}
        className="card-footer justify-content-center w-100"
        style={{ textDecoration: 'none', color: '#0F0B29' }}
      >
        <span className="me-24 text-md">View All Risks</span>
        <span className="align-middle ms-2 text-md">
          <i className="fa-solid fa-chevron-right "></i>{' '}
        </span>
      </Link>
    </div>
  );
};
