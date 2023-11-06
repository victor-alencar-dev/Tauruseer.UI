import React from 'react';

import { DatePicker } from '@progress/kendo-react-dateinputs';
import { FieldRenderProps, FieldWrapper } from '@progress/kendo-react-form';
import { Error, FloatingLabel, Hint, Label } from '@progress/kendo-react-labels';
export const FormDatePicker = (fieldRenderProps: FieldRenderProps) => {
  const {
    validationMessage,
    required,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,
    ...others
  } = fieldRenderProps;
  const editorRef = React.useRef<any>(null);

  const showValidationMessage: string | false | null = touched && validationMessage;
  const showHint: boolean = !showValidationMessage && hint;
  const hintId: string = showHint ? `${id}_hint` : '';
  const errorId: string = showValidationMessage ? `${id}_error` : '';
  const labelId: string = label ? `${id}_label` : '';

  return (
    <FieldWrapper style={wrapperStyle}>
      <Label
        id={labelId}
        editorRef={editorRef}
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
        style={{ fontSize: '14px', fontWeight: 400 }}
      >
        {label}
      </Label>
      <DatePicker
        ariaLabelledBy={labelId}
        ariaDescribedBy={`${hintId} ${errorId}`}
        ref={editorRef}
        valid={valid}
        id={id}
        required={required}
        disabled={disabled}
        {...others}
      />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};

export const FormFloatingDatePicker = (fieldRenderProps: FieldRenderProps) => {
  const {
    validationMessage,
    required,
    touched,
    label,
    id,
    valid,
    value,
    disabled,
    hint,
    optional,
    wrapperStyle,
    ...others
  } = fieldRenderProps;
  const editorRef = React.useRef<any>(null);

  const showValidationMessage: string | false | null = touched && validationMessage;
  const showHint: boolean = !showValidationMessage && hint;
  const hintId: string = showHint ? `${id}_hint` : '';
  const errorId: string = showValidationMessage ? `${id}_error` : '';
  const labelId: string = label ? `${id}_label` : '';

  return (
    <FieldWrapper style={wrapperStyle}>
      <FloatingLabel
        editorId={id}
        editorDisabled={disabled}
        editorValue={value}
        optional={optional}
        style={{ fontSize: '14px', fontWeight: 400 }}
        label={label}
      >
        <DatePicker
          ariaLabelledBy={labelId}
          value={value}
          ariaDescribedBy={`${hintId} ${errorId}`}
          ref={editorRef}
          valid={valid}
          id={id}
          required={required}
          disabled={disabled}
          {...others}
        />
      </FloatingLabel>
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};
