import { ActionArgs, ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  deletePortfolio,
  getPortfoliosList,
  setCreatePortfolio,
  setEditPortfolio,
} from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { PORTFOLIO_ACTIONS, PORTFOLIO_ACTION_MSG, Portfolios } from '@tauruseer/module';
import { tokenInterceptor } from '../../api/fetch-client.server';
import { getTeamMembers } from '../../api/products/teams-members-api.server';
import { checkAuth, getAccountId } from '../../auth/auth.service.server';

export function meta() {
  return { title: 'Portfolios' };
}

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const params = await request.formData();
  const { payload: payloadFormEntry } = Object.fromEntries(params);
  const token = await checkAuth(request);
  const { accountId } = await getAccountId(request);
  let isValid = false;
  tokenInterceptor(token);
  if (payloadFormEntry) {
    let payload = JSON.parse(payloadFormEntry.toString());
    switch (payload.action) {
      case PORTFOLIO_ACTIONS.ADD_PORTFOLIO: {
        delete payload.action;
        delete payload.portfolioId;
        payload = {
          ...payload,
          accountId,
        };
        const response = await setCreatePortfolio(payload);
        if (Number.isInteger(response)) {
          isValid = !isValid;
        }
        return {
          success: isValid,
          message: isValid ? PORTFOLIO_ACTION_MSG.ADD_PORTFOLIO : PORTFOLIO_ACTION_MSG.ACTION_ERROR,
          data: { productId: isValid ? response : null },
        };
      }
      case PORTFOLIO_ACTIONS.EDIT_PORTFOLIO: {
        const id = payload.portfolioId;
        delete payload.action;
        delete payload.portfolioId;
        const response = await setEditPortfolio(payload, id);
        if (!response) {
          isValid = !isValid;
        }
        return {
          success: isValid,
          message: isValid
            ? PORTFOLIO_ACTION_MSG.EDIT_PORTFOLIO
            : PORTFOLIO_ACTION_MSG.ACTION_ERROR,
        };
      }
      case PORTFOLIO_ACTIONS.DELETE_PORTFOLIO: {
        const response = await deletePortfolio(payload.portfolioId);
        if (!response) {
          isValid = !isValid;
        }
        return {
          success: isValid,
          message: isValid
            ? PORTFOLIO_ACTION_MSG.DELETE_PORTFOLIO
            : PORTFOLIO_ACTION_MSG.ACTION_ERROR,
        };
      }
      case PORTFOLIO_ACTIONS.ARCHIVE_PORTFOLIO: {
        const response = await setEditPortfolio(
          { isArchived: payload.IsArchived },
          payload.portfolioId,
        );
        if (!response) {
          isValid = !isValid;
        }
        return {
          success: isValid,
          message: isValid
            ? PORTFOLIO_ACTION_MSG.ARCHIVE_PORTFOLIO
            : PORTFOLIO_ACTION_MSG.ACTION_ERROR,
        };
      }
      default:
        return { error: true, message: PORTFOLIO_ACTION_MSG.ACTION_ERROR };
    }
  }
};
export const loader: LoaderFunction = async ({ request }) => {
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const accountTeamMember = await getTeamMembers();
  const portfolio = await getPortfoliosList();
  return { portfolio, accountTeamMember };
};

export default function Index() {
  const { portfolio, accountTeamMember } = useLoaderData();
  return (
    <>
      <Portfolios data={portfolio} teamMembers={accountTeamMember} />
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
