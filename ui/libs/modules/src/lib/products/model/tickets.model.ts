import { FormDropDownList } from '@tauruseer/core';
import {
  AvatarList,
  AvatarRenderValue,
} from '../components/product-configuration/configure-product/custom-content-list';

export enum TrackItemStatus {
  WORK_ITEM_TOOL = 0,
  TICKET_INFO = 1,
  TICKET_CREATED = 2,
}

export enum HelperTextStatuses {
  MISSING = 'Missing',
  COMPLETE = 'Complete',
}

export const steps = [
  {
    label: 'Work Item Tool',
  },
  {
    label: 'Ticket Info',
  },
  {
    label: 'Ticket Created',
  },
];

export const workItemTools = ['Jira', 'Gitlab', 'Azure DevOps', 'Trello', 'Other'];
export const TicketFormData = {
  usersAssigned: [
    {
      display: 'd-flex',
      content: [
        {
          id: 'productOwner',
          name: 'productOwner',
          label: 'Product Owner',
          rounded: 'medium',
          itemRender: AvatarList,
          valueRender: AvatarRenderValue,
          style: { height: '50px' },
          textField: 'name',
          dataItemKey: 'teamMemberId',
          data: [],
          fillMode: 'outline',
          size: 'large',
          component: FormDropDownList,
        },
      ],
    },
  ],
};

export const workItemType = ['Story', 'Task', 'Bug'];
