import { ITicketData } from '@tauruseer/core';
import { http } from '../fetch-client.server';

type TReferences = 'CodeAnalysisIssueId' | 'ProductId' | 'InsightId';

export const createNewWorkItem = async (ticketData: { [key: string]: any }) => {
  const payload: ITicketData = {
    name: '',
    description: '',
    workItemType: 2,
    type: '',
    status: 'Active',
    workItemState: 1,
    priority: 'High',
    productId: -1,
    referenceId: -1,
    referenceType: -1,
    effort: 0,
    remainingWork: 0,
    createdByEmail: '',
    createdByDisplayName: '',
    modifiedByEmail: '',
    modifiedByDisplayName: '',
    assignedToEmail: '',
    assignedToDisplayName: '',
    externalServiceID: 7, // We only have Jira for now
    externalID: 0,
    externalUrl: '',
    isBug: true,
    isFeature: true,
    assignedToTeamMemberId: -1,
    closedByTeamMemberId: 0,
    createdByTeamMemberId: -1,
    workTrackingProjectId: -1,
    ...ticketData,
  };

  const { data } = await http.post(`work-items/new-work-item`, JSON.stringify(payload));

  return data;
};

export const getWorkItemByReference = async (referenceId: string, referenceType: TReferences) => {
  const { data } = (await http.get(`work-items/reference/${referenceId}/${referenceType}`)) ?? {
    data: [],
  };

  return data;
};

export const getWorkItemById = async (workItemId: string) => {
  const { data } = await http.get(`work-items/${workItemId}`);

  return data;
};
