import { IPolicyViolation, IProducts } from '@tauruseer/module';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export interface PolicyViolationInfoCardProps {
  product: IProducts;
  policyViolation: IPolicyViolation;
}

interface IMappings {
  [key: string]: string;
}

const PolicyViolationInfoCard = ({ product, policyViolation }: PolicyViolationInfoCardProps) => {
  dayjs.extend(localizedFormat);
  const severityMappings: IMappings = {
    Notice: 'info',
    Warning: 'warning',
    Error: 'danger',
    Critical: 'danger',
  };
  const severity = policyViolation.severity;
  const chipType: string = severityMappings[severity];
  const chipClassName = `chip chip-outlined-${chipType}`;

  return (
    <div className="card card-content" style={{ minHeight: '366px' }}>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <div className="typography-h1 text-xl">{policyViolation.policyName}</div>
          <div className="typography-h2 text-muted font-bold">Policy Violation Info Card</div>
        </div>
        <div style={{ minWidth: '64px' }} className="chip chip-primary-dark">
          {policyViolation.isNew ? 'New' : 'Active'}
        </div>
      </div>

      <div className="mb-4">
        <div className="typography-body2 text-md mb-1">Insight</div>
        <div className="typography-body1 text-md">{policyViolation.policyDescription}</div>
      </div>

      <div className="row">
        <div className="col-6 mb-3">
          <div className="typography-body2 text-md mb-2">First detection</div>
          <div className="typography-body1 text-md mb-1">
            {dayjs(policyViolation.detectedAt).format('LL')}
          </div>
        </div>

        <div className="col-6">
          <div className="typography-body2 text-md mb-2">Severity</div>
          <div style={{ maxWidth: '100px' }} className={chipClassName}>
            {capitalize(policyViolation.severity)}
          </div>
        </div>

        <div className="col-6 mb-3">
          <div className="typography-body2 text-md mb-2">Last detection</div>
          <div className="typography-body1 text-md mb-1">
            {dayjs(policyViolation.detectedAt).fromNow()}
          </div>
        </div>

        <div className="col-6">
          <div className="typography-body2 text-md mb-2">Rule Type</div>
          <div className="typography-body1 text-md mb-1">Technology</div>
        </div>
      </div>
    </div>
  );
};

export default PolicyViolationInfoCard;
