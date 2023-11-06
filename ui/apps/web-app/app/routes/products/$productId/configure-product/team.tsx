import { ActionArgs, ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  getTeamMembers,
  getTeamMembersByProduct,
  mapTeamMembersToProducts,
  setTeamMembers,
  tokenInterceptor,
} from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { PRODUCT_TEAM_ACTION, TeamsContainer } from '@tauruseer/module';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const params = await request.formData();
  const { payload: payload } = Object.fromEntries(params);
  const token = await checkAuth(request);
  tokenInterceptor(token);
  if (payload) {
    const teamMemberData = JSON.parse(payload.toString());
    switch (teamMemberData.action) {
      case PRODUCT_TEAM_ACTION.ADD_TEAM_MEMBER: {
        delete teamMemberData['action'];
        const response = await setTeamMembers(teamMemberData).catch((error) => {
          const { data, status } = error.response;
          return { data, status };
        });
        if (response.status === 400) {
          const { data } = response;
          return { error: true, message: data.value };
        }
        //because we receive the team member id as successful response
        if (!isNaN(response)) {
          return {
            successCreated: true,
            message: 'Team Member created successfully',
          };
        }
        break;
      }
      case PRODUCT_TEAM_ACTION.MAP_EXISTING_USER: {
        delete teamMemberData['action'];
        const { teamMemberIdList } = teamMemberData;
        const response = await mapTeamMembersToProducts(teamMemberData).catch((error) => {
          const { data, status } = error.response;
          return { data, status };
        });
        if (response.status === 400) {
          const { data } = response;
          return { error: true, message: data.value };
        }
        return {
          successCreated: true,
          message: `User${teamMemberIdList.length > 1 ? 's' : ''} assigned successfully`,
        };
      }
    }
  }
};
export const loader: LoaderFunction = async ({ request, params }) => {
  const { productId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const teams = await getTeamMembersByProduct(`${productId}`);
  const accountTeamMember = await getTeamMembers();
  return { teams, accountTeamMember };
};

export default function TeamsContainerRender() {
  const { teams, accountTeamMember } = useLoaderData();
  let accountTeams = [];
  // filter no mapped users
  if (accountTeamMember.length) {
    accountTeams = accountTeamMember.filter(
      (a: { id: number }) => !teams.some((t: { id: number }) => t.id === a.id),
    );
  }
  return <TeamsContainer team={teams} accountMembers={accountTeams} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
