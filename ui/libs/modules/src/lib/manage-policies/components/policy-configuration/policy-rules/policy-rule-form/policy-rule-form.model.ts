import { MapEnumToObject, ProductEnumsReference } from '@tauruseer/core';
import { IPolicyRules } from '../../../../model/manage-policies.model';

export const InitialValues = (rules: IPolicyRules | undefined, techList: any) => {
  const { ruleResult, technologyId, notes, id } = rules || {};

  const results = getEnumListValueById(ProductEnumsReference.RuleResult, ruleResult?.toString());
  const rulesType = getEnumListValueById(ProductEnumsReference.RuleType, '2');
  const technology = techList.filter((f: any) => f.uniqueId === technologyId).pop();

  return {
    ruleType: rulesType,
    ruleTarget: technology,
    result: results,
    notes: notes,
    id,
  };
};

export const getEnumListValueById = (RefProduct: ProductEnumsReference, id: string | undefined) => {
  return MapEnumToObject(RefProduct)
    .filter((f) => f.id === id)
    .pop();
};

export const policyRulesPayload = (values: any, id: string, action: string) => {
  return {
    ruleResult: Number(values.result?.id),
    technologyId: values.ruleTarget?.uniqueId,
    notes: values.notes,
    id: id,
    ruleId: values.id,
    action: action,
  };
};
