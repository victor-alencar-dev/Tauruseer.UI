import { Button } from '@progress/kendo-react-buttons';
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { useFetcher } from '@remix-run/react';
import {
  Alert,
  FormDropDownList,
  FormTextArea,
  IAlertProps,
  MapEnumToObject,
  Modal,
  ProductEnumsReference,
} from '@tauruseer/core';
import { useEffect, useRef, useState } from 'react';
import { IPolicyRules } from '../../../../model/manage-policies.model';
import { InitialValues, policyRulesPayload } from './policy-rule-form.model';

interface IPolicyFormProps {
  rule?: IPolicyRules;
  onClose: React.EventHandler<any>;
  id: string;
  techList?: any;
  isEditing?: boolean;
}

export const RuleForm = ({ rule, onClose, id, techList, isEditing }: IPolicyFormProps) => {
  const refRuleForm = useRef(null);
  const fetcher = useFetcher();
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
  const handleCreateRule = () => {
    const action = isEditing ? 'update' : 'create';
    console.log('Actions:', action);
    const form: any = refRuleForm.current || {};
    const { _values } = form;
    if (!_values.ruleType || !_values.result || !_values.ruleTarget) {
      setMessageAlert('Please fill all the fields');
      setAlertType('danger');
      setShowAlert(true);
      return;
    }
    fetcher.submit(
      { rule: JSON.stringify(policyRulesPayload(_values, id, action)) },
      { method: 'post' },
    );
  };

  return (
    <Modal title={isEditing ? 'Edit Rule' : 'New Rule'} onClose={onClose}>
      {showAlert && (
        <div className="mb-2">
          <Alert
            timeToClose={10000}
            title="Rules Configuration"
            type={alertType as IAlertProps['type']}
            onClose={() => setShowAlert(false)}
          >
            <p>{messageAlert}</p>
          </Alert>
        </div>
      )}
      <Form
        ref={refRuleForm}
        initialValues={InitialValues(rule, techList)}
        render={(_) => (
          <FormElement style={{ width: '100%' }}>
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <div className="w-50 me-3">
                  <Field
                    id="ruleType"
                    name="ruleType"
                    label="Rule Type"
                    component={FormDropDownList}
                    data={MapEnumToObject(ProductEnumsReference.RuleType)}
                    dataItemKey="id"
                    textField="title"
                    rounded="medium"
                    fillMode="outline"
                    size="large"
                  />
                </div>
                <div className="w-50 ms-3">
                  <Field
                    id="ruleTarget"
                    name="ruleTarget"
                    label="Rule Target"
                    component={FormDropDownList}
                    data={techList}
                    dataItemKey="uniqueId"
                    textField="name"
                    rounded="medium"
                    fillMode="outline"
                    size="large"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="w-50 me-3">
                  <Field
                    id="result"
                    name="result"
                    label="Result"
                    component={FormDropDownList}
                    data={MapEnumToObject(ProductEnumsReference.RuleResult)}
                    dataItemKey="id"
                    textField="title"
                    rounded="medium"
                    fillMode="outline"
                    size="large"
                  />
                </div>
                <div className="w-50 ms-3"></div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="w-100">
                  <Field
                    id="notes"
                    name="notes"
                    label="Notes"
                    placeholder="Write additional Note to the Rule"
                    component={FormTextArea}
                  />
                </div>
              </div>
            </div>
          </FormElement>
        )}
      />
      <div className="mb-3 mt-5 d-flex justify-content-end">
        <Button
          themeColor={'light'}
          fillMode="flat"
          size="large"
          className="button button-secondary me-3"
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
          onClick={handleCreateRule}
        >
          {isSubmitting ? (
            <span>
              <i className="fas fa-circle-notch fa-spin me-2"></i> Saving Rule{' '}
            </span>
          ) : (
            'Save Rule'
          )}
        </Button>
      </div>
    </Modal>
  );
};
