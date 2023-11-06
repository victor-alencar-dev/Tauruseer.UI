import { ActionFunction, LoaderFunction } from '@remix-run/node';
import {
  getProductsDetail,
  tokenInterceptor,
  getVulnerabilitiesAIRemediation,
} from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import {
  ACCEPT_RISK_INTENT,
  CodeVulnerabilityDetails,
  TCodeVulnerability,
} from '@tauruseer/module';
import { LinkCommonProductStyles, LinkVulnerabilityRemediation } from '@tauruseer/ui';
import { useLoaderData } from 'react-router';
import { checkAuth } from '../../../../auth/auth.service.server';
import {
  acceptRiskOnCodeIssue,
  getCodeVulnerabilitiesDetail,
} from 'apps/web-app/app/api/products/code-analysis.server';
import { LinkCodeVulnerabilitiesDetails } from 'apps/web-app/app/ui/products/code-vulnerabilities.link';

export const links = () => [
  ...LinkVulnerabilityRemediation,
  ...LinkCommonProductStyles,
  ...LinkCodeVulnerabilitiesDetails,
];

export const action: ActionFunction = async ({ request, params }) => {
  const { productId } = params;
  const formData = await request.formData();
  // Depending on the intent value, we either redirect to the data source authentication page, or we add or remove a repository from the data source.
  const intent = formData.get('intent');
  const instanceIds = JSON.parse(String(formData.get('instanceId'))) ?? [];
  const token = await checkAuth(request);
  tokenInterceptor(token);

  switch (intent) {
    case ACCEPT_RISK_INTENT: {
      // Accepts risk for a vulnerability
      const res =
        productId && instanceIds.length > 0
          ? await acceptRiskOnCodeIssue(instanceIds, Number(productId))
          : null;

      return res;
    }

    default:
      console.log('No intent found');
      return null;
  }
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { productId, hash } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const { data: product } = await getProductsDetail(productId as string);
  const codeVulnerability: TCodeVulnerability = await getCodeVulnerabilitiesDetail(
    hash as string,
    productId as string,
  );
  const codeVulnerabilityDescription = codeVulnerability.htmlDescription;
  const workItem = null;

  const aiRemediation = hash
    ? await getVulnerabilitiesAIRemediation(codeVulnerability.ruleId, 'Code', true)
    : null;

  return {
    product,
    productId,
    codeVulnerability,
    codeVulnerabilityDescription,
    workItem,
    aiRemediation,
  };
};

export default function VulnerabilitiesPage() {
  const {
    product,
    productId,
    codeVulnerability,
    codeVulnerabilityDescription,
    workItem,
    aiRemediation,
  }: any = useLoaderData();

  return (
    <CodeVulnerabilityDetails
      productId={productId}
      product={product}
      codeVulnerability={codeVulnerability}
      codeVulnerabilityDescription={codeVulnerabilityDescription}
      workItem={workItem}
      aiRemediation={aiRemediation}
    />
  );
}

export function ErrorBoundary(error: { error: Error }) {
  console.log(error);
  return <Error error={error.error} />;
}
