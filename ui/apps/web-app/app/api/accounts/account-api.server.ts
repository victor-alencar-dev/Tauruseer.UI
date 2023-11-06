import { http } from '@tauruseer/api';
import { Account, User } from '@tauruseer/module';

export const getAccountsList = async () => {
  return await http.get(`accounts`);
};

export const getAccountDetails = async (accountId: string): Promise<any> => {
  return await http.get(`accounts/details/${accountId}`);
};

export const saveAccountDetails = async (account: Account) => {
  const { id, name, description, businessTypeId } = account;
  const params = {
    accountId: id,
    name: name,
    description: description,
    businessType: Number(businessTypeId),
  };
  return await http.post(`accounts`, JSON.stringify(params));
};

export const getAccountUsers = async (accountId: string) => {
  const { data } = await http.get(`accounts/users?accountId=${accountId}`);
  return data || [];
};

export const saveAccountUser = async (user: User): Promise<any> => {
  return await http.post(`accounts/users`, JSON.stringify(user));
};
