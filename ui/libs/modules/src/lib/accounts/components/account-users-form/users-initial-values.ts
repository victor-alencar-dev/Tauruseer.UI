import { USER_ACTIONS, User } from '@tauruseer/module';

export const initialUserValues = (user: User) => {
  const { firstName, lastName, email, isAccountAdmin, isActive, canViewAllProducts } = user;
  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
    isAdmin: isAccountAdmin,
    isActive: isActive,
    canViewAllProducts: canViewAllProducts,
  };
};

export const setPayloadForm = (values: any, userId: number | undefined) => {
  return {
    firstName: values?.firstName,
    userId: userId || null,
    lastName: values?.lastName,
    email: values?.email,
    isAccountAdmin: values?.isAdmin,
    canViewAllProducts: values?.canViewAllProducts,
    isActive: values?.isActive,
    action: userId ? USER_ACTIONS.USER_EDIT : USER_ACTIONS.USER_ADD,
  };
};
