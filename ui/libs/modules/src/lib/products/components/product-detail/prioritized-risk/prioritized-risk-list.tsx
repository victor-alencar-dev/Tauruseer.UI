import { Link, useFetcher, useNavigate, useParams } from '@remix-run/react';
import { DETAIL_ACTIONS, IPrioritizedRisks, sourceType, sourceUrl } from '@tauruseer/module';
import { useEffect, useState } from 'react';
import { ChartEmptyState, LoadingState } from './prioritized-risk-empty-state';

export const PrioritizedRisk = (props: any) => {
  const navigateTo = useNavigate();
  const fetcher = useFetcher();
  const { productId } = useParams();
  const [prioritizedRisk, setPrioritizedRisk] = useState<Array<IPrioritizedRisks>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const goToVulnerabilityDetail = (url: string, id: string) => {
    navigateTo(`/products/${productId}/${url}/${id}`);
  };
  useEffect(() => {
    setIsLoading(true);
    fetcher.load(
      `/products/${productId}/product-loaders?option=${DETAIL_ACTIONS.PRIORITIZED_RISK}`,
    );
  }, []);
  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'loading') {
      return;
    }
    if (fetcher.data) {
      const { data } = fetcher.data;
      setPrioritizedRisk(data);
      setIsLoading(false);
    }
  }, [fetcher.data]);
  return (
    <div
      className="d-flex flex-column align-items-center gap-2 prioritized-risk-vulnerabilities"
      style={{ margin: prioritizedRisk.length ? '0' : 'auto' }}
    >
      {!isLoading && prioritizedRisk?.length
        ? prioritizedRisk.map((pr, i) => {
            const url = sourceUrl[pr.prioritizedRiskType - 1];
            const type = sourceType[pr.prioritizedRiskType - 1];
            const id = url === 'vulnerabilities' ? pr.name : pr.key;
            return (
              <div className="d-flex align-items-center justify-content-between prioritized-risk-vulnerabilities_content">
                <div className="d-flex flex-wrap">
                  <Link to={`/products/${productId}/${url}/${id}`} prefetch="intent">
                    <div className="ff-ubuntu  font-medium prioritized-risk-vulnerabilities_text">
                      {`${i + 1}. ${pr.name}`}{' '}
                    </div>
                  </Link>
                  <span className="ff-montserrat  font-regular ms-2 prioritized-risk-vulnerabilities_source">
                    {' '}
                    / {type}
                  </span>
                </div>
                <span
                  onClick={() => goToVulnerabilityDetail(url, `${pr.key}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
              </div>
            );
          })
        : !isLoading && !prioritizedRisk.length
        ? ChartEmptyState
        : LoadingState}
    </div>
  );
};
