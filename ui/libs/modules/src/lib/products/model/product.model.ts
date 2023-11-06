import { IButtonIndicator, ITimeValue } from '@tauruseer/module';

export enum ActiveProduct {
  RiskManagement = 0,
  BusinessImpact = 1,
}

export enum ProductConfigTabs {
  ProductConfig = 0,
  DataSource = 1,
  Teams = 2,
}

export const productListBtn: Array<IButtonIndicator> = [
  {
    title: 'Risk Management',
    hasIndicator: false,
  },
  {
    title: 'Business Impact',
    hasIndicator: false,
  },
];

export const productConfigure: Array<IButtonIndicator> = [
  {
    title: 'Product Details',
    hasIndicator: false,
    to: 'product-details',
  },
  {
    title: 'Data Sources',
    hasIndicator: false,
    to: 'data-sources',
  },
  {
    title: 'Team',
    hasIndicator: false,
    to: 'team',
  },
];

export const TIME_IN_SECONDS: Array<ITimeValue> = [
  {
    format: 'year',
    value: 31556952,
  },
  {
    format: 'month',
    value: 2628000,
  },
  {
    format: 'day',
    value: 86400,
  },
  {
    format: 'hour',
    value: 3600,
  },
  {
    format: 'minute',
    value: 60,
  },
];

// Press alt + z to toggle word wrap and see the full content
export const infoWindow = {
  riskManagement: {
    title: 'Risk Management',
    infoContent: `Risk management involves discovering, assessing, and prioritizing product portfolio security threats. Risk surveillance, continuous controls monitoring (CCM), and security posture monitoring are the Tauruseer automated  activities to help each team reduce their workload. Thus,  the dashboard's high-level view shows your product line's  security and risk. You now know who is responsible for each risk,  what is being done to decrease those risks, and other key indications  like vulnerabilities detected and remedied. This dashboard lets you  quickly assess your company's security and advise product teams on  how to improve security and reduce risk. A bird's-eye perspective  of your product's security lets you make informed security strategy  decisions and efficiently address security issues at the team level.`,
  },
  businessImpact: {
    title: 'Business Impact',
    infoContent: `A risk-based business impact analysis (BIA) and product classification strategy can help an organization categorize its products and their assets  by security breach risk. Organizations can prioritize risk management and  allocate resources to high-risk applications by categorizing products by business impact. Tauruseer's analytics uses this data to automatically  highlight highest-risk products, toxic combinations and other risk scenarios  based on the data classifications to focus work efforts. This helps teams  protect vital applications while managing security risks throughout the portfolio.`,
  },
};

export const DETAIL_ACTIONS = {
  PRIORITIZED_RISK: 'prioritized_risk',
  PRIORITIZED_CHARTS: 'prioritized_charts',
  REMEDIATION: 'remediation',
};
