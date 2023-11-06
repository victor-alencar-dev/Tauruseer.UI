import { Button } from '@progress/kendo-react-buttons';
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { useFetcher } from '@remix-run/react';
import {
  DropdownValidator,
  FormCheckbox,
  FormFloatingDropDownList,
  FormFloatingInput,
  FormFloatingTextArea,
  ModalForm,
  descriptionValidator,
  nameValidator,
} from '@tauruseer/core';
import { AvatarList, ITeamMember, RenderValueSimpleValue } from '@tauruseer/module';
import { useEffect, useRef, useState } from 'react';
import { PortfolioStore } from '../../state/portfolio-storage';
import { initialFormValues, setPayloadForm } from './portfolio-initial-values';

interface IPortfolioFormProps {
  onClose: React.EventHandler<any>;
  teamMembers: ITeamMember[];
}
export function PortfolioForm({ onClose, teamMembers }: IPortfolioFormProps) {
  const store = PortfolioStore((state) => state);
  const formSubmitRef = useRef<HTMLButtonElement>();
  const portfolioFormRef = useRef(null);
  const fetcher = useFetcher();
  const [modalTitle, setModalTitle] = useState<string>(
    store.portfolio.portfolioId ? 'Edit Portfolio' : 'Add New PortFolio',
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>();
  const [infoMessage, setInfoMessage] = useState<string>();
  const [messageType, setMessageType] = useState<string>();
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

  const savePortfolio = () => {
    formSubmitRef?.current?.click();
    setIsSubmitting(true);
    const form: any = portfolioFormRef.current || {};
    const { _values } = form;
    if (
      nameValidator(_values.name) ||
      DropdownValidator(_values.portfolioOwner) ||
      descriptionValidator(_values.description)
    ) {
      setIsSubmitting(false);
      return;
    }

    fetcher.submit(
      { payload: JSON.stringify(setPayloadForm(_values, store.portfolio.portfolioId)) },
      { method: 'post' },
    );
  };
  return (
    <ModalForm
      onClose={onClose}
      title={modalTitle}
      width={720}
      icon={store.portfolio.portfolioId ? 'fa-solid fa-pencil' : 'fa-regular fa-plus'}
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
          initialValues={initialFormValues(store.portfolio, teamMembers)}
          render={(_) => (
            <FormElement style={{ width: '100%' }}>
              <div className="mb-2">
                <div className="d-flex justify-content-between">
                  <div className="w-50 me-3">
                    <Field
                      id="name"
                      name="name"
                      label="Portfolio Name"
                      placeholder="Name"
                      validator={nameValidator}
                      component={FormFloatingInput}
                    />
                  </div>
                  <div className="w-50 ms-3">
                    <Field
                      id="portfolioOwner"
                      name="portfolioOwner"
                      label="Portfolio Owner"
                      component={FormFloatingDropDownList}
                      validator={DropdownValidator}
                      itemRender={AvatarList}
                      valueRender={RenderValueSimpleValue}
                      data={teamMembers}
                      dataItemKey="id"
                      textField="name"
                      rounded="medium"
                      fillMode="outline"
                      size="large"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="w-50 mt-3 ms-1 d-flex align-items-center">
                    <Field
                      id="archived"
                      name="archived"
                      label="Archived"
                      size="large"
                      rounded="medium"
                      component={FormCheckbox}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="w-100">
                    <Field
                      id="description"
                      name="description"
                      label="Description"
                      placeholder="Write additional notes to the portfolio"
                      validator={descriptionValidator}
                      component={FormFloatingTextArea}
                    />
                  </div>
                </div>
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
          onClick={isSubmitting ? () => {} : savePortfolio}
        >
          {isSubmitting ? (
            <span>
              <i className="fas fa-circle-notch fa-spin me-2"></i> Saving Portfolio{' '}
            </span>
          ) : (
            'Save Portfolio'
          )}
        </Button>
      </div>
    </ModalForm>
  );
}
