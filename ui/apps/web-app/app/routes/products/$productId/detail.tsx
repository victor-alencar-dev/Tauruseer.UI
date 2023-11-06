import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  getCodeVulnerabilitiesCount,
  getCognitionsCountByProductId,
  getPolicyViolationsCount,
  getProductsDetail,
  getRepositories,
  getSecurityControlsByProductId,
  getTimeline,
  getVulnerabilitiesCount,
  tokenInterceptor,
} from '@tauruseer/api';
import { Error, ReferenceTypes } from '@tauruseer/core';
import { ProductDetail } from '@tauruseer/module';
import { LinkProductDetail } from '@tauruseer/ui';
import { checkAuth } from '../../../auth/auth.service.server';

export const links = () => LinkProductDetail;
export const loader: LoaderFunction = async ({ request, params }) => {
  const { productId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  let vulnerabilityCount = 0;

  const promises = [
    getProductsDetail(`${productId}`),
    getCognitionsCountByProductId(`${productId}`),
    getSecurityControlsByProductId(`${productId}`),
    getPolicyViolationsCount(`${productId}`),
    getTimeline(`${productId}`, ReferenceTypes.ProductId),
    getVulnerabilitiesCount(`${productId}`),
    getCodeVulnerabilitiesCount(`${productId}`),
    getRepositories(`${productId}`),
  ];

  const responses = await Promise.all(promises);

  const [
    { data: product },
    cognitionCount,
    securityControls,
    policyViolationsSummary,
    timeLine,
    vulnerabilityCountResponse,
    codeVulnerabilitiesCount,
    repositories,
  ] = responses;

  if (vulnerabilityCountResponse.status !== 500 || vulnerabilityCountResponse.status !== 400) {
    const { count } = vulnerabilityCountResponse;
    vulnerabilityCount = count;
  }

  return {
    product,
    cognitionCount,
    vulnerabilityCount,
    policyViolationsSummary,
    securityControls,
    timeLine,
    codeVulnerabilitiesCount,
    repositories,
  };
};

export default function ProductsDetail() {
  const {
    product,
    cognitionCount,
    vulnerabilityCount,
    securityControls,
    policyViolationsSummary,
    timeLine,
    codeVulnerabilitiesCount,
    repositories,
  } = useLoaderData();
  return (
    <ProductDetail
      product={product}
      securityControls={securityControls}
      cognitionCount={cognitionCount}
      vulnerabilityCount={vulnerabilityCount || 0}
      policyViolationsSummary={policyViolationsSummary}
      timeLine={timeLine}
      codeVulnerabilityCount={codeVulnerabilitiesCount}
      repositories={repositories}
    />
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
