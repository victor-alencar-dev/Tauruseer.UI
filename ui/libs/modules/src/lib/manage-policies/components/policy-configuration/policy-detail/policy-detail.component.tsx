import { Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { useFetcher, useNavigate } from '@remix-run/react';
import { Alert, FormFooter, IAlertProps, IFormFooterButton } from '@tauruseer/core';
import { Policy } from '@tauruseer/module';
import { useEffect, useRef, useState } from 'react';
import {
  InitialValues,
  descriptionValidator,
  nameValidator,
  policyDetailPayload,
} from './policy-detail-form/form-data.model';
import GeneralInformation from './policy-detail-form/general-information';
import PolicyTools from './policy-detail-form/tools-information';

interface IProps {
  policy: Policy;
  isNew: boolean;
}
export const PolicyDetail = ({ policy, isNew }: IProps) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [messageAlert, setMessageAlert] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>();
  const [alertType, setAlertType] = useState<string>('success');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const refPolicyDetailForm = useRef(null);

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
      const { uniqueId } = data;
      console.log(data);
      setMessageAlert(data.message);
      setAlertType('success');
      setShowAlert(data.successCreated);
      navigateTo(uniqueId);
    }

    if (state === 'submitting' || state === 'loading') {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  };

  const navigateTo = (id: string) => {
    setTimeout(() => {
      navigate(`/manage-policies/${id}/configure-policy/policy-detail`);
    }, 2000);
  };

  const handleSave = () => {
    const form: any = refPolicyDetailForm.current || {};
    const { _values } = form;
    if (
      nameValidator(_values.name) ||
      descriptionValidator(_values.description) ||
      !_values.type?.id
    ) {
      setMessageAlert('Name,Description or Type are required');
      setAlertType('danger');
      setShowAlert(true);
      return;
    }
    const payload = {
      ...policyDetailPayload(_values),
      uniqueId: policy?.uniqueId,
    };
    fetcher.submit({ policy: JSON.stringify(payload) }, { method: 'post' });
  };

  const handleCancel = () => {
    const url = !isNew ? '/manage-policies' : `/manage-policies/dashboard/${policy.uniqueId}`;
    navigate(url);
  };
  const footerButtons: IFormFooterButton[] = [
    {
      text: 'Cancel',
      key: 'cancel-button',
      themeColor: 'light',
      fillMode: 'solid',
      className: 'button button-secondary me-4',
      event: () => handleCancel,
    },
    {
      key: 'save-button',
      themeColor: 'dark',
      fillMode: 'solid',
      className: 'button button-primary',
      event: isSubmitting ? () => {} : handleSave,
      text: isSubmitting ? 'Saving' : 'Save',
      icon: isSubmitting ? 'fas fa-circle-notch fa-spin' : 'fa-regular fa-floppy-disk',
    },
  ];

  return (
    <>
      <div className="card card-content" style={{ minHeight: '55vh' }}>
        {showAlert && (
          <div className="mb-2">
            <Alert
              timeToClose={10000}
              title="Policy Configuration Details"
              type={alertType as IAlertProps['type']}
              onClose={() => setShowAlert(false)}
            >
              <p>{messageAlert}</p>
            </Alert>
          </div>
        )}
        <Form
          ref={refPolicyDetailForm}
          initialValues={InitialValues(policy)}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement style={{ width: '100%' }}>
              <div className="mb-2">
                <GeneralInformation />
              </div>
              <div className="w-100 mt-4">
                <div className="card p-3 condition-card" style={{ boxShadow: 'none' }}>
                  <div className="typography-h4 font-bold ff-ubuntu">
                    Handling Unauthorized Configuration
                  </div>
                  <div className="typography-h4 font-regular ff-montserrat">
                    When a tool, tool type, or technology is configured and does not match any
                    policy rules, these settings describe how compliance is computed.
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <PolicyTools />
              </div>
            </FormElement>
          )}
        />
      </div>
      <FormFooter buttons={footerButtons} />
    </>
  );
};
