import { Button } from '@progress/kendo-react-buttons';
import { Field, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { useFetcher } from '@remix-run/react';
import {
  Alert,
  FormDropDownList,
  FormTextArea,
  MapEnumToObject,
  Modal,
  ProductEnumsReference,
} from '@tauruseer/core';
import { ICognitionDetails, descriptionValidator } from '@tauruseer/module';
import { useEffect, useRef, useState } from 'react';
interface IProps {
  onClose: React.EventHandler<any>;
  productId: string;
  cognition: ICognitionDetails;
}

const DismissForm = ({ onClose, cognition, productId }: IProps) => {
  const fetcher = useFetcher();
  const [messageAlert, setMessageAlert] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>();
  const [alertType, setAlertType] = useState<string>('success');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dismissFormRef = useRef(null);

  useEffect(() => {
    const { data, type, state } = fetcher;
    if (type === 'done' && state === 'idle' && data?.successUpdated) {
      setMessageAlert('successfully dismissed');
      setAlertType('success');
      setShowAlert(true);
    }
    if (type === 'done' && state === 'idle' && data.error) {
      setMessageAlert(data.message);
      setAlertType('danger');
      setShowAlert(data.error);
    }
    if (state === 'submitting' || state === 'loading') {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  }, [fetcher]);

  const saveDismiss = () => {
    const form: any = dismissFormRef.current || {};
    const { _values } = form;
    if (!_values.reason || descriptionValidator(_values.description)) {
      setMessageAlert('Reason and Description are required');
      setAlertType('danger');
      setShowAlert(true);
      return;
    }
    const payload = {
      reason: _values.reason.id,
      comments: _values.description,
      insightId: cognition.insightId,
      productId,
    };
    fetcher.submit({ dismiss: JSON.stringify(payload) }, { method: 'post' });
  };

  return (
    <Modal title="Dismiss insight" onClose={onClose}>
      <div className="d-flex flex-column ">
        {showAlert && (
          <div className=" mt-3 ps-3 pe-3">
            <Alert
              title="Dismiss Action"
              timeToClose={15000}
              type={alertType as any}
              onClose={() => setShowAlert(false)}
            >
              <p>{messageAlert} </p>
            </Alert>
          </div>
        )}
        <div className="pt-2 d-flex flex-column ps-3 pe-3">
          <Form
            ref={dismissFormRef}
            initialValues={{
              reason: MapEnumToObject(ProductEnumsReference.InsightDismissedReason)
                .filter((f) => f.id === cognition.dismissalReason?.toString())
                .pop(),
              description: cognition.dismissedComments,
            }}
            render={(formRenderProps: FormRenderProps) => (
              <FormElement style={{ width: '100%', marginBottom: '20%' }}>
                <div className="mb-3">
                  <Field
                    id="reason"
                    name="reason"
                    label="Reason"
                    data={MapEnumToObject(ProductEnumsReference.InsightDismissedReason)}
                    textField="title"
                    dataItemKey="id"
                    size="large"
                    fillMode="outline"
                    placeholder="Select a reason"
                    rounded="medium"
                    className="me-3"
                    required={true}
                    component={FormDropDownList}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    id="description"
                    name="description"
                    label="Comments"
                    placeholder="Write a Comment "
                    validator={descriptionValidator}
                    component={FormTextArea}
                  />
                </div>
              </FormElement>
            )}
          />
          <div className="mb-3 mt-5 d-flex justify-content-end mt-auto p-2">
            <Button
              themeColor={'light'}
              fillMode="solid"
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
              onClick={isSubmitting ? () => {} : saveDismiss}
            >
              {isSubmitting ? (
                <span>
                  <i className="fas fa-circle-notch fa-spin me-2"></i> Saving{' '}
                </span>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DismissForm;
