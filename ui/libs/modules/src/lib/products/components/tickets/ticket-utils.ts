import {
  IAffectedProducts,
  ICognitionDetails,
  IVulnerability,
  TCodeVulnerability,
  TCodeVulnerabilityInstance,
} from '@tauruseer/module';

export const getDescriptionFromVulnerabilityData = (
  vulnerabilityData: IVulnerability,
  instanceId: number,
) => {
  if (vulnerabilityData == null) return '';
  const { vulnerabilityId, vulnerabilityDescription, affectedAssets } = vulnerabilityData;

  const instance = affectedAssets?.find(
    (item: IAffectedProducts) =>
      item.sourceRepoDependencyVersionVulnerabilityId === Number(instanceId),
  );

  return `Vulnerability ID: ${vulnerabilityId}
Description: ${vulnerabilityDescription?.trim()}

Dependency: ${instance?.dependency} ${instance?.version}
Repository: ${instance?.sourceRepo}`;
};

export const getTitleFromVulnerabilityData = (vulnerabilityData: IVulnerability) => {
  if (vulnerabilityData == null) return '';
  const { vulnerabilityId } = vulnerabilityData;

  return `Vulnerability issue: ${vulnerabilityId}`;
};

export const getDescriptionFromCognitionData = (cognitionData: ICognitionDetails) => {
  if (cognitionData == null) return '';
  return `Insight: ${cognitionData.insightTypeName}
Description: ${cognitionData.message}`;
};

export const getTitleFromCognitionData = (cognitionData: ICognitionDetails) => {
  if (cognitionData == null) return '';
  return `Insight Issue: ${cognitionData.insightTypeName}`;
};

export const getTitleFromCodeVulnerabilityData = (codeVulnerabilityData: TCodeVulnerability) => {
  if (codeVulnerabilityData == null) return '';
  const message = codeVulnerabilityData.message;

  return `Code issue: ${message}`;
};

export const getDescriptionFromCodeVulnerabilityData = (
  codeVulnerabilityData: TCodeVulnerabilityInstance,
) => {
  if (codeVulnerabilityData == null) return '';
  return `Description: ${codeVulnerabilityData?.message} ${codeVulnerabilityData?.ruleName}
Project: ${codeVulnerabilityData?.projectName}
Path: ${codeVulnerabilityData?.component}
Line: ${codeVulnerabilityData?.line}
External URL: ${codeVulnerabilityData.issueDetailUrl}`;
};
