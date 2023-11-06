export interface Account {
  id: number;
  name: string;
  description: string;
  businessTypeId?: string;
  users: User[];
}

export const defaultAccount: Account = {
  id: -1,
  name: '',
  description: '',
  users: [],
};

export interface User {
  id?: number;
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  apiKey?: string;
  role?: string;
  label?: string;
  gravatarUrl?: string;
  isActive?: boolean;
  canViewAllProducts?: boolean;
  isAccountAdmin?: boolean;
}

export const USER_ACTIONS = {
  USER_EDIT: 'USER_EDIT',
  USER_ADD: 'USER_ADD',
  USER_INACTIVE: 'USER_INACTIVE',
};

export const USER_ACTION_MSG = {
  ADD_USER: 'User added successfully',
  EDIT_USER: 'User successfully updated',
  ACTION_ERROR: 'There seems to be something that went wrong, Please try again',
  INACTIVE_USER: 'The Selected User has been set as inactive',
};
