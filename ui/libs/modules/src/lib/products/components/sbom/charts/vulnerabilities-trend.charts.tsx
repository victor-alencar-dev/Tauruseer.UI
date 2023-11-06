import { Chart, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';
import { useFetcher } from '@remix-run/react';
import { SBOM_REPORT_ACTION, SeverityText } from '@tauruseer/module';
import { useEffect, useRef, useState } from 'react';
import { ChartEmptyState } from '../empty-states';
interface ITrendChartProps {
  productId: string | undefined;
}
export const SbomTrendReportChart = ({ productId }: ITrendChartProps) => {
  const fetcher = useFetcher();
  const isNewRequest = useRef<boolean>(true);
  const [trendChartInfo, setTrendChartInfo] = useState<Array<any>>([]);
  const [selectedChip, setSelectedChip] = useState<number>(5);

  useEffect(() => {
    getTrendChart(5);
  }, []);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'loading') {
      return;
    }
    if (fetcher.data) {
      isNewRequest.current = true;
      const { data } = fetcher.data;
      mapSeverityChart(data);
    }
  }, [fetcher.data]);

  const mapSeverityChart = (items: Array<any>) => {
    const trend = items.map((c) => {
      const { vulnerabilities, scanId, scanDate } = c;
      return {
        group: scanDate,
        data: vulnerabilities.map((v: any) => {
          const { vulnerabilities, severity } = v;
          const severityInfo = SeverityText[severity];
          return {
            severity: severityInfo.text,
            report: scanId,
            value: vulnerabilities,
            color: severityInfo.color,
          };
        }),
      };
    });
    setTrendChartInfo(trend);
    setTimeout(() => (isNewRequest.current = false), 1000);
  };

  const getTrendChart = (assetId: number) => {
    setSelectedChip(assetId);
    fetcher.load(
      `/products/${productId}/sbom/data-report/${assetId}?option=${SBOM_REPORT_ACTION.GET_VULNERABILITY_TREND}`,
    );
  };

  const barTrendChartInfo = trendChartInfo
    .map((a) => a.data)
    .flat()
    .map((a) => ({
      data: [a],
    }));

  const testLineTrendChartInfo = barTrendChartInfo
    .map((t) => t.data)
    .flat()
    .reduce((acc: any, curr) => {
      const { report, value } = curr;
      const item: any = acc.find((a: any) => a.report === report);
      if (item) {
        item.value += value;
      } else {
        acc.push({ report, value, color: '#4231B4' });
      }

      return acc;
    }, []);
  return (
    <div className="card" style={{ height: '315px', padding: '24px ' }}>
      <label className="ff-ubuntu font-medium text-ml">Vulnerability Trend</label>
      <label className="ff-ubuntu font-regular text-md text-muted">Vulnerabilities over time</label>
      <div className="d-flex flex-column align-item-center m-auto">
        {trendChartInfo?.length ? (
          <Chart style={{ width: '100%', height: '150px' }} transitions={isNewRequest.current}>
            <ChartSeries>
              <ChartSeriesItem
                data={testLineTrendChartInfo}
                type="line"
                field="value"
                categoryField="report"
              />

              {barTrendChartInfo.map((s) => {
                return (
                  <ChartSeriesItem
                    data={s.data}
                    type="column"
                    stack={true}
                    color="color"
                    categoryField="report"
                  />
                );
              })}
            </ChartSeries>
          </Chart>
        ) : (
          <ChartEmptyState />
        )}
      </div>
    </div>
  );
};
