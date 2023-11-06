import { Link } from '@remix-run/react';
import { IPolicyInfoCard } from './policy-info-card';

export function PolicyInfoCardHeader({ policy }: IPolicyInfoCard) {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex">
        <div>
          <label className="d-block typography-h1">{policy?.name}</label>
          <label className="d-block typography-h2 text-muted">Policy Info Card</label>
        </div>
      </div>
      <label className="text-end me-2 typography-h1 text-muted configure-product-text">
        <span className="me-2">
          <Link
            to={`/manage-policies/${policy?.uniqueId}/configure-policy/policy-detail`}
            prefetch="intent"
            style={{ textDecoration: 'none', color: '#333f4880', fontSize: '14px' }}
            className="ff-ubuntu"
          >
            Configure Policy
          </Link>
        </span>
        <i className="fa-solid fa-gear"></i>
      </label>
    </div>
  );
}
