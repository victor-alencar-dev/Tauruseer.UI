import { FieldRenderProps, FieldWrapper } from '@progress/kendo-react-form';
import { Checkbox } from '@progress/kendo-react-inputs';
import { Error, Hint } from '@progress/kendo-react-labels';

export const FormCheckbox = (fieldRenderProps: FieldRenderProps) => {
  const {
    validationMessage,
    touched,
    id,
    valid,
    disabled,
    hint,
    optional,
    label,
    visited,
    modified,
    ...others
  } = fieldRenderProps;

  const showValidationMessage: string | false | null = touched && validationMessage;
  const showHint: boolean = !showValidationMessage && hint;
  const hintId: string = showHint ? `${id}_hint` : '';
  const errorId: string = showValidationMessage ? `${id}_error` : '';

  return (
    <FieldWrapper>
      <Checkbox
        ariaDescribedBy={`${hintId} ${errorId}`}
        label={label}
        labelOptional={optional}
        className={'form-checkbox'}
        valid={valid}
        id={id}
        disabled={disabled}
        {...others}
      />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};
