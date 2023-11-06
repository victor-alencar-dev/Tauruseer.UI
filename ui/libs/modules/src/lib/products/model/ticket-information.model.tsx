import { FormDropDownList } from '@tauruseer/core';
import {
  AvatarList,
  AvatarRenderValue,
} from '../components/product-configuration/configure-product/custom-content-list';
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
