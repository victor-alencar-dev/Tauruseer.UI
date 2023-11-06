import { LoaderFunction } from '@remix-run/node';
import { getProductsDetail, getCodeVulnerabilities, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { IProducts, CodeVulnerabilitiesPage } from '@tauruseer/module';
import { LinkCommonProductStyles } from '@tauruseer/ui';
import { useLoaderData } from 'react-router';
import { checkAuth } from '../../../../auth/auth.service.server';

export const links = () => LinkCommonProductStyles;
export const loader: LoaderFunction = async ({ request, params }) => {
  const { productId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { data: product } = await getProductsDetail(`${productId}`);
  let dataResponse = {
    count: 0,
    scanId: 0,
    dependencyName: null,
    dependencyVersion: null,
    vulnerabilityList: [],
  };

  const responseActive = await getCodeVulnerabilities(`${productId}`).catch((error) => {
    const { data, status } = error.response;
    return { data, status };
  });

  if (
    responseActive.status !== 400 &&
    responseActive.status !== 404 &&
    responseActive.status !== 500
  ) {
    dataResponse = responseActive;
  }
  return { product, codeVulnerabilities: dataResponse };
};

export default function CodeVulnerabilitiesList() {
  const { product, codeVulnerabilities }: any = useLoaderData();

  return (
    <CodeVulnerabilitiesPage
      product={product as IProducts}
      codeVulnerabilityList={codeVulnerabilities}
    />
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
