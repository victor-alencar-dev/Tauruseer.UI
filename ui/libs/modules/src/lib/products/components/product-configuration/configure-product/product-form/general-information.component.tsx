import { Field } from '@progress/kendo-react-form';
import { FormInput, FormSwitch, FormTextArea } from '@tauruseer/core';
import { descriptionValidator, nameValidator } from '../form-initial-values';

const GeneralInformation = () => {
  return (
    <>
      <label className="typography-body2 fw-semibold">General Information</label>
      <div className="row">
        <div className="col-4">
          <Field
            id="name"
            name="name"
            label="Name"
            placeholder="Project Name"
            validator={nameValidator}
            component={FormInput}
            className="mb-2"
          />
          <Field id="archived" name="archived" label="Archived" component={FormSwitch} />
        </div>
        <div className="col-8">
          <Field
            id="description"
            name="description"
            label="Description"
            placeholder="Write a brief text of the product"
            validator={descriptionValidator}
            component={FormTextArea}
          />
        </div>
      </div>
    </>
  );
};

export default GeneralInformation;
