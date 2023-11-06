import { Chart, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';
import { useFetcher } from '@remix-run/react';
import { SBOM_REPORT_ACTION, SeverityText } from '@tauruseer/module';
import { useEffect, useRef, useState } from 'react';
import { SBOMStore } from '../../../state/sbom-storage';
import { ChartEmptyState, ChartLoadingState } from '../empty-states';

interface ISeverityChartReportProps {
  productId: string | undefined;
}
export const SbomSeverityChart = ({ productId }: ISeverityChartReportProps) => {
  const storage = SBOMStore((state) => state);
  const fetcher = useFetcher();
  const canRequest = useRef<boolean>(false);
  const isNewRequest = useRef<boolean>(true);
  const vulnerabilitiesChart = useRef<Array<any>>([]);
  const [chartTitle, setChartTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (canRequest.current) {
      onReportChange();
    } else {
      // race condition timer
      timer = setTimeout(() => onReportChange, 1000);
      canRequest.current = true;
    }
    return () => clearTimeout(timer);
  }, [storage.selectedReport]);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'loading') {
      return;
    }
    if (fetcher.data && fetcher.state !== 'loading') {
      const { data } = fetcher.data;
      mapSeverityChart(data);
    }
  }, [fetcher.data]);

  const onReportChange = () => {
    if (storage.selectedReport && storage.selectedReport?.id) {
      getVulnerabilitiesChart(storage.selectedReport?.id);
      setChartTitle(`: ${storage.selectedReport?.name}`);
    } else {
      setChartTitle('');
      vulnerabilitiesChart.current = [];
    }
  };
  const mapSeverityChart = (items: Array<any>) => {
    const m = items.map((c) => {
      const { vulnerabilities, severity } = c;
      const severityInfo = SeverityText[severity];
      return {
        severity: severityInfo.text,
        vulnerabilities,
        color: severityInfo.color,
      };
    });
    vulnerabilitiesChart.current = m;
    // give time the chart to render
    setTimeout(() => (isNewRequest.current = false), 1500);
    setIsLoading(false);
  };

  const getVulnerabilitiesChart = (assetId: number) => {
    setIsLoading(true);
    fetcher.load(
      `/products/${productId}/sbom/data-report/${assetId}?option=${SBOM_REPORT_ACTION.GET_REPORT_CHART}`,
    );
  };
  return (
    <div className="card" style={{ height: '305px', padding: '24px ' }}>
      <label className="ff-ubuntu font-medium text-ml">Report for {chartTitle}</label>
      <label className="ff-ubuntu font-regular text-md text-muted">
        Vulnerabilities by Severity
      </label>
      <div className="d-flex flex-column align-item-center m-auto">
        {!isLoading && vulnerabilitiesChart.current?.length ? (
          <Chart style={{ width: '100%', height: '170px' }} transitions={isNewRequest.current}>
            <ChartSeries>
              <ChartSeriesItem
                data={vulnerabilitiesChart.current}
                type="column"
                field="vulnerabilities"
                categoryField="severity"
                color="color"
              />
            </ChartSeries>
          </Chart>
        ) : !isLoading && !vulnerabilitiesChart.current.length ? (
          <ChartEmptyState />
        ) : (
          ChartLoadingState
        )}
      </div>
    </div>
  );
};
