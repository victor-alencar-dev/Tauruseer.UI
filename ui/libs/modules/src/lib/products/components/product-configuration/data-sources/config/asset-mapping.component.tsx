import { useFetcher } from '@remix-run/react';
import React from 'react';

import { Switch } from '@progress/kendo-react-inputs';
import { ServiceConfiguration } from '@tauruseer/core';
import { AssetsList } from './assets-list.component';
import { IDataSourceData } from '@tauruseer/module';
import { AddAssetModal } from './add-asset-modal.component';

interface IAssetMapppingProps {
  dataSource: IDataSourceData;
  dataSourceConfig: ServiceConfiguration;
  disabled?: boolean;
  hasWorkTrackingItem?: boolean;
  isWorkTracking: boolean;
}

const dataSourceCopy: {
  [key in ServiceConfiguration]: {
    assetName: string;
    assetDetail: string;
    plural: string;
    singular: string;
  };
} = {
  [ServiceConfiguration.Repository]: {
    assetName: 'Repositories',
    assetDetail: 'URL',
    plural: 'repositories mapped',
    singular: 'repository mapped',
  },
  [ServiceConfiguration.RepositoryAndTrackingTool]: {
    assetName: 'Repositories',
    assetDetail: 'URL',
    plural: 'repositories mapped',
    singular: 'repository mapped',
  },
  [ServiceConfiguration.TrackingTool]: {
    assetName: 'Work tracking projects',
    assetDetail: 'Tool',
    plural: 'Work tracking tools mapped',
    singular: 'Work tracking tool mapped',
  },
  [ServiceConfiguration.PersonalAccessToken]: {
    assetName: 'Repositories',
    assetDetail: 'URL',
    plural: 'repositories mapped',
    singular: 'repository mapped',
  },
  [ServiceConfiguration.CodeAnalysisProject]: {
    assetName: 'code analysis projects',
    assetDetail: 'URL',
    plural: 'code analysis projects mapped',
    singular: 'code analysis project mapped',
  },
  [ServiceConfiguration.OAuth]: {
    assetName: '',
    assetDetail: '',
    plural: '',
    singular: '',
  },
  [ServiceConfiguration.ScanKeys]: {
    assetName: '',
    assetDetail: '',
    plural: '',
    singular: '',
  },
};

export const AssetMapping: React.FC<IAssetMapppingProps> = ({
  dataSource,
  dataSourceConfig,
  disabled,
  hasWorkTrackingItem,
  isWorkTracking,
}) => {
  const copy = dataSourceCopy[dataSourceConfig];
  const { mappedAssets, unmappedAssets } = dataSource;
  const [isSyncWorkItem, setIsSyncWorkItem] = React.useState<boolean>(false);
  const dataSourceFetch = useFetcher();
  const isLoading = dataSourceFetch.state !== 'idle' ? true : false;

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const OpenModal = (open: boolean) => {
    setShowModal(open);
  };

  return (
    <>
      <div className="ds-asset-mapping col-12 my-3 px-0 gap-3">
        {hasWorkTrackingItem && (
          <div className="d-flex flex-row align-items-center mt-4">
            <Switch
              checked={isSyncWorkItem}
              onChange={(e) => setIsSyncWorkItem(e.target.value)}
              name="workingItem"
              disabled={isLoading}
            />

            <label className="ms-2" htmlFor="workingItem">
              Sync Work Tracking Items
            </label>
          </div>
        )}
      </div>
      <div className="col-12 col-lg-6 d-flex flex-fill my-3 px-0">
        {' '}
        <AssetsList
          mappedAssets={mappedAssets}
          description={{
            singular: copy.singular,
            plural: copy.plural,
          }}
          options={{
            modify: hasWorkTrackingItem,
          }}
          onOpenModal={OpenModal}
        />
      </div>
      {showModal && (
        <AddAssetModal
          assetDisplayName={copy.assetName}
          assets={unmappedAssets?.filter((asset) => asset.isWorkTrackingProject === isWorkTracking)}
          onClose={() => setShowModal(false)}
          dataSourceConfig={dataSourceConfig}
          isSyncWorkItem={isSyncWorkItem}
        ></AddAssetModal>
      )}
    </>
  );
};
