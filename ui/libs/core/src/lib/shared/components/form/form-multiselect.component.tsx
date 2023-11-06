import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { FieldRenderProps, FieldWrapper } from '@progress/kendo-react-form';
import { Error, Hint, Label } from '@progress/kendo-react-labels';
import React from 'react';
export const FormMultiSelect = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, ...others } =
    fieldRenderProps;
  const editorRef = React.useRef<any>(null);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';

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
      <MultiSelect
        ariaLabelledBy={labelId}
        ariaDescribedBy={`${hintId} ${errorId}`}
        ref={editorRef}
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
