export interface ITeamMember {
  id: number;
  gravatarUrl: string;
  imgUrl: string;
  primaryEmail: string;
  startDate: string;
  endDate: string | null;
  isPending: boolean;
  name: string;
}

export const teamMembersBtnIndicator: Array<{ title: string; hasIndicator: boolean }> = [
  {
    title: 'Add Team Member',
    hasIndicator: false,
  },
  {
    title: 'Map to Existing Account user',
    hasIndicator: false,
  },
];
export enum mapActiveTeamMember {
  MapExistingMember = 1,
  NewTeamMember = 0,
}

export const PRODUCT_TEAM_ACTION = {
  MAP_EXISTING_USER: 'MAP_EXISTING_USER',
  ADD_TEAM_MEMBER: 'ADD_TEAM_MEMBER',
};
