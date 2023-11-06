import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Modal } from '@tauruseer/core';
import React, { useEffect } from 'react';
import { IDataSourceData, TMappedAsset } from '@tauruseer/module';
import { useFetcher } from '@remix-run/react';
import { Switch } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';

const UPDATE_ASSET = 'updateAsset';
interface IAssetMapppingProps {
  onClose: () => void;
  selectedAsset: TMappedAsset | null;
  setSelectedAsset: (asset: TMappedAsset) => void;
  dataSource: IDataSourceData;
}

export const AssetOptionsModal: React.FC<IAssetMapppingProps> = ({
  onClose,
  selectedAsset,
  setSelectedAsset,
  dataSource,
}) => {
  const [isWorkingItemSelected, setIsWorkingItemSelected] = React.useState<boolean>(
    selectedAsset?.hasSyncedWorkItems || false,
  );
  const [hasSubmitted, setHasSubmitted] = React.useState<boolean>(false);
  const dataSourceFetch = useFetcher();
  const isLoading = dataSourceFetch.state !== 'idle' ? true : false;

  const addRepoToProductHandler = async () => {
    if (!isLoading && selectedAsset) {
      setHasSubmitted(true);
      dataSourceFetch.submit(
        // Intent is checked in the page actions
        {
          intent: UPDATE_ASSET,
          assetId: selectedAsset.id,
          syncWorkItem: isWorkingItemSelected ? 'sync' : 'no-sync',
        },
        { method: 'post' },
      );
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setIsWorkingItemSelected((prevState) =>
        hasSubmitted ? prevState : selectedAsset?.hasSyncedWorkItems || false,
      );
      setHasSubmitted(false);
    }
  }, [isLoading, selectedAsset]);

  return (
    <Modal title={'Edit Repository'} onClose={onClose}>
      <section className="container-fluid w-100">
        <label>Repositories</label>
        <DropDownList
          data={dataSource.mappedAssets}
          size="medium"
          fillMode="outline"
          rounded="medium"
          value={selectedAsset}
          textField="name"
          dataItemKey="name"
          onChange={(e) => setSelectedAsset(e.target.value)}
          defaultValue="Select Source"
          className="flex-grow-0"
          loading={isLoading}
          disabled={isLoading}
        />

        <p className="typography-body1 fw-semibold mb-0 mt-4">Repository Configurations</p>
        <div className="d-flex flex-row align-items-center mt-2">
          <Switch
            checked={isWorkingItemSelected}
            onChange={(e) => setIsWorkingItemSelected(e.target.value)}
            name="workingItem"
            disabled={isLoading}
          />

          <label className="ms-2" htmlFor="workingItem">
            Sync Work Tracking Items
          </label>
        </div>
        <footer className="d-flex justify-content-end mt-4">
          <Button
            themeColor={'light'}
            fillMode="solid"
            size="large"
            className="button button-secondary mx-2 typography-body2 font-normal"
            rounded="medium"
            disabled={isLoading}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className="k-button k-button-lg k-button-solid k-button-solid-dark k-rounded-md button button-primary"
            onClick={addRepoToProductHandler}
            disabled={isLoading}
          >
            Save Repository
          </Button>
        </footer>
      </section>
    </Modal>
  );
};
