import { Fade } from '@progress/kendo-react-animation';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Link, Outlet, useLocation, useNavigate } from '@remix-run/react';
import { Breadcrumbs, ButtonIndicator } from '@tauruseer/core';
import { useState } from 'react';
import { policyConfigure } from '../model/configure-policy.model';
import { policyConfigBreadcrumbs } from '../model/manage-policies-breadcrumb';

export const ConfigurePolicy = (data: any) => {
  const { uniqueId, name } = data;
  const { pathname } = useLocation();
  const [showAlert, setShowAlert] = useState<boolean>();
  const buttonIsActive = (to: string) => {
    return pathname.includes(to);
  };
  const navigate = useNavigate();
  const navigateUrl = (isNew: string, uniqueId: string, to: string) => {
    if (!isNew) {
      setShowAlert(true);
    } else {
      navigate(`/manage-policies/${uniqueId}/configure-policy/${to}`);
    }
  };
  return (
    <div className="configure-product-container">
      <Breadcrumbs data={policyConfigBreadcrumbs(uniqueId, name)} className="mb-3" />
      <div className="mb-4 card card-content" style={{ padding: '1rem' }}>
        <label className={`text-end me-2 text-md text-muted configure-product-text`}>
          <i className="fa-solid fa-chevron-left me-2"></i>
          <span className="me-2">
            <Link
              to={`/manage-policies`}
              prefetch="intent"
              style={{ textDecoration: 'none', color: '#333f4880' }}
              className="ff-ubuntu"
            >
              Back to Policy
            </Link>
          </span>
        </label>
        <div className="d-flex align-items-center">
          <span className="k-icon k-i-gear fs-2 me-2"></span>
          <div>
            <h3 className="align-middle mb-1 typography-display">Configure Policy</h3>
            <label
              className="mb-1 text-muted typography-body2 fw-semibold"
              style={{ marginLeft: ' .2rem' }}
            >
              {name || 'New Policy'}
            </label>
          </div>
        </div>

        <div className="mt-4">
          {policyConfigure.map((item, index) => {
            return (
              <ButtonIndicator
                id={index}
                key={index}
                title={item.title as string}
                isActive={buttonIsActive(item.to as string)}
                hasIndicator={item.hasIndicator as boolean}
                Event={() => navigateUrl(name, `${uniqueId}`, `${item.to}`)}
              />
            );
          })}
        </div>
      </div>
      <NotificationGroup
        style={{
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          alignItems: 'flex-start',
          flexWrap: 'wrap-reverse',
        }}
      >
        <Fade>
          {showAlert && (
            <Notification
              type={{ style: 'info', icon: true }}
              closable={true}
              onClose={() => setShowAlert(false)}
              className="d-flex align-items-center"
            >
              <span className="m-1"> Please create a Policy first. </span>
            </Notification>
          )}
        </Fade>
      </NotificationGroup>
      <Outlet />
    </div>
  );
};

export default ConfigurePolicy;
