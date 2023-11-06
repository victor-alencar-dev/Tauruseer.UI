import { Link, useFetcher } from '@remix-run/react';
import { Alert, ButtonIndicator, IAlertProps, Modal } from '@tauruseer/core';
import {
  ASSET_DISCOVERY_ACTION,
  IObjectList,
  descriptionValidator,
  mapActiveProduct,
  mapProductBtnIndicator,
  nameValidator,
} from '@tauruseer/module';
import { useEffect, useRef, useState } from 'react';
import MappingToExistingProducts from './map-existing-products.component';
import ProductForm from './new-product.component';

interface IProps {
  onClose: React.EventHandler<any>;
  products: Array<IObjectList>;
  displayName: string;
  assetId?: number;
}

const MapProduct = ({ onClose, displayName, products, assetId }: IProps) => {
  const fetcher = useFetcher();
  const [activeBtn, setActiveBtn] = useState(0);
  const [messageAlert, setMessageAlert] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>();
  const [alertType, setAlertType] = useState<string>('success');
  const [productId, setProductId] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const productFormRef = useRef(null);
  const mapFormRef = useRef(null);
  const setSelected = (key: number) => {
    setActiveBtn(key);
    setShowAlert(false);
  };
  const link = (productId: number): any => {
    return (
      <div>
        {messageAlert}
        {' You can review it on this '}
        {
          <Link
            to={`/products/${productId}/detail`}
            prefetch="intent"
            style={{ color: '#2b734e', marginLeft: '' }}
          >
            {' '}
            link
          </Link>
        }
      </div>
    );
  };
  useEffect(() => {
    const { data, type, state } = fetcher;
    if (type === 'done' && state === 'idle' && (data?.successMapped || data?.successCreated)) {
      const {
        data: { productId },
      } = data;
      setMessageAlert(data?.message);
      setProductId(productId);
      setAlertType('success');
      setShowAlert(true);
    }
    if (type === 'done' && state === 'idle' && data.error) {
      setMessageAlert(data.message);
      setAlertType('danger');
      setShowAlert(data.error);
    }
    if (state === 'submitting' || state === 'loading') {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  }, [fetcher]);

  const saveProduct = () => {
    const form: any = productFormRef.current || {};
    const { _values } = form;
    if (nameValidator(_values.name) || descriptionValidator(_values.description)) {
      setMessageAlert('Name or Description are required');
      setAlertType('danger');
      setShowAlert(true);
      return;
    }
    const payload = {
      ..._values,
      action: ASSET_DISCOVERY_ACTION.CREATE_PRODUCT,
      assetId,
    };
    fetcher.submit({ payload: JSON.stringify(payload) }, { method: 'post' });
  };

  const mapProduct = () => {
    const ref: any = mapFormRef.current || {};
    const {
      _values: { product },
    } = ref;
    if (!product.id) {
      setMessageAlert('Please select a product');
      setAlertType('danger');
      setShowAlert(true);
      return;
    }
    const payload = {
      ...product,
      action: ASSET_DISCOVERY_ACTION.MAP_PRODUCT,
      assetId,
    };
    fetcher.submit({ payload: JSON.stringify(payload) }, { method: 'post' });
  };
  const activeHeight = mapActiveProduct.MapExisting === activeBtn ? '423px' : '523px';
  return (
    <Modal title="Map & Create Product" onClose={onClose} style={{ minHeight: activeHeight }}>
      <div className="d-flex flex-column h-100">
        <div className="mt-2">
          {mapProductBtnIndicator.map((item, index) => {
            return (
              <ButtonIndicator
                Event={setSelected}
                id={index}
                key={index}
                title={item.title}
                isActive={activeBtn === index}
                hasIndicator={item.hasIndicator}
              />
            );
          })}
        </div>
        {showAlert && (
          <div className=" mt-3 ps-3 pe-3">
            <Alert
              title="Product Action"
              timeToClose={5000}
              type={alertType as IAlertProps['type']}
              onClose={() => setShowAlert(false)}
            >
              <p>{alertType === 'success' ? link(productId) : messageAlert} </p>
            </Alert>
          </div>
        )}
        <div className="pt-2 d-flex flex-column h-100 ps-3 pe-3">
          {mapActiveProduct.MapExisting === activeBtn ? (
            <MappingToExistingProducts
              products={products}
              refForm={mapFormRef}
              saveMapping={mapProduct}
              cancelMapping={onClose}
              isSubmitting={isSubmitting}
            />
          ) : (
            <ProductForm
              displayName={displayName}
              refForm={productFormRef}
              saveProduct={saveProduct}
              cancelMapping={onClose}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MapProduct;
