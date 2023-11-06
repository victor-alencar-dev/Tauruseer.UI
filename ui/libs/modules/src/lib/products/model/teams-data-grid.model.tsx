import { IGridColumnModel } from '@tauruseer/core';

export const teamsColumnGridModel: IGridColumnModel[] = [
  {
    field: 'user',
    title: 'User',
    customCell: 'UserCell',
    width: 250,
  },
  {
    field: 'startDate',
    title: 'Start Date',
    customCell: 'StartDateCell',
  },
  {
    field: 'endDate',
    title: 'End Date',
    customCell: 'EndDateCell',
  },
  {
    field: 'status',
    title: 'Status',
    customCell: 'StatusCell',
  },
  {
    field: 'primaryEmail',
    title: 'Email',
    customCell: 'EmailCell',
  },
];
export const teamsColumnGridColumnsWidth = {
  user: { laptop: 250, fullHD: 350, '2k': null },
};
