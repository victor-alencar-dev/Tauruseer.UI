import { ActionArgs, ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import {
  addBitbucketPersonalToken,
  addSonarQubePersonalToken,
  deleteDataSource,
  getDataSourceReDirectionLink,
  getExternalServices,
  getMappedAssets,
  getUnmappedCodeAnalysisProjects,
  getUnmappedSourceRepositories,
  getUnmappedWorkTrackingProjects,
  getWorkTrackingToolsPerProduct,
  mapMultipleCodeAnalysisProjectsToProduct,
  mapMultipleRepositoriesToProduct,
  mapMultipleWorkTrackingProjectsToProduct,
  tokenInterceptor,
  updateAssetMapping,
} from '@tauruseer/api';
import { Error, ExternalService, ServiceConfiguration } from '@tauruseer/core';
import {
  DataSource,
  IDataSourceMappedAsset,
  IDataSourceUnmappedAsset,
  IExternalService,
  IUnmappedCodeAnalysisProject,
  IUnmappedWorkTrackingProject,
  IUserDataSource,
  IWorkTrackingTool,
} from '@tauruseer/module';
import { LinkDataSource } from '@tauruseer/ui';
import { checkAuth } from 'apps/web-app/app/auth/auth.service.server';
import { commitSession, getSession } from 'apps/web-app/app/auth/session.server';
import { useLoaderData } from 'react-router';

// Intents
const ADD_ASSET = 'addAsset';
const UPDATE_ASSET = 'updateAsset';
const ADD_PERSONAL_TOKEN = 'addPersonalAccessToken';
const DISCONNECT = 'disconnect';
const AUTHORIZE = 'authorize';

export const links = () => LinkDataSource;

export const action: ActionFunction = async ({ request, params }: ActionArgs) => {
  // We get the data source from the form data
  const formData = await request.formData();
  // Depending on the intent value, we either redirect to the data source authentication page, or we add or remove a repository from the data source.
  const intent = formData.get('intent');
  const syncWorkItem = formData.get('syncWorkItem') === 'sync';
  const token = await checkAuth(request);
  tokenInterceptor(token);
  switch (intent) {
    case ADD_ASSET: {
      const assetListString = formData.get('assetIdList')?.toString();
      const assetList = JSON.parse(assetListString || '[]');
      const configurationType = formData.get('configurationType')?.toString();

      if (
        configurationType === ServiceConfiguration.Repository ||
        configurationType === ServiceConfiguration.RepositoryAndTrackingTool
      ) {
        return assetList && params.productId
          ? await mapMultipleRepositoriesToProduct(assetList, params.productId, syncWorkItem)
          : null;
      } else if (configurationType === ServiceConfiguration.TrackingTool) {
        return assetList && params.productId
          ? await mapMultipleWorkTrackingProjectsToProduct(assetList, params.productId, true)
          : null;
      } else if (configurationType === ServiceConfiguration.CodeAnalysisProject) {
        return assetList && params.productId
          ? await mapMultipleCodeAnalysisProjectsToProduct(assetList, params.productId, true)
          : null;
      }
      return null;
    }

    case AUTHORIZE: {
      // Starts the authorization process for a data source
      const { dataSource } = Object.fromEntries(formData);
      const { data } = await getDataSourceReDirectionLink(`${dataSource}`);

      // We save the current url in a cookie so we can redirect back to it after the data source authentication
      const headers = new Headers();
      const url = new URL(request.url);
      const { pathname } = url;
      const session = await getSession(request.headers.get('Cookie'));
      session.set('redirectUrl', pathname);
      headers.append('Set-Cookie', await commitSession(session));

      // We redirect to the data source authentication page
      return redirect(data, { headers });
    }

    case UPDATE_ASSET: {
      // Updates the sync work item value for a repository

      const assetId = formData.get('assetId')?.toString();
      const syncWorkItem = formData.get('syncWorkItem') === 'sync';
      const res = assetId ? await updateAssetMapping(assetId, syncWorkItem) : null;
      return res;
    }

    case ADD_PERSONAL_TOKEN: {
      // Adds a personal token to the data source
      const token = formData.get('token')?.toString();
      const baseUrl = formData.get('baseUrl')?.toString();
      const expireDate = formData.get('expireDate')?.toString();
      const userName = formData.get('userName')?.toString();
      const dataSource = formData.get('dataSource')?.toString();

      if (dataSource === ExternalService.BitbucketServer) {
        return baseUrl && token
          ? await addBitbucketPersonalToken(baseUrl, token, userName, expireDate)
          : null;
      } else if (dataSource === ExternalService.Sonar) {
        return baseUrl && token
          ? await addSonarQubePersonalToken(baseUrl, token, expireDate)
          : null;
      } else {
        return null;
      }
    }

    case DISCONNECT: {
      // Deletes a data source
      const uniqueId = formData.get('uniqueId')?.toString();
      const res = uniqueId ? deleteDataSource(uniqueId) : null;
      return res;
    }

    default:
      console.log('No intent found');
      return null;
  }
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { productId } = params;
  const token = await checkAuth(request);
  tokenInterceptor(token);

  // We need to get the accoundApiKey
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');
  const extraParams = user.extraParams;
  const userInfo = extraParams.userInfo;
  const accountApiKey = userInfo.accountApiKey;

  const externalServices = await getExternalServices();

  // Removes duplicate external services. This shouldn't be necessary, since the backend should take care of it, but there are some duplicates in the database.
  const externalServicesUnique = externalServices.reduce((acc: IExternalService[], service) => {
    if (!acc.some((s: IExternalService) => s && s?.uniqueId === service.uniqueId)) {
      return [...acc, service];
    }
    return [...acc];
  }, []);

  // Gets assets from the external services and maps them into the data structure that the frontend expects
  const assetPromises = externalServicesUnique.map((service: any) => {
    return productId ? getMappedAssets(productId?.toString(), service.externalServiceId) : null;
  });

  const assetResponses: (IDataSourceMappedAsset[] | null)[] = await Promise.all(assetPromises);

  // For repositories that also have work tracking items (like GitHub), we need to get the work tracking project id from the backend

  const workTrackingItems = productId ? await getWorkTrackingToolsPerProduct(productId) : [];

  // Flats asset responses and removes duplicates
  const flatResponses = assetResponses?.flat();
  const mappedAssets = flatResponses.map((asset: IDataSourceMappedAsset | null) => ({
    url: asset?.urlInfo,
    userName: asset?.userName,
    name: asset?.name,
    externalServiceId: asset?.externalServiceId,
    id: asset?.assetId,
    referenceId: asset?.referenceId,
    scanKey: asset?.uniqueId,
    mappingType: asset?.assetMappingType,
    hasSyncedWorkItems: workTrackingItems.some(
      (item: IWorkTrackingTool) => asset?.name === item.name,
    ),
  }));

  // Gets unmapped repos and workTrackingProjects from the external services and maps them into the data structure that the frontend expects
  const unmappedRepos = await getUnmappedSourceRepositories();
  const unmappedWorkTrackingProjects = await getUnmappedWorkTrackingProjects();
  const unmappedCodeAnalysisProjects = await getUnmappedCodeAnalysisProjects();

  // Removes duplicate repos and work tracking projects. This shouldn't be necessary, since the backend should take care of it, but there are some duplicates in the database.
  const unmappedReposUnique = unmappedRepos.reduce(
    (acc: IDataSourceUnmappedAsset[], repo: IDataSourceUnmappedAsset) => {
      if (!acc.some((r: IDataSourceUnmappedAsset) => r && r?.referenceId === repo.referenceId)) {
        return [...acc, repo];
      }
      return [...acc];
    },
    [],
  );

  const unmappedWorkTrackingProjectsUnique = unmappedWorkTrackingProjects.reduce(
    (acc: IUnmappedWorkTrackingProject[], repo: IUnmappedWorkTrackingProject) => {
      if (
        !acc.some(
          (r: IUnmappedWorkTrackingProject) =>
            r && r?.referenceProjectId === repo.referenceProjectId,
        )
      ) {
        return [...acc, repo];
      }
      return [...acc];
    },
    [],
  );

  // Maps the unmapped repos and work tracking projects into the data structure that the frontend expects

  const unmappedRepositoryAssets = unmappedReposUnique.map((repo: IDataSourceUnmappedAsset) => ({
    url: repo.externalUrl,
    name: repo.name,
    externalServiceId: repo.repoProvider,
    id: repo.sourceRepoId,
    isWorkTrackingProject: false,
  }));

  const unmappedWorkTrackingAssets = unmappedWorkTrackingProjectsUnique.map(
    (repo: IUnmappedWorkTrackingProject) => ({
      url: repo.externalUrl,
      name: repo.name,
      externalServiceId: repo.externalServiceId,
      id: repo.workTrackingProjectId,
      isWorkTrackingProject: true,
    }),
  );

  const unmappedCodeAnalysisAssets = unmappedCodeAnalysisProjects.map(
    (repo: IUnmappedCodeAnalysisProject) => ({
      url: '',
      name: repo.name,
      externalServiceId: repo.externalServiceId,
      id: repo.codeAnalysisProjectId,
      isWorkTrackingProject: false,
    }),
  );

  return {
    externalServices: externalServicesUnique,
    mappedAssets,
    unmappedAssets: [
      ...unmappedRepositoryAssets,
      ...unmappedWorkTrackingAssets,
      ...unmappedCodeAnalysisAssets,
    ],
    assetPromises,
    assetResponses,
    externalServicesUnique,
    flatResponses,
    accountApiKey,
  };
};

export default function DataSourcesPage() {
  const { externalServices, mappedAssets, unmappedAssets, accountApiKey }: any = useLoaderData();

  // Gets user data sources information from externalServices
  const userDataSources: IUserDataSource[] = externalServices.map(
    (externalService: IExternalService) => ({
      uniqueId: externalService.uniqueId,
      source: externalService.externalServiceName,
      expiresIn: externalService.expiresIn === null ? null : new Date(externalService.expiresIn),
      userName: externalService.userName,
      urlInfo: externalService.urlInfo,
      connected: true,
      mappedAssets: mappedAssets.filter(
        (asset: { externalServiceId: number }) =>
          asset.externalServiceId === externalService.externalServiceId,
      ),
      unmappedAssets: unmappedAssets.filter(
        (asset: { externalServiceId: number }) =>
          asset.externalServiceId === externalService.externalServiceId,
      ),
      externalServiceId: externalService.externalServiceId,
    }),
  );

  return (
    <DataSource
      userDataSources={userDataSources}
      mappedAssets={mappedAssets}
      accountApiKey={accountApiKey}
    />
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
