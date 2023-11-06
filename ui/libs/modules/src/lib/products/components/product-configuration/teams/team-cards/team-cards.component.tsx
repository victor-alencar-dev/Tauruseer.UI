import { ITeamMember } from '../../../../model/teams.interface';
import { TeamCardItem } from './team-card-item.component';

interface TeamCardsProps {
  team: ITeamMember[];
}

export const TeamCards = ({ team }: TeamCardsProps) => {
  return (
    <div className="row">
      {team.map((member, index) => (
        <TeamCardItem key={index} member={member} />
      ))}
    </div>
  );
};
