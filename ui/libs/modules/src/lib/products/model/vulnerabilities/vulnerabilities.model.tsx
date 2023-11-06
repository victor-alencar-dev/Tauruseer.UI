import {
  ExternalService,
  IBreadcrumb,
  InfoCardProps,
  StatusItems,
  TChipModifier,
  TTableData,
  capitalize,
  getShortPath,
} from '@tauruseer/core';
import {
  IHeaderButton,
  IProducts,
  IVulnerability,
  TCodeVulnerabilityInstance,
} from '@tauruseer/module';
import dayjs from 'dayjs';

export enum VulnerabilitiesStatus {
  New = 0,
  Active = 1,
  Dismissed = 2,
}

export enum VulnerabilitiesItemStatus {
  New = 'New',
  InProgress = 'InProcess',
  RiskAccepted = 'RiskAccepted',
}

export const vulnerabilitiesBreadcrumbData: (product: IProducts) => IBreadcrumb[] = (
  product: IProducts,
) => [
  { id: 'products', text: 'Products', to: '/products' },
  { id: 'product-name', to: `/products/${product.id}/detail`, text: product.name as string },
  { id: 'vulnerabilities', text: 'Vulnerabilities', to: '/#', disabled: true },
];

export const vulnerabilityDetailsBreadcrumbData: (
  product: IProducts,
  vulnerability: IVulnerability,
) => IBreadcrumb[] = (product: IProducts, vulnerability: IVulnerability) => [
  { id: 'products', text: 'Products', to: '/products' },
  { id: 'product-name', to: `/products/${product.id}/detail/`, text: product.name as string },
  {
    id: 'vulnerabilities',
    text: 'Vulnerabilities',
    to: `/products/${product.id}/vulnerabilities`,
  },
  {
    id: 'vulnerabilities-name',
    text: vulnerability.vulnerabilityId as string,
    to: '/#',
    disabled: true,
  },
];

export const vulnerabilitiesHeaderButtons: IHeaderButton[] = [
  {
    title: 'New',
    hasIndicator: true,
  },
  {
    title: 'In Progress',
    hasIndicator: true,
  },
  {
    title: 'Risk Accepted',
    hasIndicator: true,
  },
];

export const VulnerabilityVCSSLayout = {
  exploitabilityMetricsLayoutV2: [
    {
      title: 'Access Vector',
      ref: 'accessVector',
    },
    {
      title: 'Access Complexity',
      ref: 'accessComplexity',
    },
    {
      title: 'Authentication',
      ref: 'authentication',
    },
  ],
  exploitabilityMetricsLayoutV3: [
    {
      title: 'Attack Vector',
      ref: 'attackVector',
    },
    {
      title: 'Attack Complexity',
      ref: 'attackComplexity',
    },
    {
      title: 'Privileges Required',
      ref: 'privilegesRequired',
    },
    {
      title: 'User Interaction',
      ref: 'userInteraction',
    },
    {
      title: 'scope',
      ref: 'scope',
    },
  ],
  impactMetricsLayout: [
    {
      title: 'Confidentially Impact',
      ref: 'confidentiallyImpact',
    },
    {
      title: 'Integrity Impact',
      ref: 'integrityImpact',
    },
    {
      title: 'Availability Impact',
      ref: 'availabilityImpact',
    },
  ],
};

type TVulnerabilityContent = {
  productId?: string;
  product?: IProducts;
  vulnerability: IVulnerability;
  onAcceptMultipleRisks: (instanceIds: number[]) => void;
  onAcceptRisk?: (instanceId: number) => void;
  onExpandModal: () => void;
};

const scoreModifier = (score: number) => {
  if (score <= 3.9) {
    return 'low';
  }
  if (score <= 6.9) {
    return 'medium';
  }
  if (score <= 8.9) {
    return 'high';
  }
  return 'critical';
};

const severityModifier: { [a: string]: TChipModifier } = {
  info: 'info',
  low: 'low',
  medium: 'medium',
  high: 'high',
  critical: 'critical',
};

