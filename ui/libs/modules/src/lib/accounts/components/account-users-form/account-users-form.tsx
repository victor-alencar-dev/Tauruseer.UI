import { Button } from '@progress/kendo-react-buttons';
import { Field, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { useFetcher } from '@remix-run/react';
import {
  EmailValidator,
  FormCheckbox,
  FormFloatingInput,
  ModalForm,
  nameValidator,
} from '@tauruseer/core';
import { useEffect, useRef, useState } from 'react';
import { UserStore } from '../state/users-storage';
import { initialUserValues, setPayloadForm } from './users-initial-values';

interface IAccountUsersFormProps {
  onClose: React.EventHandler<any>;
  accountId: string;
}

export const AccountUsersForm = ({ onClose, accountId }: IAccountUsersFormProps) => {
  const store = UserStore((state) => state);
  const formSubmitRef = useRef<HTMLButtonElement>();
  const portfolioFormRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>();
  const [infoMessage, setInfoMessage] = useState<string>();
  const [messageType, setMessageType] = useState<string>();
  const fetcher = useFetcher();
  const modalTitle = store.user.userId ? 'Edit User' : 'New User';

  useEffect(() => {
    const { data, type, state } = fetcher;
    if (type === 'done' && state === 'idle' && data?.success) {
      setMessageType('text-success');
      setInfoMessage(data?.message);
      setShowAlert(true);
      setTimeout(() => {
        onClose(null);
      }, 3000);
    }
    if (type === 'done' && state === 'idle' && !data?.success) {
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

  const handlerSubmit = (dataItem: any) => {
    return;
  };
  const handleSaveUser = () => {
    setIsSubmitting(true);
    formSubmitRef?.current?.click();
    const form: any = portfolioFormRef.current || {};
    const { _values } = form;
    if (
      nameValidator(_values.firstName) ||
      nameValidator(_values.lastName) ||
      EmailValidator(_values.email)
    ) {
      setIsSubmitting(false);
      return;
    }
    fetcher.submit(
      { user: JSON.stringify(setPayloadForm(_values, store.user.userId)), accountId },
      { method: 'post' },
    );
  };

  return (
    <ModalForm
      title={modalTitle}
      onClose={onClose}
      width={720}
      icon="ts-brands ts-add-teammembers"
      iconClass={{ marginTop: '2px', fontSize: '29px' }}
      fontSize={'xl'}
    >
      <div className="d-block" style={{ width: '600px', padding: '0px', overflow: 'hidden' }}>
        {showAlert && (
          <span className={`ms-3 text-ml font-bold ff-montserrat ${messageType}`}>
            {infoMessage}
          </span>
        )}
        <Form
          ref={portfolioFormRef}
          initialValues={initialUserValues(store.user)}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement style={{ width: '100%' }}>
              <div className="mb-2">
                <div className="d-flex justify-content-between">
                  <div className="w-50 me-3">
                    <Field
                      id={'firstName'}
                      name={'firstName'}
                      label={'First Name'}
                      placeholder={'Name'}
                      validator={nameValidator}
                      component={FormFloatingInput}
                    />
                  </div>
                  <div className="w-50 ms-3">
                    <Field
                      id={'lastName'}
                      name={'lastName'}
                      label={'Last Name'}
                      placeholder={'Last Name'}
                      validator={nameValidator}
                      component={FormFloatingInput}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="w-50 me-3">
                    <Field
                      id={'email'}
                      name={'email'}
                      label={'Email'}
                      placeholder={'Email Address'}
                      validator={EmailValidator}
                      component={FormFloatingInput}
                    />
                  </div>
                  <div className="w-50 mt-3 ms-1 d-flex align-items-center">
                    <Field
                      id="isAdmin"
                      name="isAdmin"
                      label="Set as Admin"
                      size="large"
                      rounded="medium"
                      component={FormCheckbox}
                    />
                  </div>
                </div>
                {store.user.userId && (
                  <div className="d-flex justify-content-between">
                    <div className="w-50 mt-3 ms-1 d-flex align-items-center">
                      <Field
                        id="isActive"
                        name="isActive"
                        label="Active User"
                        size="large"
                        rounded="medium"
                        component={FormCheckbox}
                      />
                    </div>
                  </div>
                )}
              </div>
              <button type={'submit'} ref={formSubmitRef} hidden></button>
            </FormElement>
          )}
        />
      </div>
      <div className="mb-3 mt-5 d-flex justify-content-end">
        <Button
          themeColor={'light'}
          fillMode="solid"
          size="large"
          className="button button-secondary me-3"
          style={{ padding: '16px 32px', fontSize: '13px', width: '104px' }}
          rounded="medium"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          size="large"
          themeColor={'dark'}
          fillMode="solid"
          rounded="medium"
          className="button button-primary"
          style={{ padding: '16px 32px', fontSize: '13px', width: '147px' }}
          onClick={isSubmitting ? () => {} : handleSaveUser}
        >
          {isSubmitting ? (
            <span>
              <i className="fas fa-circle-notch fa-spin me-2"></i>{' '}
              {`Saving ${!store.user.userId ? 'New' : ''}User`}
            </span>
          ) : (
            `Save ${!store.user.userId ? 'New' : ''} User`
          )}
        </Button>
      </div>
    </ModalForm>
  );
};
