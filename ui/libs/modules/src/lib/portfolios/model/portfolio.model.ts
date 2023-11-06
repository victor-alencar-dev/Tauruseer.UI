import { IBreadcrumb } from '@tauruseer/core';
import { IProducts } from '@tauruseer/module';

export interface IPortfolio {
  portfolioId?: number;
  name?: string;
  description?: string;
  portfolioType?: number;
  accountId?: number;
  portfolioOwnerAccountTeamMemberId?: number;
  dateCreatedUTC?: string;
  uniqueId?: string;
  isArchived?: boolean;
  matchingProducts?: number;
  portfolioOwnerFullName?: string;
  portfolioOwnerEmail?: string;
  portfolioOwnerGravatarUr?: string;
  productIdList?: Array<number>;
  products?: Array<IProducts>;
}

export enum BtnActive {
  Active = 0,
  All = 1,
}

export const PortfolioBtnIndicator: Array<{ title: string; hasIndicator: boolean }> = [
  {
    title: 'Active',
    hasIndicator: true,
  },
  {
    title: 'All',
    hasIndicator: true,
  },
];

export const PORTFOLIO_ACTIONS = {
  ADD_PORTFOLIO: 'ADD_PORTFOLIO',
  EDIT_PORTFOLIO: 'EDIT_PORTFOLIO',
  DELETE_PORTFOLIO: 'DELETE_PORTFOLIO',
  ARCHIVE_PORTFOLIO: 'ARCHIVE_PORTFOLIO',
};

export const PORTFOLIO_ACTION_MSG = {
  ADD_PORTFOLIO: 'Portfolio added successfully',
  EDIT_PORTFOLIO: 'Portfolio successfully update',
  ACTION_ERROR: 'There seems to be something that went wrong, Please try again',
  DELETE_PORTFOLIO: 'Portfolio was deleted',
  ARCHIVE_PORTFOLIO: 'Portfolio successfully archived',
  ADD_PRODUCTS: 'Product(s) added successfully',
};

export const portfolioDetailBreadcrumbs: (portfolioName: string) => IBreadcrumb[] = (
  portfolioName: string,
) => [
  { id: 'portfolio', text: 'Portfolio', to: '/portfolios' },
  { id: 'portfolio-name', text: portfolioName, to: '/#', disabled: true },
];
