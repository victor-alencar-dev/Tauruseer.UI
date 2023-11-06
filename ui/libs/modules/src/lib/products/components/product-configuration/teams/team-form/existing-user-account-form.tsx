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
import { AvatarCustomItem, Tag, expandedState, processMultiSelectTreeData } from '@tauruseer/core';
import { PRODUCT_TEAM_ACTION } from '@tauruseer/module';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ProductStore } from '../../../../state/product-storage';

interface IExistingUser {
  teamMembers: any;
  onCancel: React.EventHandler<any>;
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
export const AddExistingTeamUser = ({ teamMembers, onCancel }: IExistingUser) => {
  const store = ProductStore((state) => state);
  const fetcher = useFetcher();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [value, setValue] = useState<any[]>([]);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<any>(
    teamMembers.length > 0 ? [teamMembers[0][dataItemKey]] : [],
  );
  const [filter, setFilter] = useState<FilterDescriptor | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>();
  const [infoMessage, setInfoMessage] = useState<string>();
  const [messageType, setMessageType] = useState<string>();

  useEffect(() => {
    const { data, type, state } = fetcher;
    if (type === 'done' && state === 'idle' && data?.successCreated) {
      setMessageType('text-success');
      setInfoMessage(data?.message);
      setShowAlert(true);
      setTimeout(() => {
        onCancel(null);
      }, 3000);
    }
    if (type === 'done' && state === 'idle' && data.error) {
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
    setValue(getMultiSelectTreeValue(teamMembers, { ...fields, ...event, value }));
    setIsValid(value.length >= 0);
  };
  const onExpandChange = useCallback(
    (event: MultiSelectTreeExpandEvent) =>
      setExpanded(expandedState(event.item, dataItemKey, expanded)),
    [expanded],
  );
  const treeData = useMemo(
    () => processMultiSelectTreeData(teamMembers, { expanded, value, filter, ...fields }),
    [expanded, value, filter],
  );
  const onFilterChange = (event: MultiSelectTreeFilterChangeEvent) => setFilter(event.filter);

  // form action
  const mapExistingTeamMember = () => {
    setIsSubmitting(true);
    if (!value.length) {
      setIsValid(false);
      setIsSubmitting(false);
      return;
    }
    const userToMap = value.map((u) => u?.id);
    console.log(userToMap);
    const payload = {
      action: PRODUCT_TEAM_ACTION.MAP_EXISTING_USER,
      teamMemberIdList: userToMap,
      productId: store.productId,
    };
    fetcher.submit({ payload: JSON.stringify(payload) }, { method: 'post' });
  };

  return (
    <>
      {showAlert && (
        <span className={`ms-3 text-ml font-bold ff-montserrat ${messageType}`}>{infoMessage}</span>
      )}
      <Form
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{ width: '100%', marginTop: '20px' }}>
            <div className="row mb-2">
              <div className="w-100">
                <MultiSelectTree
                  id="existingMember"
                  name="existingMember"
                  label="Select Existing User(s)"
                  rounded="medium"
                  className="multiselect-user-tree"
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
                  item={AvatarCustomItem}
                  onChange={onChange}
                  onFilterChange={onFilterChange}
                  onExpandChange={onExpandChange}
                />
                {!isValid && (
                  <Error className="d-flex align-items-center">
                    <i className="ts-brands ts-warning-circle"></i>
                    <span className="ms-1"> Please select an existing user </span>
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
          style={{ padding: '16px 32px', fontSize: '13px' }}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          size="large"
          themeColor={'dark'}
          fillMode="solid"
          rounded="medium"
          onClick={mapExistingTeamMember}
          className="button button-primary"
          style={{ padding: '16px 32px', fontSize: '13px' }}
        >
          {isSubmitting ? (
            <span>
              <i className="fas fa-circle-notch fa-spin me-2"></i> Assigning Team Member{' '}
            </span>
          ) : (
            'Assign Team Member'
          )}
        </Button>
      </div>
    </>
  );
};
