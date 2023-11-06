import { IPortfolio, ITeamMember, PORTFOLIO_ACTIONS } from '@tauruseer/module';

export const initialFormValues = (portfolio: IPortfolio, teamList: ITeamMember[]) => {
  const { name, description, portfolioOwnerEmail, isArchived } = portfolio;
  const selectedPortfolioOwner = teamList
    .filter((t) => t.primaryEmail === portfolioOwnerEmail)
    .pop();
  return {
    name: name,
    description: description,
    archived: isArchived,
    portfolioOwner: selectedPortfolioOwner,
  };
};

export const setPayloadForm = (values: any, productId: number | undefined) => {
  return {
    name: values?.name,
    portfolioId: productId || null,
    description: values?.description,
    IsArchived: values?.archived,
    portfolioOwnerAccountTeamMemberId: Number(values.portfolioOwner?.id),
    action: productId ? PORTFOLIO_ACTIONS.EDIT_PORTFOLIO : PORTFOLIO_ACTIONS.ADD_PORTFOLIO,
  };
};
