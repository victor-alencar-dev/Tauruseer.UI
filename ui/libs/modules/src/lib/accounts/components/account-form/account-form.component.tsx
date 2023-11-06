import { Button } from '@progress/kendo-react-buttons';
import { Field, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { useFetcher } from '@remix-run/react';
import {
  Alert,
  FormDropDownList,
  FormInput,
  FormTextArea,
  MapEnumToObject,
  ProductEnumsReference,
} from '@tauruseer/core';
import { useEffect, useState } from 'react';
import { Account } from '../../model/account.model';

interface IAccountFormProps {
  account: Account;
  showMessage: boolean;
}

export const AccountForm = ({ account, showMessage }: IAccountFormProps) => {
  const fetcher = useFetcher();
  const [name, setName] = useState(account.name);
  const [description, setDescription] = useState(account.description);
  const [businessType, setBusinessType] = useState(account.businessTypeId ?? null);
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [showNotification, setShowNotification] = useState(showMessage);

  useEffect(() => {
    const { data, type, state } = fetcher;

    if (type === 'done' && state === 'idle' && data.successUpdate) {
      setShowNotification(true);
    }
  }, [fetcher]);

  useEffect(() => {
    if (name !== '' && description !== '' && businessType != null) {
      setSaveButtonEnabled(true);
    } else {
      setSaveButtonEnabled(false);
    }
  }, [name, description, businessType]);

  const handleSaveAccount = () => {
    const accountData = {
      ...account,
      name,
      description,
      businessTypeId: businessType,
    };

    fetcher.submit({ account: JSON.stringify(accountData) }, { method: 'post' });
  };

  return (
    <div className="card card-content">
      {showNotification && (
        <>
          <Alert
            timeToClose={15000}
            title=""
            type="success"
            onClose={() => setShowNotification(false)}
          >
            <p>Account saved!</p>
            <p>
              The account {account.name} has been {showMessage ? 'created' : 'updated'} and assigned
              to the platform. Please contact and alert the person assigned to this profile.
              <div>
                <a href="/accounts/new/configure-account/account-details">
                  Click here to add another account
                </a>
              </div>
            </p>
          </Alert>
          <br />
        </>
      )}
      <Form
        initialValues={{
          name: account.name,
          businessType: MapEnumToObject(ProductEnumsReference.BusinessTypes)
            .filter((f) => f.id === account.businessTypeId?.toString())
            .pop(),
          description: account.description,
        }}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{ width: '100%' }}>
            <div className="mb-2">
              <label className="typography-body2 fw-semibold">Account Settings</label>
              <div className="d-flex">
                <div className="d-flex flex-column w-25">
                  <Field
                    id={'name'}
                    name={'name'}
                    label={'Name'}
                    placeholder={'Name'}
                    component={FormInput}
                    onChange={(evt) => setName(evt.target.value)}
                  />
                  <Field
                    id={'businessType'}
                    name={'businessType'}
                    label={'Business Type'}
                    component={FormDropDownList}
                    data={MapEnumToObject(ProductEnumsReference.BusinessTypes)}
                    dataItemKey="id"
                    textField="title"
                    rounded="medium"
                    fillMode="outline"
                    size="large"
                    onChange={(evt) => setBusinessType(evt.target.value.id)}
                  />
                </div>
                <div className="d-flex flex-column ms-4 w-75">
                  <Field
                    id={'description'}
                    name={'description'}
                    label={'Description'}
                    placeholder={'Additional User Description'}
                    component={FormTextArea}
                    onChange={(evt) => setDescription(evt.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <Button
                themeColor={'dark'}
                fillMode="solid"
                rounded="medium"
                className="button button-primary ms-2 mt-3 form-button"
                disabled={!saveButtonEnabled}
                onClick={handleSaveAccount}
              >
                Save Account Changes
              </Button>
            </div>
          </FormElement>
        )}
      />
    </div>
  );
};
