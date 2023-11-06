import { Button } from '@progress/kendo-react-buttons';
import { Field, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { FormInput, FormTextArea } from '@tauruseer/core';
import { descriptionValidator, nameValidator } from '@tauruseer/module';
interface IProduct {
  displayName: string;
  description?: string;
  saveProduct: React.EventHandler<any>;
  cancelMapping: React.EventHandler<any>;
  refForm: React.MutableRefObject<null>;
  isSubmitting?: boolean;
}

const ProductForm = ({
  displayName,
  description,
  saveProduct,
  refForm,
  cancelMapping,
  isSubmitting,
}: IProduct) => {
  const ProductModel = {
    name: displayName,
    description: description,
  };

  return (
    <>
      <Form
        ref={refForm}
        initialValues={ProductModel}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{ width: '100%' }}>
            <div className="mb-3">
              <Field
                id="name"
                name="name"
                label="Name"
                placeholder="Project Name"
                validator={nameValidator}
                component={FormInput}
              />
            </div>
            <div className="mb-3">
              <Field
                id="description"
                name="description"
                label="Description"
                placeholder="Write a brief text of the product"
                validator={descriptionValidator}
                component={FormTextArea}
              />
            </div>
          </FormElement>
        )}
      />
      <div className="mb-3 mt-5 d-flex justify-content-end">
        <Button
          themeColor={'light'}
          fillMode="solid"
          size="large"
          className="button button-secondary me-3"
          rounded="medium"
          onClick={cancelMapping}
        >
          Cancel
        </Button>
        <Button
          size="large"
          themeColor={'dark'}
          fillMode="solid"
          rounded="medium"
          onClick={isSubmitting ? () => {} : saveProduct}
          className="button button-primary"
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
    </>
  );
};

export default ProductForm;
