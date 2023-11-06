import { SbomSeverityChart } from './vulnerabilities-severity-charts';
import { SbomTrendReportChart } from './vulnerabilities-trend.charts';

interface IVulnerabilitiesCharts {
  productId: string | undefined;
}
export const SbomChartsContent = ({ productId }: IVulnerabilitiesCharts) => {
  return (
    <div style={{ height: 'inherit', marginTop: '20px' }}>
      <SbomSeverityChart productId={productId} />
      <SbomTrendReportChart productId={productId} />
    </div>
  );
};
