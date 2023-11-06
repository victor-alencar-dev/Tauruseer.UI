import { Button } from '@progress/kendo-react-buttons';
import { ICognitionDetails, IProducts } from '@tauruseer/module';
import { useState } from 'react';
import DismissForm from './cognitions-dismiss-form';
import { Link } from '@remix-run/react';

export interface CognitionActionCardProps {
  product: IProducts;
  cognition: ICognitionDetails;
}

const CognitionActionCard = ({ product, cognition }: CognitionActionCardProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleDialog = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="card card-content" style={{ height: '366px' }}>
        <div className="mb-4">
          <div>
            <div className="typography-h1 text-xl">Actions</div>
            <div className="typography-h2 text-muted font-bold">remediation's</div>
          </div>
        </div>

        {/* <div className="mb-4 typography-body1 text-md">
          Lorem ipsum dolor sit amet consectetur. In venenatis hendrerit enim ultricies sed neque
          viverra. Dolor varius nunc faucibus magna lectus scelerisque. Id lorem massa tortor erat.
        </div> */}

        <Button
          style={{ width: '150px' }}
          className="button button-error mb-3"
          iconClass="fa fa-trash"
          onClick={toggleDialog}
        >
          Dismiss Insight
        </Button>

        <Link to={`/products/${product.id}/track-item?cognitionId=${cognition.insightId}`}>
          <Button style={{ width: '150px' }} className="button button-secondary">
            Create Work Item
          </Button>
        </Link>
      </div>
      {toggle && (
        <DismissForm onClose={toggleDialog} productId={product.id} cognition={cognition} />
      )}
    </>
  );
};

export default CognitionActionCard;
