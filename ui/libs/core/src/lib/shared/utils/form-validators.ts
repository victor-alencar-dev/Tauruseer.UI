const blankSpaceValidator = /^\s+$/;
const emailRegex = new RegExp(/\S+@\S+\.\S+/);
export const nameValidator = (value: string) => {
  if (!value || blankSpaceValidator.test(value)) {
    return 'This field is required';
  }
  return '';
};
export const EmailValidator = (value: string) => {
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email';
  }
  return '';
};

export const DateValidator = (value: string) => {
  if (!value) {
    return 'Date is required';
  }
  return '';
};

export const DropdownValidator = (value: string) => {
  if (!value) {
    return 'This field is required';
  }
  return '';
};
export const descriptionValidator = (value: string) => {
  if (!value || blankSpaceValidator.test(value)) {
    return 'Description is required';
  }
  return '';
};
