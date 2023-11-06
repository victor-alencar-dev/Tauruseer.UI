import { Button } from '@progress/kendo-react-buttons';
import { Field, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { FormDropDownList } from '@tauruseer/core';
import { IObjectList } from '@tauruseer/module';

interface IProps {
  products: Array<IObjectList>;
  saveMapping: React.EventHandler<any>;
  cancelMapping: React.EventHandler<any>;
  refForm: React.MutableRefObject<null>;
  isSubmitting?: boolean;
}
const MappingToExistingProducts = ({
  isSubmitting,
  products,
  refForm,
  saveMapping,
  cancelMapping,
}: IProps) => {
  const defaultOption = { name: 'Select Product' };

  return (
    <>
      <Form
        ref={refForm}
        initialValues={{ product: defaultOption }}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{ width: '100%', marginBottom: '20%' }}>
            <div className="mb-3">
              <Field
                id="product"
                name="product"
                label="Product"
                defaultItem={defaultOption}
                data={products}
                textField="name"
                size="large"
                fillMode="outline"
                rounded="medium"
                className="me-3"
                component={FormDropDownList}
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
          onClick={cancelMapping}
        >
          Cancel
        </Button>
        <Button
          size="large"
          themeColor={'dark'}
          fillMode="solid"
          rounded="medium"
          className="button button-primary"
          onClick={isSubmitting ? () => {} : saveMapping}
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

export default MappingToExistingProducts;
