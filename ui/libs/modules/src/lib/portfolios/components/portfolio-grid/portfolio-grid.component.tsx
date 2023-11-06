import { SwitchChangeEvent } from '@progress/kendo-react-inputs';
import { DataGrid, DataGridColumn } from '@tauruseer/core';
import { ITeamMember } from '@tauruseer/module';
import { useEffect, useState } from 'react';
import { IPortfolio } from '../../model/portfolio.model';
import { PortfolioStore } from '../../state/portfolio-storage';
import { ArchivePortfolio } from '../form/portfolio-archive-component';
import { DeletePortfolio } from '../form/portfolio-delete.component';
import { PortfolioForm } from '../form/portfolio-form.component';
import { CustomCellCollection } from './portfolio-columns-grid';
import { portfoliosColumnsGridModel } from './portfolio-grid.model';

interface IPortfoliosGridProps {
  data: IPortfolio[];
  teamMembers: ITeamMember[];
}
export function PortfoliosGrid({ data, teamMembers }: IPortfoliosGridProps) {
  const store = PortfolioStore((state) => state);
  const [portfolioData, setPortfolioData] = useState<IPortfolio[]>(
    data.filter((d: IPortfolio) => !d.isArchived),
  );
  //default to active portfolios
  const [filterValue, setFilterValue] = useState<boolean>(false);

  useEffect(() => {
    setPortfolioData(data.filter((d: IPortfolio) => d.isArchived === filterValue));
  }, [data]);
  const onCloseForm = () => {
    store.setPortfolioFormOpen(false);
    store.setDeletePortfolioOpen(false);
    store.setArchivePortfolioOpen(false);
    store.setPortfolioId({});
  };
  const toggleArchived = (event: SwitchChangeEvent) => {
    setFilterValue(event.target.value);
    setPortfolioData(data.filter((d: IPortfolio) => d.isArchived === event.target.value));
  };
  return (
    <>
      <DataGrid
        data={portfolioData}
        columnModel={portfoliosColumnsGridModel as Record<DataGridColumn, any>[]}
        customCellComponents={CustomCellCollection}
        title={`${filterValue ? 'Archived' : 'Active'} Portfolios`}
        count
        countStrings={{ singular: 'portfolio', plural: 'portfolios' }}
        button
        switchFilter
        switchLabel="Show Archived"
        switchFilterAction={toggleArchived}
        btnText="Add new Portfolio"
        BtnOnClick={() => store.setPortfolioFormOpen(true)}
      />
      {store.portfolioFormOpen && <PortfolioForm onClose={onCloseForm} teamMembers={teamMembers} />}
      {store.deletePortfolioOpen && <DeletePortfolio onClose={onCloseForm} portfolioId={1} />}
      {store.archivePortfolioOpen && <ArchivePortfolio onClose={onCloseForm} portfolioId={1} />}
    </>
  );
}
