export const SBOM_REPORT_ACTION = {
  GET_REPORT_LIST: 'report_list',
  GET_DEPENDENCY_LIST: 'dependency_list',
  GET_REPORT_CHART: 'report_for',
  GET_VULNERABILITY_TREND: 'vulnerability_trend',
  GET_PRODUCT_DEPENDENCY: 'product_dependency',
  GET_PRODUCT_REPORT_HISTORY: 'report_history',
  GET_REPORTS_IN_PROCESS: 'reports_in_process',
  GET_REPORT_DOWNLOAD_URL: 'report_download_url',
  GENERATE_NEW_REPORT: 'generate_new_report',
};
export const SeverityText = [
  {
    text: 'No severity detected',
    type: 'success',
    color: '',
  },
  {
    text: 'Low',
    color: '#70C86A',
  },
  {
    text: 'Medium',
    color: '#FCCA36',
  },
  {
    text: 'High',
    color: '#FF961F',
  },
  {
    text: 'Critical',
    color: '#E16666',
  },
];
export const ReportStatus = [
  { text: 'In Progress', icon: 'fa-regular fa-loader fa-spin', type: 'info', ref: 'Processing' },
  { text: 'Complete', icon: 'fa-thin fa-check', type: 'success', ref: 'Completed' },
  { text: 'Error', icon: 'fa-thin fa-x', type: 'danger', ref: 'Error' },
];
export const SBOM_PATH = {
  AGGREGATED: 'product-aggregated',
  REPORT: 'product-reports',
};
