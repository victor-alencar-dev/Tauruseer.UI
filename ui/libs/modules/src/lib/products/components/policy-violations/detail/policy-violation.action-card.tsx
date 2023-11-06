import { Button } from '@progress/kendo-react-buttons';

export interface PolicyViolationActionCardProps {
  height: number;
}

const PolicyViolationActionCard = ({ height }: PolicyViolationActionCardProps) => {
  return (
    <div className="card card-content" style={{ height: `${height + 2}px` }}>
      <div className="mb-4">
        <div>
          <div className="typography-h1 text-xl">Actions</div>
          <div className="typography-h2 text-muted font-bold">Remediations</div>
        </div>
      </div>
      {/* <div className="mb-4 typography-body1 text-md">
        Lorem ipsum dolor sit amet consectetur. In venenatis hendrerit enim ultricies sed neque
        viverra. Dolor varius nunc faucibus magna lectus scelerisque. Id lorem massa tortor erat.
      </div> */}

      {/* <Button
        style={{ width: '150px' }}
        className="button button-error mb-3"
        iconClass="fa fa-trash"
      >
        Dismiss Insight
      </Button> */}
      <Button style={{ width: '150px' }} className="button button-secondary">
        Create Work Item
      </Button>
    </div>
  );
};

export default PolicyViolationActionCard;
