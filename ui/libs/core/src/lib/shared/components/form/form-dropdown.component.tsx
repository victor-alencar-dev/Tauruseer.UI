import React from 'react';

import { DropDownList } from '@progress/kendo-react-dropdowns';
import { FieldRenderProps, FieldWrapper } from '@progress/kendo-react-form';
import { Error, FloatingLabel, Hint, Label } from '@progress/kendo-react-labels';
export const FormDropDownList = (fieldRenderProps: FieldRenderProps) => {
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
      <DropDownList
        ariaLabelledBy={labelId}
        ariaDescribedBy={`${hintId} ${errorId}`}
        ref={editorRef}
        valid={valid}
        id={id}
        required={required}
        disabled={disabled}
        defaultValue={others['defaultValue']}
        {...others}
      />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};

export const FormFloatingDropDownList = (fieldRenderProps: FieldRenderProps) => {
  const {
    validationMessage,
    required,
    touched,
    label,
    id,
    valid,
    disabled,
    value,
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
      <FloatingLabel
        id={labelId}
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
        editorValue={value}
        style={{ fontSize: '14px', fontWeight: 400, color: value && valid ? '#4231B4' : '#383448' }}
        label={label}
      >
        <DropDownList
          ariaLabelledBy={labelId}
          ariaDescribedBy={`${hintId} ${errorId}`}
          ref={editorRef}
          value={value}
          valid={valid}
          className={value && valid ? 'value-detected' : ''}
          id={id}
          required={required}
          disabled={disabled}
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
