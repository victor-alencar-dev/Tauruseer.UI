import { FilterDescriptor } from '@progress/kendo-data-query';
import { Button } from '@progress/kendo-react-buttons';
import {
  MultiSelectTree,
  MultiSelectTreeChangeEvent,
  MultiSelectTreeExpandEvent,
  MultiSelectTreeFilterChangeEvent,
  getMultiSelectTreeValue,
} from '@progress/kendo-react-dropdowns';
import { Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { useFetcher } from '@remix-run/react';
import {
  ModalForm,
  ProductCustomItem,
  Tag,
  expandedState,
  processMultiSelectTreeData,
} from '@tauruseer/core';
import { IProducts } from '@tauruseer/module';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface IPortfolioProducts {
  existingProduct: IProducts[];
  portfolioId?: number;
  onCancel: React.EventHandler<any>;
}

const dataItemKey = 'productId';
const checkField = 'checkField';
const checkIndeterminateField = 'checkIndeterminateField';
const subItemsField = 'items';
const expandField = 'expanded';
const textField = 'name';

const fields = {
  dataItemKey,
  checkField,
  checkIndeterminateField,
  expandField,
  subItemsField,
};
export const AddProductForm = ({ existingProduct, onCancel, portfolioId }: IPortfolioProducts) => {
  const fetcher = useFetcher();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [value, setValue] = useState<any[]>([]);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<any>(
    existingProduct.length ? [existingProduct[0][dataItemKey]] : [],
  );
  const [filter, setFilter] = useState<FilterDescriptor | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>();
  const [infoMessage, setInfoMessage] = useState<string>();
  const [messageType, setMessageType] = useState<string>();
  const cssClassValid = value.length && isValid ? 'value-detected' : '';
  useEffect(() => {
    const { data, type, state } = fetcher;
    if (type === 'done' && state === 'idle' && data?.success) {
      setMessageType('text-success');
      setInfoMessage(data?.message);
      setShowAlert(true);
      setTimeout(() => {
        onCancel(null);
      }, 3000);
    }
    if (type === 'done' && state === 'idle' && !data.success) {
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
  }, [fetcher]);

  // multiselect functions
  // taken from kendo suggested implementation
  const onChange = (event: MultiSelectTreeChangeEvent) => {
    setValue(getMultiSelectTreeValue(existingProduct, { ...fields, ...event, value }));
    setIsValid(value.length >= 0);
  };
  const onExpandChange = useCallback(
    (event: MultiSelectTreeExpandEvent) =>
      setExpanded(expandedState(event.item, dataItemKey, expanded)),
    [expanded],
  );
  const treeData = useMemo(
    () => processMultiSelectTreeData(existingProduct, { expanded, value, filter, ...fields }),
    [expanded, value, filter],
  );
  const onFilterChange = (event: MultiSelectTreeFilterChangeEvent) => setFilter(event.filter);
  // form action
  const addProductToPortfolio = () => {
    setIsSubmitting(true);
    if (!value.length) {
      setIsValid(false);
      setIsSubmitting(false);
      return;
    }
    const productToMap = value.map((p) => p?.productId);
    console.log(productToMap);
    const payload = {
      productList: productToMap,
      portfolioId: portfolioId,
    };
    fetcher.submit({ payload: JSON.stringify(payload) }, { method: 'post' });
  };
  return (
    <ModalForm
      onClose={onCancel}
      title={'Add Product to Portfolio'}
      icon="fa-regular fa-plus"
      fontSize={'xl'}
    >
      <div className="d-block" style={{ width: '550px', padding: '0px', overflow: 'hidden' }}>
        {showAlert && (
          <span className={`ms-3 text-ml font-bold ff-montserrat ${messageType}`}>
            {infoMessage}
          </span>
        )}
        <Form
          render={(formRenderProps: FormRenderProps) => (
            <FormElement style={{ width: '100%', marginTop: '20px' }}>
              <div className="row mb-2">
                <div className="w-100">
                  <MultiSelectTree
                    id="addProduct"
                    name="addProduct"
                    label="Select Product(s)"
                    rounded="medium"
                    className={`multiselect-user-tree ${cssClassValid}`}
                    textField={textField}
                    disabled={isSubmitting}
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
                    item={ProductCustomItem}
                    onChange={onChange}
                    onFilterChange={onFilterChange}
                    onExpandChange={onExpandChange}
                  />
                  {!isValid && (
                    <Error className="d-flex align-items-center">
                      <i className="ts-brands ts-warning-circle"></i>
                      <span className="ms-1"> Please select a product </span>
                    </Error>
                  )}
                </div>
              </div>
            </FormElement>
          )}
        />
        <div className="mb-3 mt-5 d-flex justify-content-end">
          <Button
            themeColor={'light'}
            fillMode="solid"
            size="large"
            className="button button-secondary me-3"
            rounded="medium"
            style={{ padding: '16px 32px', fontSize: '13px', width: '108px' }}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            size="large"
            themeColor={'dark'}
            fillMode="solid"
            rounded="medium"
            onClick={isSubmitting ? () => {} : addProductToPortfolio}
            className="button button-primary"
            style={{ padding: '16px 32px', fontSize: '13px', width: '138px' }}
          >
            {isSubmitting ? (
              <span>
                <i className="fas fa-circle-notch fa-spin me-2"></i> Adding Products{' '}
              </span>
            ) : (
              'Add Product'
            )}
          </Button>
        </div>
      </div>
    </ModalForm>
  );
};
