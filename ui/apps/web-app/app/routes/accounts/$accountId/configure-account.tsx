import {
  ActionArgs,
  ActionFunction,
  json,
  LoaderArgs,
  LoaderFunction,
  redirect,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  getAccountDetails,
  getAccountUsers,
  saveAccountDetails,
  saveAccountUser,
  tokenInterceptor,
} from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import {
  ConfigureAccounts,
  defaultAccount,
  USER_ACTION_MSG,
  USER_ACTIONS,
} from '@tauruseer/module';
import {
  checkAuth,
  getAccountId,
  isAccountAdmin,
  isAdminUser,
} from 'apps/web-app/app/auth/auth.service.server';
import { commitSession, getSession } from 'apps/web-app/app/auth/session.server';

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const params = await request.formData();
  const { account: accountFormEntry, user: userFormEntry, accountId } = Object.fromEntries(params);
  const session = await getSession(request.headers.get('Cookie'));
  const token = await checkAuth(request);
  tokenInterceptor(token);
  if (accountFormEntry) {
    const account = JSON.parse(accountFormEntry.toString());
    const { data } = await saveAccountDetails(account);
    if (account.id === -1) {
      const accountId = data;
      session.flash('is-new-account', true);
      return redirect(`/accounts/${accountId}/configure-account/account-details`, {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      });
    } else {
      return {
        successUpdate: true,
      };
    }
  }

  if (userFormEntry) {
    let isValid;
    let user = JSON.parse(userFormEntry.toString());
    if (!user.userId) {
      //backend stuff :(
      user.userId = -1;
    }
    user = {
      ...user,
      accountId,
    };

    const response = await saveAccountUser(user).catch((error) => {
      const { data, status } = error.response;
      return { data, status };
    });
    if (response.status === 500 || response.status === 400) isValid = false;
    if (response.data && response.data.userId) isValid = true;

    switch (user.action) {
      case USER_ACTIONS.USER_ADD: {
        return {
          success: isValid,
          message: isValid ? USER_ACTION_MSG.ADD_USER : USER_ACTION_MSG.ACTION_ERROR,
        };
      }
      case USER_ACTIONS.USER_EDIT: {
        return {
          success: isValid,
          message: isValid ? USER_ACTION_MSG.EDIT_USER : USER_ACTION_MSG.ACTION_ERROR,
        };
      }
      case USER_ACTIONS.USER_INACTIVE: {
        return {
          success: isValid,
          message: isValid ? USER_ACTION_MSG.INACTIVE_USER : USER_ACTION_MSG.ACTION_ERROR,
        };
      }
    }
  }
};

export const loader: LoaderFunction = async ({ request, params: { accountId } }: LoaderArgs) => {
  let account = defaultAccount;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  //Check is an admin user
  const isAdmin = await isAdminUser(request);
  const isAdminAccount = await isAccountAdmin(request);
  const currentAccountId = (await getAccountId(request)).accountId;
  //check is admin user and no account management
  if (!isAdmin && !isAdminAccount) throw new Response('', { status: 404 });
  if (Number(accountId) !== currentAccountId && isAdminAccount && !isAdmin) {
    throw new Response('', { status: 404 });
  }
  const session = await getSession(request.headers.get('Cookie'));
  const isNewAccount = session.get('is-new-account') || false;
  if (accountId !== 'new') {
    const { data } = await getAccountDetails(`${accountId}`);
    const { accountId: id, name, description, businessTypeId } = data;
    const response = await getAccountUsers(`${accountId}`);
    account = {
      id,
      name,
      description,
      businessTypeId,
      users: response.map((item: any) => ({
        ...item,
        id: item.userId,
      })),
    };
  }
  return json(
    {
      account,
      isNewAccount,
      showBreadCrumbs: isAdmin,
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  );
};

export default function AccountsDetail() {
  const { isNewAccount, account, showBreadCrumbs } = useLoaderData();
  return (
    <ConfigureAccounts
      showMessage={isNewAccount}
      account={account}
      showBreadCrumbs={showBreadCrumbs}
    />
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
