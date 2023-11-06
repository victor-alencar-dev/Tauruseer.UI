import { http } from '@tauruseer/api';
import { IPortfolio } from '@tauruseer/module';

export const getPortfoliosList = async () => {
  const { data } = await http.get(`Portfolios`);
  return data;
};

export const getPortfolioDetail = async (portfolioId: string) => {
  const { data } = await http.get(`Portfolios/${portfolioId}`);
  return data;
};

export const setCreatePortfolio = async (portfolio: IPortfolio) => {
  const { data } = await http.post(`Portfolios`, portfolio);
  return data;
};
export const setEditPortfolio = async (portfolio: IPortfolio, portfolioId: string) => {
  const { data } = await http.patch(`Portfolios?portfolioId=${portfolioId}`, portfolio);
  return data;
};

export const deletePortfolio = async (portfolioId: number) => {
  const { data } = await http.delete(`Portfolios/${portfolioId}`);
  return data;
};
