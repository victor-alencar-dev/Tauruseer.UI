import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesItemTooltip,
  ChartSeriesLabels,
  ChartTooltip,
} from '@progress/kendo-react-charts';
import { SeverityText, StatusChartList } from '@tauruseer/module';
import { useEffect, useState } from 'react';
import { ChartEmptyState, LoadingState } from './prioritized-risk-empty-state';

interface IRiskCharts {
  data: any;
  isLoading: boolean;
}
export const SeveritiesCharts = ({ data, isLoading }: IRiskCharts) => {
  let vulnerabilitiesCount = 0;
  const chartData = data?.map((ch: { severity: number; vulnerabilities: number }) => {
    const color = StatusChartList.filter((c) => c.ref === ch.severity).pop()?.color;
    vulnerabilitiesCount += ch.vulnerabilities;
    return {
      ...ch,
      color,
    };
  });

  const donutCenterRenderer = () => (
    <span>
      <h3 className="ff-ubuntu">{vulnerabilitiesCount}</h3>{' '}
      <span className="ff-montserrat text-ml font-regular text-subtitle">Prioritized Risk</span>
    </span>
  );
  return (
    <div
      className="d-flex align-items-center flex-column"
      style={{ margin: data.length ? '0' : 'auto' }}
    >
      {!isLoading && data?.length ? (
        <div className="d-flex align-items-center ">
          <div>
            <Chart style={{ height: '300px' }} donutCenterRender={donutCenterRenderer}>
              <ChartSeries>
                <ChartSeriesItem
                  type="donut"
                  data={chartData}
                  categoryField="severityName"
                  color="color"
                  field="vulnerabilities"
                  holeSize={60}
                >
                  <ChartSeriesLabels color="#fff" background="none" />
                </ChartSeriesItem>
              </ChartSeries>
              <ChartLegend visible={false} />
            </Chart>
          </div>
          <div className="d-flex flex-column">
            {StatusChartList.map((st) => {
              return (
                <div className="d-flex align-item-center">
                  <i
                    className="fa-solid fa-period text-xlg"
                    style={{ color: st.color, marginTop: '-10px' }}
                  ></i>
                  <span className="ff-montserrat text-sm font-regular ms-2">{st.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : !isLoading && !data.length ? (
        ChartEmptyState
      ) : (
        LoadingState
      )}
    </div>
  );
};
export const StateRemediation = ({ data, isLoading }: IRiskCharts) => {
  const chartData = [
    {
      value: data?.new,
      state: 'New',
      color: '#4231B4',
    },
    {
      value: data?.inProgress,
      state: 'In Progress',
      color: '#7A6CD7',
    },
    {
      value: data?.riskAccepted,
      state: 'Risk Accepted',
      color: '#281D6C',
    },
  ];
  return (
    <div
      className="d-flex align-items-center gap-2 flex-column"
      style={{ margin: data.length ? '0' : 'auto' }}
    >
      {!isLoading && data ? (
        <div>
          <Chart style={{ width: '100%', height: '300px' }}>
            <ChartTooltip />
            <ChartSeries>
              <ChartSeriesItem
                data={chartData}
                type="column"
                field="value"
                categoryField="state"
                color="color"
              />
            </ChartSeries>
          </Chart>
        </div>
      ) : !isLoading && !data ? (
        ChartEmptyState
      ) : (
        LoadingState
      )}
    </div>
  );
};

export const TrendBySeverityChart = ({ data, isLoading }: IRiskCharts) => {
  const [trendChartInfo, setTrendChartInfo] = useState<Array<any>>([]);
  useEffect(() => {
    mapTrendChart(data);
  }, []);
  const mapTrendChart = (items: Array<any>) => {
    const trend = items.map((c) => {
      const { vulnerabilities, monthName, severity } = c;
      const severityInfo = SeverityText[severity];
      const data = {
        data: [
          {
            severity: severityInfo.text,
            monthName,
            value: vulnerabilities,
            color: severityInfo.color,
          },
        ],
      };
      return data;
    });
    setTrendChartInfo(trend);
  };
  const testLineTrendChartInfo = trendChartInfo
    .map((t) => t.data)
    .flat()
    .reduce((acc: any, curr) => {
      const { monthName, value } = curr;
      const item: any = acc.find((a: any) => a.monthName === monthName);
      if (item) {
        item.value += value;
      } else {
        acc.push({ monthName, value, color: '#4231B4' });
      }
      return acc;
    }, []);
  return (
    <div
      className="d-flex align-items-center gap-2 flex-column"
      style={{ margin: trendChartInfo.length ? '0' : 'auto' }}
    >
      {!isLoading && trendChartInfo?.length ? (
        <Chart style={{ height: '300px' }}>
          <ChartTooltip />
          <ChartSeries>
            <ChartSeriesItem
              data={testLineTrendChartInfo}
              type="line"
              field="value"
              categoryField="monthName"
            >
              <ChartSeriesItemTooltip format="{0} Total" />
            </ChartSeriesItem>
            {trendChartInfo.map((s) => {
              return (
                <ChartSeriesItem
                  data={s.data}
                  type="column"
                  color="color"
                  stack={true}
                  categoryField="monthName"
                />
              );
            })}
            ;
          </ChartSeries>
        </Chart>
      ) : !isLoading && !data.length ? (
        ChartEmptyState
      ) : (
        LoadingState
      )}
    </div>
  );
};
