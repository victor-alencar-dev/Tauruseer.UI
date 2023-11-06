import { Field } from '@progress/kendo-react-form';
import {
  FormDropDownList,
  FormInput,
  FormTextArea,
  MapEnumToObject,
  ProductEnumsReference,
} from '@tauruseer/core';
import { RuleTypeValidationMessage, descriptionValidator, nameValidator } from './form-data.model';

const GeneralInformation = () => {
  const defaultOption = { title: 'Select a Type' };
  return (
    <>
      <label className="typography-body2 fw-semibold">General Information</label>
      <div className="row">
        <div className="d-flex flex-column col-4">
          <Field
            id="name"
            name="name"
            label="Name"
            placeholder="Policy Name"
            validator={nameValidator}
            component={FormInput}
          />
          <Field
            id="type"
            name="type"
            label="Type"
            rounded="medium"
            textField="title"
            dataItemKey="id"
            component={FormDropDownList}
            data={MapEnumToObject(ProductEnumsReference.PolicyType)}
            defaultItem={defaultOption}
            required={true}
            validationMessage={RuleTypeValidationMessage}
            size="large"
            fillMode="outline"
            className="me-3 mt-2"
          />
        </div>

        <div className="col-8">
          <Field
            id="description"
            name="description"
            label="Description"
            placeholder="Write a brief text of the policy"
            validator={descriptionValidator}
            component={FormTextArea}
          />
        </div>
      </div>
    </>
  );
};

export default GeneralInformation;
