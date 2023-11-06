import { FieldRenderProps, FieldWrapper } from '@progress/kendo-react-form';
import { Switch } from '@progress/kendo-react-inputs';
import { Error, Hint, Label } from '@progress/kendo-react-labels';
import React from 'react';

export const FormSwitch = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, touched, label, optional, id, valid, disabled, hint, ...others } =
    fieldRenderProps;
  const editorRef = React.useRef<any>(null);

  const showValidationMessage: string | false | null = touched && validationMessage;
  const showHint: boolean = !showValidationMessage && hint;
  const hintId: string = showHint ? `${id}_hint` : '';
  const errorId: string = showValidationMessage ? `${id}_error` : '';
  const labelId: string = label ? `${id}_label` : '';

  return (
    <FieldWrapper>
      <Label
        id={labelId}
        editorRef={editorRef}
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
        optional={optional}
        style={{ fontSize: '14px', fontWeight: 400 }}
      >
        {label}
      </Label>
      <Switch
        ref={editorRef}
        ariaLabelledBy={labelId}
        ariaDescribedBy={`${hintId} ${errorId}`}
        valid={valid}
        id={id}
        checked={fieldRenderProps.value}
        disabled={disabled}
        {...others}
      />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};
