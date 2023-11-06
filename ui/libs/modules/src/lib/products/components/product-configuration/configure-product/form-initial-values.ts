import { MapEnumToObject, ProductEnumsReference } from '@tauruseer/core';
import { IProducts } from '@tauruseer/module';
import { ITeamMember } from '../../../model/teams.interface';

export const formValues = (product: IProducts, teamList: ITeamMember[]) => {
  const {
    portfolioOwner,
    productOwner,
    securityLead,
    techLead,
    internetExposure,
    businessCriticality,
    outcomeCategory,
    regulations,
    sensitiveDataClassifications,
  } = product;
  const internetE = getEnumListValueById(
    ProductEnumsReference.InternetExposure,
    `${internetExposure}`,
  );
  const businessC = getEnumListValueById(
    ProductEnumsReference.BusinessCriticalities,
    `${businessCriticality}`,
  );
  const outcomeC = getEnumListValueById(
    ProductEnumsReference.OutcomeCategoryTypes,
    `${outcomeCategory}`,
  );
  const regulationL = getEnumMultiSelectValueById(
    ProductEnumsReference.Regulation,
    regulations?.map(String) || [],
  );
  const sensitiveDataC = getEnumMultiSelectValueById(
    ProductEnumsReference.SensitiveDataClassification,
    sensitiveDataClassifications?.map(String) || [],
  );
  const selectedProductOwner = teamList.filter((t) => t.id === productOwner?.teamMemberId).pop();
  const selectedPortfolioOwner = teamList
    .filter((t) => t.id === portfolioOwner?.teamMemberId)
    .pop();
  const selectedTechLead = teamList.filter((t) => t.id === techLead?.teamMemberId).pop();
  const selectedSecurityLead = teamList.filter((t) => t.id === securityLead?.teamMemberId).pop();
  return {
    name: product.name,
    description: product.description,
    archived: product.isArchived,
    productOwner: selectedProductOwner,
    technicalLead: selectedTechLead,
    portfolioOwner: selectedPortfolioOwner,
    securityLead: selectedSecurityLead,
    internetExposure: internetE,
    businessCriticality: businessC,
    strategicOutcome: outcomeC,
    regulatoryCompliance: regulationL,
    sensitiveData: sensitiveDataC,
  };
};

const getEnumListValueById = (RefProduct: ProductEnumsReference, id: string | undefined) => {
  return MapEnumToObject(RefProduct)
    .filter((f) => f.id === id?.toString())
    .pop();
};

const getEnumMultiSelectValueById = (
  RefProduct: ProductEnumsReference,
  collection: Array<string | undefined>,
) => {
  return MapEnumToObject(RefProduct).filter((f) => collection.includes(f.id));
};

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
export const setPayloadForm = (values: any, productId: string | null) => {
  return {
    name: values?.name,
    id: productId || null,
    description: values?.description,
    IsArchived: values.archived,
    businessCriticality: Number(values.businessCriticality?.id),
    outcomeCategory: Number(values.strategicOutcome?.id),
    internetExposure: Number(values.internetExposure?.id),
    sensitiveDataClassifications: values?.sensitiveData,
    regulations: values?.regulatoryCompliance,
    techLeadId: values.technicalLead?.id,
    productOwnerId: values.productOwner?.id,
    portfolioOwnerId: values.portfolioOwner?.id,
    securityLeadId: values.securityLead?.id,
  };
};
