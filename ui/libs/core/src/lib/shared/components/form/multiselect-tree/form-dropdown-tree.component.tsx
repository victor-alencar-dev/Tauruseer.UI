import { MultiSelectTree } from '@progress/kendo-react-dropdowns';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Error, FloatingLabel, Hint } from '@progress/kendo-react-labels';

export const FormDropDownTree = (fieldRenderProps: any) => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,
    data,
    dataItemKey,
    checkField,
    subItemsField,
    textField,
    expandField,
    checkIndeterminateField,
    ...others
  } = fieldRenderProps;

  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';

  return (
    <FieldWrapper style={wrapperStyle}>
      <FloatingLabel
        id={labelId}
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
        label={label}
      >
        <MultiSelectTree
          data={data}
          textField={textField}
          dataItemKey={dataItemKey}
          checkField={checkField}
          checkIndeterminateField={checkIndeterminateField}
          expandField={expandField}
          subItemsField={subItemsField}
          filterable={true}
          {...others}
        />
      </FloatingLabel>
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};