export const vulnerabilityContent = ({
  productId,
  product,
  vulnerability,
  onAcceptRisk,
  onExpandModal,
  onAcceptMultipleRisks,
}: TVulnerabilityContent) => {
  const availableCVSS = vulnerability.availableCvssVersions.sort().reverse();
  const cvss = vulnerability.vulnerabilityCvss.find((vcss) => vcss.version === availableCVSS[0]);

  const references =
    vulnerability.referenceLinks?.length > 0
      ? vulnerability.referenceLinks.map((reference) => ({
          copy: reference.url,
          url: reference.url,
          description: reference.description,
        }))
      : undefined;

  const mapTableData: (data: IVulnerability) => TTableData[] = (data: IVulnerability) => {
    const { affectedAssets } = data;
    return affectedAssets.map((item) => ({
      id: item.sourceRepoDependencyVersionVulnerabilityId,
      dependency: { title: `${item.dependency} ${item.version}` },
      detection: {
        title: dayjs(item.firstDetectionDate).format('MM/DD/YYYY') ?? '',
        description: dayjs(item.firstDetectionDate).fromNow() ?? '',
      },
      repository: {
        title: item.sourceRepo,
        referenceLink: `/asset-discovery/detail/${item.assetId}`,
      },
      product: { title: item.productName },
      status: {
        badge: {
          copy: StatusItems[item.itemStatus].copy,
          type: 'status',
          modifier: StatusItems[item.itemStatus].modifier,
        },
      },
      trackingItem: { title: item.workItemExternalKey, referenceLink: item.workItemExternalUrl },
      actions: {
        buttons: [
          {
            icon: 'file-plus',
            color: item.workItemExternalId ? '#ACACAC' : '#4231B4',
            referenceLink: item.workItemExternalId
              ? undefined
              : `/products/${productId}/track-item?cve=${vulnerability.vulnerabilityId}&instanceId=${item.sourceRepoDependencyVersionVulnerabilityId}`,
            tooltip: 'Create work item',
          },

          {
            icon: 'triangle-exclamation',
            color: item.itemStatus === 'RiskAccepted' ? '#ACACAC' : '#4231B4',
            callback: onAcceptRisk
              ? () => onAcceptRisk(item.sourceRepoDependencyVersionVulnerabilityId)
              : undefined,
            tooltip: 'Accept risk',
            disabled: item.itemStatus === 'RiskAccepted',
          },
        ],
      },
    })) as TTableData[];
  };

  const getTableTitleCopy = () => {
    if (product) {
      return `${vulnerability.affectedAssets.length} Instances in ${product?.name}`;
    } else {
      const uniqueProducts: string[] = vulnerability.affectedAssets.reduce(
        (acc: string[], asset: any) => {
          if (!acc.includes(asset.productName)) {
            acc.push(asset.productName);
          }
          return acc;
        },
        [],
      );

      return `${vulnerability.affectedAssets.length} Instances in ${uniqueProducts.length} Products`;
    }
  };

  const content: InfoCardProps = {
    header: {
      title: vulnerability.vulnerabilityId as string,
    },
    sideBar: {
      items: [
        {
          type: 'icon',
          icon: ExternalService.DocioScanner,
          title: 'Source',
          iconColor: '#0F0B29',
        },
        {
          type: 'severity',
          copy: `${cvss?.baseScore.toFixed(1)}` || 'Not Available',
          title: `CVSS v${availableCVSS[0]}`,
          modifier: scoreModifier(cvss?.baseScore || 0),
        },
        {
          type: 'severity',
          modifier: severityModifier[vulnerability.severity.toLowerCase()],
          copy: capitalize(vulnerability.severity?.toLowerCase()),
          title: 'Severity',
        },
        {
          type: 'badge',
          copy: `${vulnerability.epss}%` || 'Not Available',
          title: 'EPSS',
        },
        {
          type: 'badge',
          title: 'Known Exploitation',
          copy: vulnerability.kev ? 'Active' : 'Not Available',
          icon: vulnerability.kev ? 'triangle-exclamation' : undefined,
          modifier: vulnerability.kev ? 'danger' : undefined,
        },
      ],
    },
    table: {
      action: {
        copy: 'Accept Risk',
        disabled: (selected) => {
          return (
            Object.keys(selected)
              .filter((key) => selected[key])
              .filter(
                (key) =>
                  vulnerability.affectedAssets.find(
                    (item) => item.sourceRepoDependencyVersionVulnerabilityId === Number(key),
                  )?.itemStatus !== 'RiskAccepted',
              ).length === 0
          );
        },
        onClick: (selected) => {
          const instanceIds = Object.keys(selected)
            .filter((key) => selected[key])
            .filter(
              (key) =>
                vulnerability.affectedAssets.find(
                  (item) => item.sourceRepoDependencyVersionVulnerabilityId === Number(key),
                )?.itemStatus !== 'RiskAccepted',
            )
            .map(Number);
          onAcceptMultipleRisks(instanceIds);
        },
      },
      title: getTableTitleCopy(),
      fields: [
        { field: 'dependency', title: 'Dependency' },
        { field: 'detection', title: 'Detection' },
        { field: 'repository', title: 'Repository' },
        { field: 'product', title: 'Product' },
        { field: 'status', title: 'Status' },
        { field: 'trackingItem', title: 'Tracking Item' },
        ...(product ? [{ field: 'actions', title: 'Actions' }] : []),
      ],
      confirmationFields: [
        { field: 'dependency', title: 'Dependency' },
        { field: 'detection', title: 'Detection' },
        { field: 'repository', title: 'Repository' },
        { field: 'product', title: 'Product' },
      ],
      data: mapTableData(vulnerability),
    },
    references: references
      ? {
          items: references,
        }
      : undefined,
    textbox: {
      content: vulnerability.vulnerabilityDescription,
      action: {
        copy: 'Expand',
        onClick: () => onExpandModal(),
        icon: 'arrows-maximize',
      },
    },
  };

  return content;
};
