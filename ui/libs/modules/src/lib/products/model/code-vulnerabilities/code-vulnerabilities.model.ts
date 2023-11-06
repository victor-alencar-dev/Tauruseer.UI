import {
  ExternalService,
  IBreadcrumb,
  InfoCardProps,
  TChipModifier,
  TTableData,
  TWorkItem,
  capitalize,
  externalServiceFromInt,
} from '@tauruseer/core';
import {
  IHeaderButton,
  IProducts,
  TCodeVulnerability,
  TCodeVulnerabilityReference,
} from '@tauruseer/module';
import dayjs from 'dayjs';

export const ACCEPT_RISK_INTENT = 'acceptRisk';

type ICodeVulnerabilityBreadcrumb = {
  productId: string;
  productName: string;
  codeVulnerabilityId?: string;
};

export const codeVulnerabilityDetailsBreadcrumbData: (
  props: ICodeVulnerabilityBreadcrumb,
) => IBreadcrumb[] = ({ productId, codeVulnerabilityId, productName }) => [
  { id: 'products', text: 'Products', to: '/products' },
  { id: 'product-name', to: `/products/${productId}/detail/`, text: productName },
  {
    id: 'code-vulnerabilities',
    text: 'Code Vulnerabilities',
    to: `/products/${productId}/code-vulnerabilities`,
  },
  {
    id: 'vulnerabilities-name',
    text: codeVulnerabilityId,
    to: '/#',
    disabled: true,
  },
];

type TCodeVulnerabilityContent = {
  productId: string;
  product: IProducts;
  codeVulnerability: TCodeVulnerability;
  workItem: TWorkItem | null;
  codeVulnerabilityDescription: string;
  onAcceptRisk: (instanceId: number) => void;
  onAcceptMultipleRisks: (instanceIds: number[]) => void;
  onExpandModal: () => void;
};

export const codeVulnerabilityContent = ({
  productId,
  product,
  codeVulnerability,
  codeVulnerabilityDescription,
  onAcceptRisk,
  onExpandModal,
  onAcceptMultipleRisks,
}: TCodeVulnerabilityContent) => {
  const { ruleName, severity, type, ruleId } = codeVulnerability;

  const severityModifier: { [a: string]: TChipModifier } = {
    info: 'info',
    minor: 'warning',
    major: 'danger',
    critical: 'danger',
    blocker: 'danger',
  };

  const StatusItems: { [a: string]: { copy: string; modifier: string } } = {
    New: { copy: 'New', modifier: 'primary' },
    InProcess: { copy: 'In Progress', modifier: 'secondary' },
    RiskAccepted: { copy: 'Risk Accepted', modifier: 'error' },
  };

  const typeIcons: { [a: string]: string } = {
    BUG: 'bug',
    CODE_SMELL: 'code',
    VULNERABILITY: 'light-emergency-on',
  };

  const referenceItems = codeVulnerability.referenceLinks.map((reference) => ({
    copy: reference.description.split(' - ')[0].trim(),
    url: reference.url,
    description: reference.description.split(' - ')[1].trim(),
  }));

  const getShortPath = (path: string) => {
    const pathArray = path.split('/');
    return pathArray.length > 3
      ? `${pathArray[0]}/${pathArray[1]}/.../${pathArray[pathArray.length - 1]}`
      : path;
  };

  const tableDataCount = codeVulnerability.codeAnalysisIssueDetailList.length;

  const mapTableData: (data: TCodeVulnerability) => TTableData[] = (data: TCodeVulnerability) => {
    const { codeAnalysisIssueDetailList } = data;
    return codeAnalysisIssueDetailList.map((item) => ({
      id: item.codeAnalysisIssueId,
      file: { title: getShortPath(item.component), copyToClipboard: item.component },
      line: { title: String(item.line) },
      detection: {
        title: dayjs(item.created).format('MM/DD/YYYY') ?? '',
        description: dayjs(item.created).fromNow() ?? '',
      },
      project: { title: item.projectName, referenceLink: item.issueDetailUrl },
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
            color: item.workItemId ? '#ACACAC' : '#4231B4',
            referenceLink: item.workItemId
              ? undefined
              : `/products/${productId}/track-item?instanceId=${item.codeAnalysisIssueId}&hash=${item.hash}`,
            tooltip: 'Create work item',
          },

          {
            icon: 'triangle-exclamation',
            color: item.itemStatus === 'RiskAccepted' ? '#ACACAC' : '#4231B4',
            callback: () => onAcceptRisk(item.codeAnalysisIssueId),
            tooltip: 'Accept risk',
            disabled: item.itemStatus === 'RiskAccepted',
          },
        ],
      },
    })) as TTableData[];
  };

  const content: InfoCardProps = {
    header: {
      title: ruleName ?? '',
    },
    sideBar: {
      items: [
        {
          type: 'icon',
          icon: ExternalService.Sonar,
          title: 'Source',
          iconColor: '#549DD0',
        },
        {
          type: 'badge',
          icon: 'circle-exclamation',
          modifier: severityModifier[severity.toLowerCase()],
          copy: capitalize(severity?.toLowerCase()),
          title: 'Severity',
        },
        {
          type: 'badge',
          icon: typeIcons[type],
          title: 'Type',
          copy: capitalize(type?.toLowerCase()),
        },
        {
          type: 'badge',
          copy: ruleId,
          title: 'Rule',
        },
      ],
    },
    references: {
      items: referenceItems,
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
                  codeVulnerability.codeAnalysisIssueDetailList.find(
                    (item) => item.codeAnalysisIssueId === Number(key),
                  )?.itemStatus !== 'RiskAccepted',
              ).length === 0
          );
        },
        onClick: (selected) => {
          const instanceIds = Object.keys(selected)
            .filter((key) => selected[key])
            .filter(
              (key) =>
                codeVulnerability.codeAnalysisIssueDetailList.find(
                  (item) => item.codeAnalysisIssueId === Number(key),
                )?.itemStatus !== 'RiskAccepted',
            )
            .map(Number);
          onAcceptMultipleRisks(instanceIds);
        },
      },
      title: `${tableDataCount} Instances in ${product.name}`,
      fields: [
        { field: 'file', title: 'File', size: 'lg' },
        { field: 'line', title: 'Line', size: 'sm' },
        { field: 'detection', title: 'Detection' },
        { field: 'project', title: 'Project' },
        { field: 'product', title: 'Product' },
        { field: 'status', title: 'Status' },
        { field: 'trackingItem', title: 'Tracking Item' },
        { field: 'actions', title: 'Actions' },
      ],
      confirmationFields: [
        { field: 'file', title: 'File', size: 'lg' },
        { field: 'line', title: 'Line', size: 'sm' },
        { field: 'detection', title: 'Detection' },
        { field: 'project', title: 'Project' },
      ],
      data: mapTableData(codeVulnerability),
    },
    textbox: {
      html: codeVulnerabilityDescription,
      action: {
        copy: 'Expand',
        onClick: () => onExpandModal(),
        icon: 'arrows-maximize',
      },
    },
  };

  return content;
};

export const codeVulnerabilitiesHeaderButtons: IHeaderButton[] = [
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
