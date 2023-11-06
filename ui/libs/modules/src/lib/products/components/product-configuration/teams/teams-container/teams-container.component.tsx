import { Button } from '@progress/kendo-react-buttons';
import classNames from 'classnames';
import React from 'react';
import { ITeamMember } from '../../../../model/teams.interface';
import { TeamCards } from '../team-cards/team-cards.component';
import AddTeamMember from '../team-form/team-modal';
import TeamsDataGrid from '../teams-data-grid/teams-data-grid';
import { TeamsEmptyState } from './teams-empty-state.component';

interface TeamsContainerProps {
  team: ITeamMember[];
  accountMembers: ITeamMember[];
}
export type TeamsContainerView = 'cards' | 'data-grid';
export const TeamsContainer = ({ team, accountMembers }: TeamsContainerProps) => {
  const [view, setView] = React.useState<TeamsContainerView>('cards');
  const [toggle, setToggle] = React.useState<boolean>(false);
  const toggleDialog = () => {
    setToggle(!toggle);
  };
  const hasRecords = team.length > 0;
  const buttonSize = { width: '45', height: '40px' };
  const handleChangeView = (newView: TeamsContainerView) => () => setView(newView);
  const buttonClassName = (condition: boolean) => classNames('button', { selected: condition });

  return (
    <>
      <div className={`grid-container`}>
        <div className="d-flex justify-content-around p-4 align-items-center">
          <div className="w-50">
            <label className="d-block typography-h1">Team Members</label>
          </div>

          <div className=" d-flex w-50 justify-content-end">
            <Button
              fillMode="solid"
              size="small"
              className="button button-primary button-group me-4"
              themeColor="dark"
              onClick={toggleDialog}
              style={buttonSize}
            >
              <span className="k-icon k-i-plus" style={{ marginTop: '-2px' }}></span> Add
            </Button>
            <div className="button-group ">
              <Button
                className={buttonClassName(view === 'cards')}
                onClick={handleChangeView('cards')}
                style={buttonSize}
              >
                <span className="k-icon k-i-group"></span>
              </Button>

              <Button
                className={buttonClassName(view === 'data-grid')}
                onClick={handleChangeView('data-grid')}
                style={buttonSize}
              >
                <span className="k-icon k-i-grid-layout"></span>
              </Button>
            </div>
          </div>
        </div>

        {hasRecords && view === 'cards' && (
          <div style={{ padding: '10px 20px 40px 20px' }}>
            <TeamCards team={team} />
          </div>
        )}
        {!hasRecords && view === 'cards' && <TeamsEmptyState />}
        {view === 'data-grid' && <TeamsDataGrid data={team} />}
      </div>
      {toggle && <AddTeamMember onClose={toggleDialog} teamMembers={accountMembers} />}
    </>
  );
};
