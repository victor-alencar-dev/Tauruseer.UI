import { Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { useFetcher, useNavigate } from '@remix-run/react';
import { Alert, FormFooter, IAlertProps, IFormFooterButton } from '@tauruseer/core';
import { useEffect, useRef, useState } from 'react';
import PolicyConditionsBusinessImpact from './policy-conditions-form/business-impact';
import PolicyConditionsGeneralInfo from './policy-conditions-form/general-information';
import { policyConditionsPayload } from './policy-conditions-form/policy-conditions-form.model';

export const PolicyConditions = (conditions: any) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const refPolicyConditionsForm = useRef(null);
  const [messageAlert, setMessageAlert] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>();
  const [alertType, setAlertType] = useState<string>('success');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

    if (state === 'submitting' || state === 'loading') {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  };
  const handleSave = () => {
    const form: any = refPolicyConditionsForm.current || {};
    const { _values } = form;

    let _payload = _values;
    if (_values.businessPurpose && _values.businessPurpose.length) {
      _payload = {
        ..._payload,
        businessPurpose: _values.businessPurpose.map((item: any) => {
          return Number(item.id);
        }),
      };
    }
    if (_values.lifeCycleStage && _values.lifeCycleStage.length) {
      _payload = {
        ..._payload,
        lifeCycleStage: _values.lifeCycleStage.map((item: any) => {
          return Number(item.id);
        }),
      };
    }
    if (_values.businessCriticality && _values.businessCriticality.length) {
      _payload = {
        ..._payload,
        businessCriticality: _values.businessCriticality.map((item: any) => {
          return Number(item.id);
        }),
      };
    }
    if (_values.strategicOutcome && _values.strategicOutcome.length) {
      _payload = {
        ..._payload,
        strategicOutcome: _values.strategicOutcome.map((item: any) => {
          return Number(item.id);
        }),
      };
    }
    fetcher.submit(
      { policyConditions: JSON.stringify(policyConditionsPayload(_payload, conditions.id)) },
      { method: 'post' },
    );
  };

  const footerButtons: IFormFooterButton[] = [
    {
      text: 'Cancel',
      key: 'cancel-button',
      themeColor: 'light',
      fillMode: 'solid',
      className: 'button button-secondary me-4',
      event: () => navigate(`/manage-policies/dashboard/${conditions.id}`),
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
      <div className="card card-content" style={{ minHeight: '50vh' }}>
        {showAlert && (
          <div className="mb-2">
            <Alert
              timeToClose={10000}
              title="Policy Configuration Conditions"
              type={alertType as IAlertProps['type']}
              onClose={() => setShowAlert(false)}
            >
              <p>{messageAlert}</p>
            </Alert>
          </div>
        )}
        <Form
          ref={refPolicyConditionsForm}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement style={{ width: '100%' }}>
              <div className="mb-4">
                <PolicyConditionsGeneralInfo />
              </div>
              <div className="mb-4">
                <PolicyConditionsBusinessImpact />
              </div>
            </FormElement>
          )}
        />
      </div>
      <FormFooter buttons={footerButtons} />
    </>
  );
};
