import { FieldRenderProps, FieldWrapper } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Error, FloatingLabel, Hint, Label } from '@progress/kendo-react-labels';
export const FormInput = (fieldRenderProps: FieldRenderProps) => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    type,
    optional,
    placeholder,
    ...others
  } = fieldRenderProps;

  const showValidationMessage: string | false | null = touched && validationMessage;
  const showHint: boolean = !showValidationMessage && hint;
  const hintId: string = showHint ? `${id}_hint` : '';
  const errorId: string = showValidationMessage ? `${id}_error` : '';

  return (
    <FieldWrapper>
      <Label
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
        optional={optional}
        style={{ fontSize: '14px', fontWeight: 400 }}
      >
        {label}
      </Label>
      <div className={'k-form-field-wrap'}>
        <Input
          valid={valid}
          type={type}
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          ariaDescribedBy={`${hintId} ${errorId}`}
          defaultValue={others['defaultValue']}
          {...others}
        />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </div>
    </FieldWrapper>
  );
};

export const FormFloatingInput = (fieldRenderProps: FieldRenderProps) => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    value,
    disabled,
    hint,
    type,
    optional,
    placeholder,
    ...others
  } = fieldRenderProps;

  const showValidationMessage: string | false | null = touched && validationMessage;
  const showHint: boolean = !showValidationMessage && hint;
  const hintId: string = showHint ? `${id}_hint` : '';
  const errorId: string = showValidationMessage ? `${id}_error` : '';

  return (
    <FieldWrapper>
      <FloatingLabel
        editorId={id}
        editorValid={valid}
        editorValue={value}
        editorDisabled={disabled}
        optional={optional}
        style={{ fontSize: '14px', fontWeight: 400, color: value && valid ? '#4231B4' : '#383448' }}
        label={label}
      >
        <Input
          valid={valid}
          type={type}
          id={id}
          value={value}
          className={value?.length && valid ? 'value-detected' : ''}
          disabled={disabled}
          placeholder={placeholder}
          ariaDescribedBy={`${hintId} ${errorId}`}
          defaultValue={others['defaultValue']}
          {...others}
        />
      </FloatingLabel>
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && (
        <Error id={errorId} className="d-flex align-items-center">
          <i className="ts-brands ts-warning-circle"></i>
          <span className="ms-1"> {validationMessage} </span>
        </Error>
      )}
    </FieldWrapper>
  );
};
