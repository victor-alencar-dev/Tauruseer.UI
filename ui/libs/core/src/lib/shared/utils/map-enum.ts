import {
  BusinessCriticalities,
  BusinessPurposes,
  BusinessTypes,
  FinancialImpacts,
  InsightDismissedReason,
  InternetExposure,
  LifeCycleStages,
  OutcomeCategoryTypes,
  PolicyScope,
  PolicyType,
  ProductEnumsReference,
  Regulation,
  RiskIQLevel,
  RuleResult,
  RuleType,
  SensitiveDataClassification,
  ToolStatus,
} from '../models/core-dataInfo.model';

export const EnumToMap: { [key: string]: object } = {
  [ProductEnumsReference.BusinessCriticalities]: BusinessCriticalities,
  [ProductEnumsReference.BusinessPurposes]: BusinessPurposes,
  [ProductEnumsReference.BusinessTypes]: BusinessTypes,
  [ProductEnumsReference.FinancialImpacts]: FinancialImpacts,
  [ProductEnumsReference.InternetExposure]: InternetExposure,
  [ProductEnumsReference.LifeCycleStages]: LifeCycleStages,
  [ProductEnumsReference.OutcomeCategoryTypes]: OutcomeCategoryTypes,
  [ProductEnumsReference.Regulation]: Regulation,
  [ProductEnumsReference.RiskIQLevel]: RiskIQLevel,
  [ProductEnumsReference.SensitiveDataClassification]: SensitiveDataClassification,
  [ProductEnumsReference.PolicyType]: PolicyType,
  [ProductEnumsReference.ToolStatus]: ToolStatus,
  [ProductEnumsReference.PolicyScope]: PolicyScope,
  [ProductEnumsReference.RuleType]: RuleType,
  [ProductEnumsReference.RuleResult]: RuleResult,
  [ProductEnumsReference.InsightDismissedReason]: InsightDismissedReason,
};

export const MapEnumToObject = (enums: ProductEnumsReference) => {
  const enumToList = EnumToMap[enums] as { [key: string]: object };
  return Object.keys(enumToList)
    .filter((v) => isNaN(Number(v)) !== false)
    .map((k) => ({ id: String(enumToList[k]), title: k.replace(/_/g, ' ') }));
};

export const MapEnumToKeyValue = (enums: any) => {
  return Object.keys(enums)
    .filter((v) => isNaN(Number(v)) !== false)
    .map((k) => k);
};

export const SetFirstLetterToUpperCase = (dataSources: Array<string>) => {
  return dataSources.map((v) => `${v[0].toLocaleUpperCase()}${v.slice(1).toLocaleLowerCase()}`);
};
