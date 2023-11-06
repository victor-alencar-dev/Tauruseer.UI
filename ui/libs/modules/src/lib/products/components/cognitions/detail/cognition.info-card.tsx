import {
  categoryNames,
  CognitionStatus,
  ICognitionDetails,
  IProducts,
  severityChipTypes,
  severityNames,
} from '@tauruseer/module';
import dayjs from 'dayjs';

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export interface CognitionInfoCardProps {
  product: IProducts;
  cognition: ICognitionDetails;
}

const CognitionInfoCard = ({ product, cognition }: CognitionInfoCardProps) => {
  const firstDetection = dayjs(cognition.firstDetectedAt).format('DD/MM/YYYY - H:MM A');
  const lastDetection = dayjs(cognition.lastDetectedAt).format('DD/MM/YYYY - H:MM A');
  const chipType = severityChipTypes[cognition.severity];
  const chipClassName = `chip chip-outlined-${chipType}`;
  const severityName = severityNames[cognition.severity];
  const categoryName = categoryNames[cognition.category];

  return (
    <div className="card card-content" style={{ height: '366px' }}>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <div className="typography-h1 text-xl">{cognition?.insightTypeName}</div>
          <div className="typography-h2 text-muted font-bold">Cognition Info Card</div>
        </div>
        <div style={{ minWidth: '64px' }} className="chip chip-primary-dark">
          {cognition.status === CognitionStatus.Active ? 'Active' : 'New'}
        </div>
      </div>

      <div className="mb-4">
        <div className="typography-body2 text-md mb-1">Insight</div>
        <div className="typography-body1 text-md">{cognition.message}</div>
      </div>

      <div className="row">
        <div className="col-6 mb-3">
          <div className="typography-body2 text-md mb-2">First detection</div>
          <div className="typography-body1 text-md mb-1">{firstDetection}</div>
        </div>

        <div className="col-6">
          <div className="typography-body2 text-md mb-2">Severity</div>
          <div style={{ maxWidth: '100px' }} className={chipClassName}>
            {capitalize(severityName)}
          </div>
        </div>

        <div className="col-6 mb-3">
          <div className="typography-body2 text-md mb-2">Last detection</div>
          <div className="typography-body1 text-md mb-1">{lastDetection}</div>
        </div>

        <div className="col-6">
          <div className="typography-body2 text-md mb-2">Category</div>
          <div className="typography-body1 text-md mb-1">{categoryName}</div>
        </div>
      </div>
    </div>
  );
};

export default CognitionInfoCard;
