import { DataGrid, DataGridColumn, setColumnsWidthCell } from '@tauruseer/core';
import {
  teamsColumnGridColumnsWidth,
  teamsColumnGridModel,
} from '../../../../model/teams-data-grid.model';

import { ITeamMember } from '../../../../model/teams.interface';
import { TeamCustomCellCollection } from './teams-custom-columns';

interface ITeamDataGridProps {
  data: ITeamMember[];
}

const TeamDataGrid = ({ data }: ITeamDataGridProps) => {
  const columnsGridModelData = setColumnsWidthCell(
    teamsColumnGridModel,
    teamsColumnGridColumnsWidth,
  );
  return (
    <DataGrid
      data={data}
      customClass="data-grid-spaceless"
      columnModel={columnsGridModelData as Record<DataGridColumn, any>[]}
      customCellComponents={TeamCustomCellCollection}
      sortable={true}
    />
  );
};

export default TeamDataGrid;
