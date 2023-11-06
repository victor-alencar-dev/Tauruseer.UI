import { Header } from '@tauruseer/core';
import { ITeamMember } from '@tauruseer/module';
import { PortfoliosGrid } from '../components/portfolio-grid/portfolio-grid.component';
import { IPortfolio } from '../model/portfolio.model';

interface IPortfoliosProps {
  data: IPortfolio[];
  teamMembers: ITeamMember[];
}

export const Portfolios = ({ data, teamMembers }: IPortfoliosProps) => {
  return (
    <>
      <Header title="Portfolios" icon="k-icon k-i-group" />
      <div>
        <PortfoliosGrid data={data} teamMembers={teamMembers} />
      </div>
    </>
  );
};
