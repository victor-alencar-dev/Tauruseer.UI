// Asset Discovery
export * from './lib/asset-discovery/index';
// Onboarding
export * from './lib/onboarding/index';
// Products
export * from './lib/products/index';
// Manage Policies
export * from './lib/manage-policies/index';
export * from './lib/products/index';
// Manage Cognitions
export * from './lib/manage-cognitions/pages/index';

export * from './lib/shared/index';

// Configure accounts
export { Accounts } from './lib/accounts/pages/index';
export { ConfigureAccountForm } from './lib/accounts/components/account-configuration/configure-account/account-configuration.component';
export { ConfigureAccounts } from './lib/accounts/pages/account-configuration';
export * from './lib/accounts/model/account.model';

// Portfolios
export { Portfolios } from './lib/portfolios/pages/index';
export { PortfolioProducts } from './lib/portfolios/pages/portfolio-detail';
export * from './lib/portfolios/components/portfolio-grid/portfolio-grid.model';
export {
  PORTFOLIO_ACTIONS,
  IPortfolio,
  PORTFOLIO_ACTION_MSG,
} from './lib/portfolios/model/portfolio.model';

// Global search
export { SearchDetails } from './lib/global-search/page/index';
