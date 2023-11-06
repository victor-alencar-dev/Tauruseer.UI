import React, { createContext } from 'react';

import { ServiceConfiguration } from '@tauruseer/core';
import { useRevalidator } from 'react-router-dom';
import { IDataSourceData, TMappedAsset } from '@tauruseer/module';
import { AssetMapping } from './asset-mapping.component';
import { AssetOptionsModal } from './asset-options-modal.component';
import { OAuth } from './oauth.component';
import { ScanKeys } from './scan-keys.component';

const ICON_SIZE = '3.5rem';
const ICON_RIGHT_MARGIN = '3rem';

interface IDataSourceConfigFormProps {
  disabled?: boolean;
  isLoading?: boolean;
  dataSourceConfig: ServiceConfiguration;
  dataSource: IDataSourceData;
}

interface IAssetOptionsModalContext {
  showModal: boolean;
  selectedAsset: TMappedAsset | null;
  setShowModal: (show: boolean) => void;
  setSelectedAsset: (asset: TMappedAsset | null) => void;
}

export const AssetsOptionsModalContext = createContext<IAssetOptionsModalContext>({
  showModal: false,
  selectedAsset: null,
  setShowModal: () => {},
  setSelectedAsset: () => {},
});

export const NoDataFound: React.FC = () => {
  const revalidator = useRevalidator();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-5">
      <img
        src="/scan-result-empty.svg"
        alt="No data found"
        className="mb-4"
        style={{ width: ICON_SIZE, height: ICON_SIZE }}
      />
      <p className="typography-body1 font-normal text-center px-4">
        We are syncing assets. This operation can take a few minutes.
      </p>
      <button
        className="k-button k-button-lg k-button-solid k-button-solid-dark k-rounded-md button button-primary"
        onClick={() => {
          revalidator.revalidate();
        }}
      >
        Refresh
      </button>
    </div>
  );
};

export const DataSourceConfigForm: React.FC<IDataSourceConfigFormProps> = ({
  dataSourceConfig,
  dataSource,
}) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = React.useState<TMappedAsset | null>(null);
  // Sorts assets alphabetically

  const formSelector = () => {
    const isDataAvailable =
      (dataSource.mappedAssets?.length ?? 0) > 0 || (dataSource.unmappedAssets?.length ?? 0) > 0;

    switch (dataSourceConfig) {
      case ServiceConfiguration.CodeAnalysisProject:
      case ServiceConfiguration.Repository: {
        if (isDataAvailable) {
          return (
            <AssetMapping
              dataSource={dataSource}
              dataSourceConfig={dataSourceConfig}
              isWorkTracking={false}
            />
          );
        } else {
          return <NoDataFound />;
        }
      }
      case ServiceConfiguration.TrackingTool: {
        if (isDataAvailable) {
          return (
            <AssetMapping
              dataSource={dataSource}
              dataSourceConfig={dataSourceConfig}
              isWorkTracking={true}
            />
          );
        } else {
          return <NoDataFound />;
        }
      }
      case ServiceConfiguration.RepositoryAndTrackingTool: {
        if (isDataAvailable) {
          return (
            <AssetMapping
              dataSource={dataSource}
              dataSourceConfig={dataSourceConfig}
              hasWorkTrackingItem={true}
              isWorkTracking={false}
            />
          );
        } else {
          return <NoDataFound />;
        }
      }
      case ServiceConfiguration.OAuth:
        return <OAuth dataSource={dataSource} dataSourceConfig={dataSourceConfig} />;
      case ServiceConfiguration.ScanKeys:
        return <ScanKeys dataSource={dataSource} dataSourceConfig={dataSourceConfig} />;
      default:
        return <></>;
    }
  };

  return (
    <AssetsOptionsModalContext.Provider
      value={{
        showModal,
        selectedAsset,
        setShowModal,
        setSelectedAsset,
      }}
    >
      {showModal && (
        <AssetOptionsModal
          onClose={() => setShowModal(false)}
          dataSource={dataSource}
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
        />
      )}
      <section className="container-fluid w-100">
        <div
          className="row pb-4"
          style={{ padding: `0 76px 0 calc(${ICON_SIZE} + ${ICON_RIGHT_MARGIN})` }}
        >
          {formSelector()}
        </div>
      </section>
    </AssetsOptionsModalContext.Provider>
  );
};
