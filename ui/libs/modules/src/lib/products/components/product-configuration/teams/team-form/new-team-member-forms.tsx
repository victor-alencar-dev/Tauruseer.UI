import { Button } from '@progress/kendo-react-buttons';
import { Field, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { useFetcher } from '@remix-run/react';
import { FormFloatingDatePicker, FormFloatingInput } from '@tauruseer/core';
import { PRODUCT_TEAM_ACTION } from '@tauruseer/module';
import { useEffect, useRef, useState } from 'react';
import { ProductStore } from '../../../../state/product-storage';
import {
  EmailValidator,
  nameValidator,
  DateValidator,
} from '../../configure-product/form-initial-values';

interface INewUserProps {
  onCancel: React.EventHandler<any>;
}
export const AddNewTeamMember = ({ onCancel }: INewUserProps) => {
  const store = ProductStore((state) => state);
  const fetcher = useFetcher();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>();
  const [infoMessage, setInfoMessage] = useState<string>();
  const [messageType, setMessageType] = useState<string>();
  const teamFormRef = useRef(null);
  const formSubmitRef = useRef<HTMLButtonElement>();
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
      setIsSubmitting(false);
    }
  }, [fetcher]);

  useEffect(() => {
    formSubmitRef?.current?.addEventListener('click', handlerSubmit);
  }, []);

  const saveTeamMember = () => {
    formSubmitRef?.current?.click();
    setIsSubmitting(true);
    const form: any = teamFormRef.current || {};
    const { _values } = form;
    if (
      nameValidator(_values.name) ||
      nameValidator(_values.lastName) ||
      EmailValidator(_values.email) ||
      DateValidator(_values.startDate)
    ) {
      setIsSubmitting(false);
      return;
    }
    const payload = {
      name: `${_values.name} ${_values.lastName}`,
      primaryEmail: _values.email,
      startDate: _values.startDate,
      productId: store.productId,
      action: PRODUCT_TEAM_ACTION.ADD_TEAM_MEMBER,
    };
    fetcher.submit({ payload: JSON.stringify(payload) }, { method: 'post' });
  };

  const handlerSubmit = (dataItem: any) => {
    return;
  };
  return (
    <>
      {showAlert && (
        <span className={`ms-3 text-ml font-bold ff-montserrat ${messageType}`}>{infoMessage}</span>
      )}
      <Form
        ref={teamFormRef}
        onSubmit={handlerSubmit}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{ width: '100%' }}>
            <div className="row mb-2">
              <div className=" w-50">
                <Field
                  id="name"
                  name="name"
                  label={'First Name'}
                  validator={nameValidator}
                  component={FormFloatingInput}
                />
              </div>
              <div className="w-50">
                <Field
                  id="lastName"
                  name="lastName"
                  label={'Last Name'}
                  validator={nameValidator}
                  component={FormFloatingInput}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="w-50">
                <Field
                  id="email"
                  name="email"
                  label={'Email'}
                  validator={EmailValidator}
                  component={FormFloatingInput}
                />
              </div>
              <div className="w-50">
                <Field
                  id="startDate"
                  width="100%"
                  name="startDate"
                  validator={DateValidator}
                  label={'Start Date'}
                  required={true}
                  max={new Date()}
                  placeholder=""
                  component={FormFloatingDatePicker}
                />
              </div>
            </div>
            <button type={'submit'} ref={formSubmitRef} hidden></button>
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
          onClick={saveTeamMember}
          className="button button-primary"
          style={{ padding: '16px 32px', fontSize: '13px' }}
        >
          {isSubmitting ? (
            <span>
              <i className="fas fa-circle-notch fa-spin me-2"></i> Saving Team Member{' '}
            </span>
          ) : (
            'Save Team Member'
          )}
        </Button>
      </div>
    </>
  );
};
