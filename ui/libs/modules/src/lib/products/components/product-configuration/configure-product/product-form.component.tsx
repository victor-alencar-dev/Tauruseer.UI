import { Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { useFetcher, useNavigate } from '@remix-run/react';
import { Alert, FormFooter, IAlertProps, IFormFooterButton } from '@tauruseer/core';
import { useEffect, useRef, useState } from 'react';
import { IProducts } from '../../../model/product.interface';
import { ITeamMember } from '../../../model/teams.interface';
import {
  descriptionValidator,
  formValues,
  nameValidator,
  setPayloadForm,
} from './form-initial-values';
import BusinessImpact from './product-form/business-impact.component';
import Compliance from './product-form/compliance.component';
import GeneralInformation from './product-form/general-information.component';
import RiskOwners from './product-form/risk-owners.component';

interface IProps {
  product: IProducts;
  isNew: boolean;
  teamList: ITeamMember[];
}
export const ConfigureProductForm = ({ product, isNew, teamList }: IProps) => {
  const fetcher = useFetcher();
  const refForm = useRef(null);
  const [messageAlert, setMessageAlert] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>();
  const [alertType, setAlertType] = useState<string>('success');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetcherHandleSubmit(fetcher);
  }, [fetcher]);

  const fetcherHandleSubmit = (fetcher: any) => {
    const { data, type, state } = fetcher;
    if (type === 'done' && state === 'idle' && data.successUpdate) {
      setMessageAlert(fetcher.data?.message);
      setAlertType('success');
      setShowAlert(fetcher.data?.successUpdate);
    }
    if (type === 'done' && state === 'idle' && data.error) {
      setMessageAlert(data.error);
      setAlertType('danger');
      setShowAlert(data.error);
    }
    if (type === 'done' && state === 'idle' && data.successCreated) {
      const {
        data: { productId },
      } = data;
      setMessageAlert(data.message);
      setAlertType('success');
      setShowAlert(data.successCreated);
      navigateTo(productId);
    }
    if (state === 'submitting' || state === 'loading') {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  };

  const navigateTo = (id: string) => {
    setTimeout(() => {
      navigate(`/products/${id}/configure-product/product-details`);
    }, 3000);
  };

  const handleSave = () => {
    const form: any = refForm.current || {};
    const { _values } = form;
    if (nameValidator(_values.name) || descriptionValidator(_values.description)) {
      setMessageAlert('Name or Description are required');
      setAlertType('danger');
      setShowAlert(true);
      return;
    }
    let _payload = _values;
    if (_values.regulatoryCompliance.length) {
      _payload = {
        ..._payload,
        regulatoryCompliance: _values.regulatoryCompliance.map((item: any) => {
          return Number(item.id);
        }),
      };
    }
    if (_values.sensitiveData) {
      _payload = {
        ..._payload,
        sensitiveData: _values.sensitiveData.map((item: any) => {
          return Number(item.id);
        }),
      };
    }
    fetcher.submit(
      { product: JSON.stringify(setPayloadForm(_payload, product.id)) },
      { method: 'post' },
    );
  };

  const handleCancel = () => {
    const url = !isNew ? '/products' : `/products/${product.id}/detail`;
    navigate(url);
  };
  //for avoid multiple calls while is submitting
  const saveEvent = isSubmitting ? () => {} : handleSave;
  const footerButtons: IFormFooterButton[] = [
    {
      key: 'cancel-button',
      themeColor: 'light',
      fillMode: 'solid',
      className: 'button button-secondary me-4',
      event: handleCancel,
      text: 'Cancel',
    },

    {
      key: 'save-button',
      themeColor: 'dark',
      fillMode: 'solid',
      className: 'button button-primary',
      event: isSubmitting ? () => {} : saveEvent,
      text: isSubmitting ? 'Saving' : 'Save',
      icon: isSubmitting ? 'fas fa-circle-notch fa-spin' : 'fa-regular fa-floppy-disk',
    },
  ];

  return (
    <>
      <div className="card card-content">
        {showAlert && (
          <div className="mb-2">
            <Alert
              timeToClose={10000}
              title="Product Action"
              type={alertType as IAlertProps['type']}
              onClose={() => setShowAlert(false)}
            >
              <p>{messageAlert}</p>
            </Alert>
          </div>
        )}
        <Form
          initialValues={formValues(product, teamList)}
          ref={refForm}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement style={{ width: '100%' }}>
              <div className="mb-2">
                <GeneralInformation />
              </div>

              <div className="mb-4">
                <RiskOwners data={teamList} />
              </div>

              <div className="mb-4">
                <BusinessImpact />
              </div>

              <div className="mb-4">
                <Compliance />
              </div>
            </FormElement>
          )}
        />
      </div>

      <FormFooter buttons={footerButtons} />
    </>
  );
};
