import { Avatar } from '@progress/kendo-react-layout';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { ITeamMember } from '../../../../model/teams.interface';
interface TeamCardItemProps {
  member: ITeamMember;
}

export const TeamCardItem = ({ member }: TeamCardItemProps) => {
  dayjs.extend(localizedFormat);
  return (
    <div
      className="border p-3 d-flex flex-column justify-content-between m-2"
      style={{ borderRadius: '5px', width: 340, height: 128 }}
    >
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <Avatar type="image" size="medium">
            <img src={member.gravatarUrl} alt="team-item-avatar" />
          </Avatar>

          <div className="ms-2">
            <div className="ff-ubuntu font-regular text-ml">{member.name}</div>
            <div className=" ff-ubuntu font-regular text-ml text-muted">{member.primaryEmail}</div>
          </div>
        </div>

        <span className="k-icon k-i-more-vertical"></span>
      </div>

      <div className="d-flex mt-2">
        <div className="col-6">
          <div className="ff-ubuntu font-regular text-md">Start Date</div>
          <div className=" ff-montserrat font-regular text-muted text-md">
            {member.startDate ? dayjs(member.startDate).format('LL') : 'No start date'}
          </div>
        </div>
        <div className="col-6">
          <div className="ff-ubuntu font-regular text-md">End Date</div>
          <div className="ff-montserrat font-regular text-muted text-md">
            {member.endDate ? dayjs(member.endDate).format('LL') : ' Still on project'}
          </div>
        </div>
      </div>
    </div>
  );
};
