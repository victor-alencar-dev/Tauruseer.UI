import { ActionArgs, ActionFunction, LoaderArgs, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  getPortfolioDetail,
  getProductsList,
  setEditPortfolio,
  tokenInterceptor,
} from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { PORTFOLIO_ACTION_MSG, PortfolioProducts } from '@tauruseer/module';
import { LinkProductList } from '@tauruseer/ui';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';

export const links = () => LinkProductList;
export function meta() {
  return { title: 'Portfolios' };
}

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const params = await request.formData();
  const { payload: payload } = Object.fromEntries(params);
  const token = await checkAuth(request);
  let isValid = false;
  tokenInterceptor(token);
  if (payload) {
    const { portfolioId, productList } = JSON.parse(payload.toString());
    const response = await setEditPortfolio({ productIdList: productList }, portfolioId);
    if (!response) {
      isValid = !isValid;
    }
    return {
      success: isValid,
      message: isValid ? PORTFOLIO_ACTION_MSG.ADD_PRODUCTS : PORTFOLIO_ACTION_MSG.ACTION_ERROR,
    };
  }
};
export const loader: LoaderFunction = async ({ request, params }: LoaderArgs) => {
  const { portfolioId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const portfolioDetail = await getPortfolioDetail(`${portfolioId}`);
  const productList = await getProductsList();
  return { portfolioDetail: portfolioDetail, productList: productList.data };
};
export default function Index() {
  const { portfolioDetail, productList } = useLoaderData();
  return (
    <>
      <PortfolioProducts portfolioDetail={portfolioDetail} productsList={productList} />
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
