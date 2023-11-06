export type VulnerabilitiesSeverity = 'error' | 'warning';
export interface VulnerabilityActions {
  trackItem: boolean;
  trainingAvailable: boolean;
}

export interface IVulnerabilities {
  count: number;
  scanId: number;
  dependencyName: string;
  dependencyVersion: string;
  vulnerabilityList: IVulnerability[];
}
export interface IVulnerability {
  id: string;
  cveId: string;
  itemStatus?: string;
  name: string;
  description: string;
  source: string;
  dataSource: string;
  referenceLink: string;
  severity: VulnerabilitiesSeverity;
  firstDetection: string;
  lastDetection: string;
  actions: VulnerabilityActions;
  dependenciesTechnologies: any;
  isActive: boolean;
  productId: string;
  owner?: string;
  mitreUrl?: string;
  nistURL?: string;
  vulnerabilityDescription?: string;
  vulnerabilityId: string;
  vulnerabilityCvss: Array<IVulnerabilityVCSS>;
  affectedAssets: IAffectedProducts[];
  detectedBy: string;
  workItemId: string | null;
  availableCvssVersions: string[];
  epss: string;
  kev: string;
  referenceLinks: {
    url: string;
    description: string;
  }[];
}

export interface IVulnerabilityVCSS {
  cvssScoreSource: string;
  obtainAllPrivilege: boolean;
  obtainUserPrivilege: boolean;
  obtainOtherPrivilege: boolean;
  userInteractionRequired: boolean;
  version: string;
  vectorString: string;
  baseScore: number;
  baseSeverity: string;
  exploitabilityScore: number;
  impactScore: number;
  accessVector: string;
  accessComplexity: string;
  authentication: string;
  confidentialityImpact: string;
  integrityImpact: string;
  availabilityImpact: string;
  userInteraction: string;
  scope: string;
  attackVector: string;
  attackComplexity: string;
  privilegesRequired: string;
}

export interface IExploitabilityMetrics {
  accessVector: string;
  accessComplexity: string;
  authentication: string;
  attackVector: string;
  attackComplexity: string;
  privilegesRequired: string;
  userInteraction: string;
  scope: string;
}
export interface IImpactMetrics {
  confidentiallyImpact: string;
  integrityImpact: string;
  availabilityImpact: string;
}

export interface IAffectedProducts {
  productId: number;
  name: string;
  dependency: string;
  version: string;
  firstDetectionDate: string;
  lastDetectionDate: string;
  sourceRepo: string;
  owner: string;
  ownerEmail: string;
  productName: string;
  assetId: number;
  itemStatus: string;
  workItemExternalUrl: string;
  workItemExternalId: string;
  workItemExternalKey: string;
  sourceRepoDependencyVersionVulnerabilityId: number;
}
