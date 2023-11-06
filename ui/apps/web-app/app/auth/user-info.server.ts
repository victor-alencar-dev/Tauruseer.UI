import { http, tokenInterceptor } from '@tauruseer/api';
export const getUserInformation = async (): Promise<any> => {
  return await http.get(`accounts/user`).catch((error) => console.log(error));
};
export const getAccountInformation = async (): Promise<any> => {
  return await http.get(`accounts/details`).catch((error) => console.log(error));
};
export const getAccountDataSources = async (): Promise<any> => {
  return await http.get(`oauth/getall`).catch((error) => console.log(error));
};

export const getLoginInformation = async (token: string) => {
  tokenInterceptor(token);
  const user = await getUserInformation();
  const account = await getAccountInformation();
  const userInfo = user;
  const accountInfo = account;
  const {
    data: { fullName, email, gravatar, isAdmin },
  } = userInfo;
  const {
    data: { accountId, accountApiKey, name },
  } = accountInfo;
  // until onboarding is working set to false
  const isOnboardingNeeded = false;
  return {
    fullName,
    email,
    isOnboardingNeeded,
    accountId,
    gravatar,
    accountApiKey,
    isAdmin,
    accountName: name,
  };
};
