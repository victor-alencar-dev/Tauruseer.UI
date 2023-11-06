import { MapEnumToObject, ProductEnumsReference } from '@tauruseer/core';

export const InitialValues = (policyConditions: any) => {
  const { businessCriticalities, businessPurposes, outcomeCategories, lifecycleStages } =
    policyConditions;
  const businessCri = getEnumMultiSelectValueById(
    ProductEnumsReference.BusinessCriticalities,
    businessCriticalities?.map(String) || [],
  );
  const businessPrs = getEnumMultiSelectValueById(
    ProductEnumsReference.BusinessCriticalities,
    businessPurposes?.map(String) || [],
  );
  const outcomeCtr = getEnumMultiSelectValueById(
    ProductEnumsReference.OutcomeCategoryTypes,
    outcomeCategories?.map(String) || [],
  );
  const lifecycleStg = getEnumMultiSelectValueById(
    ProductEnumsReference.LifeCycleStages,
    lifecycleStages?.map(String) || [],
  );

  return {
    businessCriticality: businessCri,
    businessPurpose: businessPrs,
    strategicOutcome: outcomeCtr,
    lifeCycleStage: lifecycleStg,
  };
};

const getEnumMultiSelectValueById = (
  RefProduct: ProductEnumsReference,
  collection: Array<string | undefined>,
) => {
  return MapEnumToObject(RefProduct).filter((f) => collection.includes(f.id));
};

export const policyConditionsPayload = (values: any, id: string) => {
  return {
    businessCriticalities: values.businessCriticality,
    businessPurposes: values.businessPurpose,
    outcomeCategories: values.strategicOutcome,
    lifecycleStages: values.lifeCycleStage,
    policyId: id,
  };
};
