import { IProducts } from '@tauruseer/module';
import InfoCardItemComponent from './info-card-item.component';

export interface Item {
  name: string;
  sub: string;
  value: number;
  appSec: string;
  to?: string;
}

interface InfoCardsProps {
  product: IProducts;
  cognitionCount: number;
  vulnerabilityCount: number;
  codeVulnerabilityCount: number;
  policyViolationsSummary: any;
}

export const InfoCards = ({
  product,
  cognitionCount,
  vulnerabilityCount,
  policyViolationsSummary,
  codeVulnerabilityCount,
}: InfoCardsProps) => {
  const dataInfo: Item[] = [
    {
      name: 'Policy Violations',
      sub: `FYTD - ${policyViolationsSummary.change}`,
      value: policyViolationsSummary.total,
      appSec: 'ASPM related',
      to: 'policy-violations',
    },
    {
      name: `Cognitions`,
      sub: 'FYTD - 1',
      value: cognitionCount,
      appSec: 'ASPM related',
      to: 'cognitions',
    },
    {
      name: 'OSS Vulnerabilities',
      sub: 'FYTD - 1',
      value: vulnerabilityCount,
      appSec: 'ASPM related',
      to: 'vulnerabilities',
    },
    {
      name: 'Code Vulnerabilities',
      sub: 'FYTD - 1',
      value: codeVulnerabilityCount,
      appSec: 'ASPM related',
      to: 'code-vulnerabilities',
    },
  ];

  return (
    <>
      {dataInfo.map((item, i) => (
        <InfoCardItemComponent item={item} product={product} key={i} />
      ))}
    </>
  );
};
