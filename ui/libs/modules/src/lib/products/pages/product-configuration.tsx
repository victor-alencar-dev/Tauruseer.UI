import { Link, Outlet, useLocation, useParams } from '@remix-run/react';
import { Breadcrumbs, ButtonIndicator } from '@tauruseer/core';
import { productConfigBreadcrumbs, productConfigure } from '@tauruseer/module';
import { useEffect } from 'react';
import { ProductStore } from '../state/product-storage';

export const ConfigureProducts = (data: any) => {
  const store = ProductStore((state) => state);
  const { id, name } = data;
  const { productId } = useParams();
  const { pathname } = useLocation();
  const buttonIsActive = (to: string) => {
    return pathname.includes(to);
  };
  useEffect(() => {
    store.setProductId(`${productId}`);
    if (store.isCardOpen) {
      store.setIsCardOpen(false);
    }
  }, []);

  return (
    <div className="configure-product-container">
      <Breadcrumbs data={productConfigBreadcrumbs(id, name)} className="mb-3" />
      <div className="mb-4 card card-content" style={{ padding: '1rem' }}>
        <label className={`text-end me-2 text-md text-muted configure-product-text`}>
          <i className="fa-solid fa-chevron-left me-2"></i>
          <span className="me-2">
            <Link
              to={`/products`}
              prefetch="intent"
              style={{ textDecoration: 'none', color: '#333f4880' }}
              className="ff-ubuntu"
            >
              Back to Product
            </Link>
          </span>
        </label>
        <div className="d-flex align-items-center">
          <span className="k-icon k-i-gear fs-2 me-2"></span>
          <div>
            <h3 className="align-middle mb-1 typography-display">Configure Product</h3>
            <label
              className="mb-1 text-muted typography-body2 fw-semibold"
              style={{ marginLeft: ' .2rem' }}
            >
              {name || 'New Product'}
            </label>
          </div>
        </div>

        <div className="mt-4">
          {productConfigure.map((item, index) => {
            return (
              <ButtonIndicator
                id={index}
                key={index}
                title={item.title as string}
                isActive={buttonIsActive(item.to as string)}
                hasIndicator={item.hasIndicator as boolean}
                disabled={productId === 'new' && name === ''}
                link
                to={`/products/${productId}/configure-product/${item.to}`}
              />
            );
          })}
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default ConfigureProducts;
