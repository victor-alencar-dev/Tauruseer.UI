import { Avatar } from '@progress/kendo-react-layout';
import React from 'react';
import { ITeamMember } from '../../../model/teams.interface';

export const ItemAvatar = ({ gravatarUrl, primaryEmail, name, imgUrl }: ITeamMember) => {
  const avatar = imgUrl || gravatarUrl;
  return (
    <span className="d-flex   ms-2 w-100 align-items-center">
      <Avatar type={avatar ? 'image' : 'icon'} size="medium">
        {avatar ? (
          <img src={avatar} alt="team-member-avatar" />
        ) : (
          <span className="k-icon k-i-user" />
        )}
      </Avatar>
      <div className="ms-3">
        <label className="d-block typography-h3"> {name}</label>
        <label className="typography-h3 text-muted">{primaryEmail}</label>
      </div>
    </span>
  );
};

export const AvatarList = (el: React.ReactElement<HTMLDivElement>, values: any) => {
  const { dataItem } = values;
  return React.cloneElement(el, el.props, <ItemAvatar {...dataItem} />);
};

export const AvatarRenderValue = (element: React.ReactElement<HTMLSpanElement>, value: any) => {
  if (!value) {
    return (
      <span className="d-flex me-3 ms-2  w-100 align-items-center">
        <div className="d-inline">
          <span className="text-xxlg">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
        <div className="d-inline ms-3">
          <span className="d-block  text-muted ">Select a user</span>
        </div>
      </span>
    );
  }
  return <ItemAvatar {...value} />;
};

export const RenderValueSimpleValue = (
  element: React.ReactElement<HTMLSpanElement>,
  value: any,
) => {
  if (!value) {
    return <span className="ms-2 p-2 mt-2 w-100 ff-montserrat"> Select User</span>;
  }
  return <span className="ms-2 p-2 w-100 mt-2 ff-montserrat"> {value.name} </span>;
};
