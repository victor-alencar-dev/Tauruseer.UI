import { LoaderArgs, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getAssetList, getExternalServices, tokenInterceptor } from '@tauruseer/api';
import { Error } from '@tauruseer/core';
import { AssetDiscovery } from '@tauruseer/module';
import { LinkAssetDList } from '@tauruseer/ui';
import { checkAuth } from '../../auth/auth.service.server';
export const links = () => LinkAssetDList;
export function meta() {
  return { title: 'Asset Discovery' };
}
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const token = await checkAuth(request);
  tokenInterceptor(token);
  const response = await getAssetList();
  const dataSources = await getExternalServices();

  return { ...response?.data, isConnectedToDataSources: dataSources.length > 0 };
};
export default function Index() {
  const data = useLoaderData();

  const {
    unmappedDataSources,
    percentUnmanagedString,
    isConnectedToDataSources,
    isPendingReconciliation,
  } = data;
  return (
    <>
      <AssetDiscovery
        data={unmappedDataSources}
        isPendingReconciliation={isPendingReconciliation}
        percentUnmanagedString={percentUnmanagedString}
        isConnectedToDataSources={isConnectedToDataSources}
      />
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
