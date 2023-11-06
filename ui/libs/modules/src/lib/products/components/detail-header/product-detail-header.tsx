import { Avatar } from '@progress/kendo-react-layout';
import { Link, useNavigate } from '@remix-run/react';
import {
  DEVICES,
  InternetExposure,
  Regulation,
  SensitiveDataClassification,
  getActualDeviceRes,
} from '@tauruseer/core';
import { CollapsibleCollection, IProducts, ITeamMembers } from '@tauruseer/module';
import classNames from 'classnames';

export const ProductDetailHeader = (data: IProducts) => {
  const {
    id,
    name,
    internetExposure,
    sensitiveDataClassifications,
    regulations,
    techLead,
    productOwner,
    portfolioOwner,
    securityLead,
    teamSize,
  } = data;
  const device = getActualDeviceRes();
  const navigate = useNavigate();
  const isExpose = internetExposure === InternetExposure.Exposed ? 'Exposed' : 'Not Exposed';
  const setAvatarValues = (avatarInfo?: ITeamMembers, charge?: string) => {
    const avatarValues = avatarInfo || {
      name: 'Not set',
      teamMemberImg: '/user-placeholder.svg',
    };
    return {
      ...avatarValues,
      charge,
    };
  };
  const PO = setAvatarValues(productOwner, 'Product Owner');
  const PTO = setAvatarValues(portfolioOwner, 'Portfolio Owner');
  const TL = setAvatarValues(techLead, 'Tech Lead');
  const SL = setAvatarValues(securityLead, 'Security Lead');
  const teamInfo = [PO, TL, SL, PTO];
  const getKeyValues = (obj: any, values: Array<string | number>) => {
    return values.map((v) => {
      const id = Object.values(obj).indexOf(v);
      return Object.keys(obj)[id];
    });
  };
  const SensitiveColl = getKeyValues(
    SensitiveDataClassification,
    sensitiveDataClassifications || [],
  );
  const ComplianceColl = getKeyValues(Regulation, regulations || []);
  const fontSize = device === DEVICES.LAPTOP ? 'text-md' : 'text-ml';
  const titleContainerClass = classNames('d-flex flex-column justify-content-center col-2', {
    'pe-5': device !== DEVICES.LAPTOP,
    'pe-2': device === DEVICES.LAPTOP,
  });
  const productNameClass = classNames('font-medium mb-1', {
    'text-lg': device === DEVICES.LAPTOP,
    'text-xlg': device !== DEVICES.LAPTOP,
  });
  const avatarNameClass = classNames(`d-block font-regular ${fontSize}`);
  const avatarJobClass = classNames(`font-light ${fontSize}`);
  const opacity = '0.5';
  return (
    <div className="card card-content header-product-details" style={{ marginBottom: '20px' }}>
      <label className={`text-end me-2 ${fontSize} text-muted configure-product-text`}>
        <span className="me-2">
          <Link
            to={`/products/${id}/configure-product/product-details`}
            prefetch="intent"
            style={{ textDecoration: 'none', color: '#333f4880' }}
            className="ff-ubuntu text-md font-regular"
          >
            Configure Product
          </Link>
        </span>

        <i className="fa-solid fa-gear"></i>
      </label>
      <div className="d-flex row">
        <div className={titleContainerClass} style={{ maxWidth: '20% !important' }}>
          <label className={productNameClass}>{name}</label>
        </div>
        <div className="d-flex d-flex flex-column border-start ps-4 flex-fill col-10">
          <div className="border-bottom mb-2 pb-2">
            <label className="me-5" style={{ width: '15%' }}>
              <span className={avatarNameClass}> Internet Exposure</span>
              <span
                className={`chip chip-secondary me-2 chip-small`}
                style={{ width: device === DEVICES.LAPTOP ? '100%' : '50%' }}
              >
                {' '}
                {isExpose}
              </span>
            </label>
            <label className="me-5 font-regular">
              <span className={avatarNameClass}> Sensitive Data</span>
              {SensitiveColl.length ? (
                <CollapsibleCollection dataInfo={SensitiveColl} limit={3} />
              ) : (
                'No Sensitive Data Found'
              )}
            </label>
            <label className="font-regular">
              <span className={avatarNameClass}>Compliance</span>
              {ComplianceColl.length ? (
                <CollapsibleCollection dataInfo={ComplianceColl} limit={3} />
              ) : (
                'No Compliance Data Found'
              )}
            </label>
          </div>
          <div className="d-flex flex-fill">
            {teamInfo.slice(0, device === DEVICES.LAPTOP ? -1 : 4).map((t, i) => {
              return (
                <div className="d-flex align-items-center me-5 ff-ubuntu" key={i}>
                  <Avatar type="image" size="medium">
                    <img src={t.teamMemberImg} alt="" />
                  </Avatar>
                  <div className="ms-3">
                    <span className={avatarNameClass}> {t.name}</span>
                    <span className={avatarJobClass} style={{ opacity }}>
                      {t.charge}
                    </span>
                  </div>
                </div>
              );
            })}
            <div
              className="d-flex align-items-center ms-5 ff-ubuntu"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate(`/products/${id}/configure-product/team`);
              }}
            >
              <div className="d-inline">
                <img src="/team-img-placeholder.svg" alt="" />
              </div>
              <div className="d-inline ms-3">
                <span className={avatarNameClass}>{teamSize || '0'} People</span>
                <span className={avatarJobClass} style={{ opacity }}>
                  Team Members
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center ms-5 ff-ubuntu text-md font-regular flex-fill justify-content-end">
              <i className="ts-brands ts-paper-file text-ml me-1"></i>
              <Link
                to={`/products/${id}/sbom`}
                prefetch="intent"
                style={{ textDecoration: 'none', color: '#0F0B29' }}
              >
                SBOM Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailHeader;
