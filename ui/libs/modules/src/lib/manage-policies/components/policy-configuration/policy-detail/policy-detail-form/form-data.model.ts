import { MapEnumToObject, ProductEnumsReference } from '@tauruseer/core';
import { Policy } from '../../../../model/manage-policies.model';

export const InitialValues = (policy: Policy) => {
  const {
    name,
    description,
    isActive,
    policyType,
    unauthorizedCloudResourceTypeStrategy,
    unauthorizedDependencyStrategy,
    unauthorizedTechnologyStrategy,
    unauthorizedToolStrategy,
    unauthorizedToolTypeStrategy,
  } = policy;
  const policyTypeName = getEnumListValueByName(ProductEnumsReference.PolicyType, policyType);
  const tools = getEnumListValueById(
    ProductEnumsReference.ToolStatus,
    defaultToolValue(unauthorizedToolStrategy),
  );
  const toolsType = getEnumListValueById(
    ProductEnumsReference.ToolStatus,
    defaultToolValue(unauthorizedToolTypeStrategy),
  );
  const technology = getEnumListValueById(
    ProductEnumsReference.ToolStatus,
    defaultToolValue(unauthorizedTechnologyStrategy),
  );
  const dependency = getEnumListValueById(
    ProductEnumsReference.ToolStatus,
    defaultToolValue(unauthorizedDependencyStrategy),
  );
  const cloudResources = getEnumListValueById(
    ProductEnumsReference.ToolStatus,
    defaultToolValue(unauthorizedCloudResourceTypeStrategy),
  );
  return {
    name: name,
    description: description,
    active: isActive,
    type: policyTypeName,
    tools: tools,
    toolType: toolsType,
    technologies: technology,
    dependencies: dependency,
    cloudResourcesType: cloudResources,
  };
};

const getEnumListValueByName = (RefProduct: ProductEnumsReference, name: string | number) => {
  return MapEnumToObject(RefProduct)
    .filter((f) => f.title === name)
    .pop();
};

const getEnumListValueById = (RefProduct: ProductEnumsReference, id: string | undefined) => {
  return MapEnumToObject(RefProduct)
    .filter((f) => f.id === id)
    .pop();
};

const defaultToolValue = (toolValue: number | undefined) => {
  return toolValue ? toolValue.toString() : '0';
};

//Validators
const blankSpaceValidator = /^\s+$/;
export const nameValidator = (value: string) => {
  if (!value || blankSpaceValidator.test(value)) {
    return 'Name is required';
  }
  return '';
};

export const descriptionValidator = (value: string) => {
  if (!value || blankSpaceValidator.test(value)) {
    return 'Description is required';
  }
  return '';
};
export const RuleTypeValidationMessage = 'Please select a Rule Type!';
export const policyDetailPayload = (values: any) => {
  return {
    name: values.name,
    description: values.description,
    isActive: values.active,
    policyType: Number(values.type?.id),
    unauthorizedCloudResourceTypeStrategy: Number(values.cloudResourcesType?.id),
    unauthorizedDependencyStrategy: Number(values.dependencies?.id),
    unauthorizedTechnologyStrategy: Number(values.technologies?.id),
    unauthorizedToolStrategy: Number(values.tools?.id),
    unauthorizedToolTypeStrategy: Number(values.toolType?.id),
  };
};
