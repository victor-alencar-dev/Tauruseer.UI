import { ActionArgs, ActionFunction, LoaderFunction, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  getCognitionsDetail,
  getProductsDetail,
  getTeamMembersByProduct,
  getVulnerabilitiesDetail,
  getWorkTrackingToolsPerProduct,
  tokenInterceptor,
  getCodeVulnerabilitiesDetail,
} from '@tauruseer/api';
import { Error, ITicketData } from '@tauruseer/core';
import {
  Tickets,
  getDescriptionFromCodeVulnerabilityData,
  getDescriptionFromCognitionData,
  getTitleFromCodeVulnerabilityData,
  getTitleFromCognitionData,
} from '@tauruseer/module';
import { LinkPrioritizedRisk } from '@tauruseer/ui';
import { createNewWorkItem } from 'apps/web-app/app/api/products/work-items-api.server';
import { getSession } from 'apps/web-app/app/auth/session.server';
import { checkAuth } from '../../../auth/auth.service.server';
import {
  getTitleFromVulnerabilityData,
  getDescriptionFromVulnerabilityData,
} from '@tauruseer/module';

export const links = () => [LinkPrioritizedRisk[1]];

export const loader: LoaderFunction = async ({ request, params }) => {
  const { productId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);

  // we get cveId from url parameters and cognitionId
  const url = new URL(request.url);
  const cve = url.searchParams.get('cve');
  const instanceId = url.searchParams.get('instanceId');
  const cognitionId = url.searchParams.get('cognitionId');
  const hash = url.searchParams.get('hash');

  let title, description;

  if (cve && instanceId) {
    const vulnerabilityData = cve ? await getVulnerabilitiesDetail(cve) : null;
    title = getTitleFromVulnerabilityData(vulnerabilityData);
    description = getDescriptionFromVulnerabilityData(vulnerabilityData, Number(instanceId));
  } else if (cognitionId && productId) {
    const cognitionData = await getCognitionsDetail(cognitionId, productId);
    title = getTitleFromCognitionData(cognitionData);
    description = getDescriptionFromCognitionData(cognitionData);
  } else if (hash) {
    const codeVulnerabilityData = await getCodeVulnerabilitiesDetail(hash);

    const codeVulnerability = codeVulnerabilityData.codeAnalysisIssueDetailList.find(
      (item: any) => {
        return String(item.codeAnalysisIssueId) === String(instanceId);
      },
    );
    title = getTitleFromCodeVulnerabilityData(codeVulnerability);
    description = getDescriptionFromCodeVulnerabilityData(codeVulnerability);
  }

  const { data: productDetails } = await getProductsDetail(`${productId}`);
  const workTrackingTools = productId ? await getWorkTrackingToolsPerProduct(productId) : [];

  const teamMembers = productId ? await getTeamMembersByProduct(productId) : [];

  return { productDetails, workTrackingTools, data: { teamMembers, title, description } };
};

export const action: ActionFunction = async ({ request, params }: ActionArgs) => {
  const token = await checkAuth(request);
  tokenInterceptor(token);

  const session = await getSession(request.headers.get('Cookie'));
  const {
    extraParams: { userInfo },
  } = session.get('user');

  const formData = await request.formData();
  const assignee = JSON.parse(formData.get('assignee') as string);
  const url = new URL(request.url);
  const vulnerabilityId = url.searchParams.get('cve');
  const insightId = Number(url.searchParams.get('cognitionId'));
  const instanceId = Number(url.searchParams.get('instanceId'));
  const hash = String(url.searchParams.get('hash'));

  let referenceType = -1;
  let referenceId;

  console.log(params, vulnerabilityId, insightId, instanceId);

  if (vulnerabilityId) {
    referenceType = 20;
    referenceId = Number(instanceId) as number;
  } else if (insightId > 0) {
    referenceType = 4;
    referenceId = Number(insightId);
  } else if (instanceId > 0) {
    referenceType = 19;
    referenceId = Number(instanceId) as number;
  }

  const ticketPayload: ITicketData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    type: 'Story',
    productId: Number(params.productId),
    referenceId: referenceId,
    referenceType: referenceType,
    createdByEmail: userInfo.email,
    createdByDisplayName: userInfo.fullName,
    assignedToEmail: assignee.primaryEmail,
    assignedToDisplayName: assignee.name,
    assignedToTeamMemberId: assignee.id,
    createdByTeamMemberId: userInfo.id,
    workTrackingProjectId: Number(formData.get('workTrackingProjectId')),
    externalServiceID: Number(formData.get('externalServiceID')),
  };

  try {
    await createNewWorkItem(ticketPayload);
    return redirect(
      vulnerabilityId
        ? `/products/${params.productId}/vulnerabilities/${vulnerabilityId}`
        : hash
        ? `/products/${params.productId}/code-vulnerabilities/${hash}`
        : insightId
        ? `/products/${params.productId}/cognitions/${insightId}`
        : `/products/${params.productId}/detail`,
    );
  } catch (e) {
    return json({ error: e }, { status: 500 });
  }
};

export default function TrackItemRoute() {
  const { productDetails, data } = useLoaderData();
  return <Tickets productDetail={productDetails} data={data} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
