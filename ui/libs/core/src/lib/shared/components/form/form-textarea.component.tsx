import { FieldRenderProps, FieldWrapper } from '@progress/kendo-react-form';
import { TextArea } from '@progress/kendo-react-inputs';
import { Error, FloatingLabel, Hint, Label } from '@progress/kendo-react-labels';
export const FormTextArea = (fieldRenderProps: FieldRenderProps) => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    hint,
    disabled,
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
        optional={optional}
        style={{ fontSize: '14px', fontWeight: 400 }}
      >
        {label}
      </Label>
      <TextArea
        valid={valid}
        id={id}
        defaultValue={others['defaultValue']}
        disabled={disabled}
        placeholder={placeholder}
        ariaDescribedBy={`${hintId} ${errorId}`}
        {...others}
      />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};

export const FormFloatingTextArea = (fieldRenderProps: FieldRenderProps) => {
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
        <TextArea
          valid={valid}
          id={id}
          defaultValue={others['defaultValue']}
          className={value?.length && valid ? 'value-detected' : ''}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          ariaDescribedBy={`${hintId} ${errorId}`}
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
