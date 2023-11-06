import { Button } from '@progress/kendo-react-buttons';
import {
  CustomItem,
  ModalForm,
  Tag,
  expandedState,
  processMultiSelectTreeData,
} from '@tauruseer/core';
import { TMappedAsset } from '@tauruseer/module';
import { Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import {
  MultiSelectTree,
  MultiSelectTreeChangeEvent,
  MultiSelectTreeExpandEvent,
  MultiSelectTreeFilterChangeEvent,
  getMultiSelectTreeValue,
} from '@progress/kendo-react-dropdowns';
import { Error } from '@progress/kendo-react-labels';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FilterDescriptor } from '@progress/kendo-data-query';
import { useFetcher } from '@remix-run/react';

// Intents
const ADD_ASSET = 'addAsset';

interface IAddAssetModalProps {
  assetDisplayName: string;
  dataSourceConfig: string;
  isSyncWorkItem: boolean;
  onClose: () => void;
  assets?: TMappedAsset[];
}

const dataItemKey = 'id';
const checkField = 'checkField';
const checkIndeterminateField = 'checkIndeterminateField';
const subItemsField = 'items';
const expandField = 'expanded';
const textField = 'text';

const fields = {
  dataItemKey,
  checkField,
  checkIndeterminateField,
  expandField,
  subItemsField,
};

export const AddAssetModal: React.FC<IAddAssetModalProps> = ({
  assets,
  assetDisplayName,
  onClose,
  dataSourceConfig,
  isSyncWorkItem,
}) => {
  const data = assets?.length ? assets.map((asset) => ({ ...asset, text: asset.name })) : [];

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [value, setValue] = useState<any[]>([]);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<any>(data.length > 0 ? [data[0][dataItemKey]] : []);
  const [filter, setFilter] = useState<FilterDescriptor | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>();
  const [infoMessage, setInfoMessage] = useState<string>();
  const [messageType, setMessageType] = useState<string>();
  const dataSourceFetch = useFetcher();

  const treeData = useMemo(
    () =>
      processMultiSelectTreeData(data, {
        expanded,
        value,
        filter,
        ...fields,
      }),
    [expanded, value, filter],
  );

  const onChange = (event: MultiSelectTreeChangeEvent) => {
    setValue(getMultiSelectTreeValue(data, { ...fields, ...event, value }));
    setIsValid(value.length >= 0);
  };

  const onFilterChange = (event: MultiSelectTreeFilterChangeEvent) => setFilter(event.filter);

  const onExpandChange = useCallback(
    (event: MultiSelectTreeExpandEvent) => {
      console.log('EXPANDED');
      setExpanded(expandedState(event.item, dataItemKey, expanded));
    },
    [expanded],
  );

  const onSubmit = () => {
    setIsSubmitting(true);
    if (!value.length) {
      setIsValid(false);
      setIsSubmitting(false);
      return;
    }

    const assetToMap = value.map((u) => u?.id);
    console.log('ADD ASSET TO PRODUCT', assetToMap);
    addRepoToProductHandler(assetToMap);
  };

  const addRepoToProductHandler = async (assetsToMap: string[]) => {
    console.log('ADD ASSET TO PRODUCT', assetsToMap);
    if (!isSubmitting) {
      console.log('ADD ASSET TO PRODUCT');

      dataSourceFetch.submit(
        // Intent is check in the page actions
        {
          intent: ADD_ASSET,
          assetIdList: JSON.stringify(assetsToMap),
          configurationType: dataSourceConfig,
          syncWorkItem: isSyncWorkItem ? 'sync' : 'no-sync',
        },
        { method: 'post' },
      );
    }
  };

  useEffect(() => {
    const { data, type, state } = dataSourceFetch;

    if (type === 'done' && state === 'idle' && data?.success) {
      setMessageType('text-success');
      setInfoMessage(data?.message);
      setShowAlert(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    }
    if (type === 'done' && state === 'idle' && data?.error) {
      setMessageType('text-danger');
      setInfoMessage(data?.message);
      setShowAlert(true);
    }
    if (state === 'submitting' || state === 'loading') {
      setIsSubmitting(true);
    } else {
      setValue([]);
      setIsSubmitting(false);
    }
  }, [dataSourceFetch]);

  return (
    <ModalForm title={`Search for ${assetDisplayName}`} width={1012} onClose={onClose}>
      <>
        {showAlert && (
          <span className={`ms-3 text-ml font-bold ff-montserrat ${messageType}`}>
            {infoMessage}
          </span>
        )}
        <Form
          render={(formRenderProps: FormRenderProps) => (
            <FormElement style={{ width: '870px', marginTop: '0' }}>
              <div className="w-100">
                <MultiSelectTree
                  id="addAssetDropdown"
                  name="addAssetDropdown"
                  label={`Select one or multiple ${assetDisplayName.toLocaleLowerCase()}`}
                  rounded="medium"
                  className="multiselect-user-tree w-100"
                  textField={textField}
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  dataItemKey={dataItemKey}
                  fillMode="outline"
                  checkField={checkField}
                  valid={isValid}
                  checkIndeterminateField={checkIndeterminateField}
                  expandField={expandField}
                  data={treeData}
                  value={value}
                  filterable={true}
                  tag={Tag}
                  item={CustomItem}
                  onChange={onChange}
                  onFilterChange={onFilterChange}
                  onExpandChange={onExpandChange}
                />
                {!isValid && (
                  <Error className="d-flex align-items-center">
                    <i className="ts-brands ts-warning-circle"></i>
                    <span className="ms-1">
                      {' '}
                      {`Please select an existing ${assetDisplayName.toLocaleLowerCase()}`}{' '}
                    </span>
                  </Error>
                )}
              </div>
            </FormElement>
          )}
        />
        <div className="d-flex justify-content-end gap-2 mt-4 mb-">
          <Button disabled={isSubmitting} onClick={onClose} className="button button-secondary">
            Close
          </Button>
          <Button disabled={isSubmitting} className="button button-primary" onClick={onSubmit}>
            Map to Product
          </Button>
        </div>
      </>
    </ModalForm>
  );
};
