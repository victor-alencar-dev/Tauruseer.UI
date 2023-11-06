import { useNavigate } from '@remix-run/react';
import { IProducts } from '@tauruseer/module';
import classNames from 'classnames';
import { Item } from './info-cards.component';
export interface InfoCardItemProps {
  item: Item;
  product: IProducts;
}

const InfoCardItemComponent = ({ item, product }: InfoCardItemProps) => {
  const navigate = useNavigate();

  const valueClassName = classNames('text-xxxl font-bold', {
    'text-success': item.value === 0,
    'text-warning': item.value > 0,
  });

  const handleNavigate = () => {
    navigate(item.to ? `/products/${product.id}/${item.to}` : '#');
  };

  return (
    <div
      className="card py-3 px-4"
      style={{ width: '33%', cursor: 'pointer' }}
      onClick={handleNavigate}
    >
      <div className="d-flex align-items-center">
        <div style={{ minWidth: '55px' }} className="text-center me-3">
          <span className={valueClassName}>{item.value}</span>
        </div>
        <div className="">
          <label style={{ cursor: 'pointer' }} className="d-block typography-body2 mb-1">
            {item.name}
          </label>
          <label
            style={{ cursor: 'pointer' }}
            className="d-block typography-h3 text-muted font-regular text-sm"
          >
            {item.sub}
          </label>
          <label
            style={{ cursor: 'pointer' }}
            className="d-block typography-h3 text-muted font-medium text-sm"
          >
            {item.appSec}
          </label>
        </div>
      </div>
    </div>
  );
};

export default InfoCardItemComponent;
