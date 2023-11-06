import { Button } from "@progress/kendo-react-buttons";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { useFetcher } from "@remix-run/react";
import { Alert, FormDropDownList, FormInput, FormTextArea, MapEnumToObject, Modal, ProductEnumsReference } from "@tauruseer/core";
import { useEffect, useState } from "react";
import { descriptionValidator, nameValidator } from "../../../products/components/product-configuration/configure-product/form-initial-values";
import { Policy } from "../../model/manage-policies.model";

interface IPolicyFormProps {
  policy: Policy;
  onClose: React.EventHandler<any>;
}

export const PolicyForm = ({ policy, onClose }: IPolicyFormProps ) => {
  const [name, setName] = useState(policy.name);
  const [description, setDescription] = useState(policy.description);
  const [policyType, setPolicyType] = useState(policy.policyType);
  const [isSubmitting, setSubmittingState] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const fetcher = useFetcher();

  useEffect(() => {
    const { state } = fetcher;
    const isSubmitting = state === 'submitting' || state === 'loading';
    setSubmittingState(isSubmitting);
  }, [fetcher]);

  const handleCreatePolicy = () => {
    if (nameValidator(name) || descriptionValidator(description) || policyType === null) {
      setValidationMessage('Name, Description or Policy Type are required');
      return;
    }

    const newPolicy = {
      ...policy,
      name,
      description,
      policyType,
    };

    fetcher.submit({ policy: JSON.stringify(newPolicy), action: 'create-policy' }, { method: 'post' });
  };

  return (
    <Modal title="New Policy" onClose={onClose}>
      <Form
        initialValues={policy}
        render={(_) => (
          <FormElement style={{ width: '100%'}}>
            <div className="mb-2">
              <div className="w-100">
                {validationMessage === '' ? (
                  <div className="card p-3 condition-card" style={{ boxShadow: 'none'}}>
                    <div className="typography-h4 font-bold ff-ubuntu">Note</div>
                    <div className="typography-h4 font-regular ff-montserrat">You'll be able to restrict this policy further and define its rules on the next page. It will remain inactive until you make it active.</div>
                  </div>
                ): (
                  <Alert title={validationMessage} type={"danger"} onClose={() => setValidationMessage('')}/>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <div className="w-50 me-3">
                  <Field
                    id="name"
                    name="name"
                    label="Policy Name"
                    placeholder="Name"
                    component={FormInput}
                    validator={nameValidator}
                    onChange={(evt) => setName(evt.target.value)}
                  />
                </div>
                <div className="w-50 ms-3">
                  <Field
                    id="policyType"
                    name="policyType"
                    label="Policy Type"
                    component={FormDropDownList}
                    data={MapEnumToObject(ProductEnumsReference.PolicyType)}
                    dataItemKey="id"
                    textField="title"
                    rounded="medium"
                    fillMode="outline"
                    size="large"
                    onChange={(evt) => setPolicyType(evt.target.value.id)}
                  />
                </div>
              </div>
              {/* <div className="d-flex justify-content-between">
                <div className="w-50 me-3">
                  <Field
                    id="applyToProduct"
                    name="applyToProduct"
                    label="Apply only to Product (Optional)"
                    placeholder="Name"
                    component={FormDropDownList}
                  />
                </div>
              </div> */}
              <div className="d-flex justify-content-between">
                <div className="w-100">
                  <Field
                    id="description"
                    name="description"
                    label="Description"
                    placeholder="Write additional description to the policy"
                    component={FormTextArea}
                    validator={descriptionValidator}
                    onChange={(evt) => setDescription(evt.target.value)}
                  />
                </div>
              </div>
            </div>
          </FormElement>
        )}
      />
      <div className='mb-3 mt-5 d-flex justify-content-end'>
				<Button
					themeColor={"light"}
					fillMode='flat'
					size='large'
					className='button button-secondary me-3'
					rounded='medium'
          onClick={onClose}
				>
					Cancel
				</Button>
				<Button
					size='large'
					themeColor={"dark"}
					fillMode='solid'
					rounded='medium'
					className='button button-primary'
          onClick={isSubmitting ? () => {} : handleCreatePolicy}
				>
          {isSubmitting ? (
            <span>
              <i className="fas fa-circle-notch fa-spin me-2"></i> Creating{' '}
            </span>
          ) : (
            'Create Policy'
          )}
				</Button>
			</div>
    </Modal>
  );
};
