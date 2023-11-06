import { ExternalService, FaIcon, CustomLink, ButtonIconLarge } from '@tauruseer/core';
import React, { useState } from 'react';
import { dataSourcesConfig } from '@tauruseer/module';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { defaultItems, modifiers } from './product-security-control.model';

interface IProductSecurityControl {
  securityControlsElements: any[];
  repositories: any[];
  productId: string;
}

type TSecurityControlItem = {
  icon: string;
  color: string;
  caption: string;
  category: string;
  name?: string;
  url?: string;
  modifier?: {
    icon: string;
    color: string;
  };
};

const datasourcesUrl = (productId: string) =>
  `/products/${productId}/configure-product/data-sources`;

const setDefaultItem = (itemList: TSecurityControlItem[], defaulItem: TSecurityControlItem) => {
  if (itemList?.length === 0) {
    return [defaulItem];
  } else {
    return itemList;
  }
};

const SecurityControlItem = ({
  item: { icon, color, caption, category, modifier, name, url },
}: {
  item: TSecurityControlItem;
}) => {
  return (
    <div className="security-controls__item">
      <ButtonIconLarge
        icon={icon}
        title={name}
        color={color}
        label={caption}
        modifier={modifier}
        url={url}
      />
      <h4 className="security-controls__item-category">{category}</h4>
    </div>
  );
};

const ProductSecurityControl = ({
  securityControlsElements,
  repositories,
  productId,
}: IProductSecurityControl) => {
  const [selected, setSelected] = useState(0);

  const sourceControlData: any = securityControlsElements.find(
    (el) => el.serviceType === 'SourceControl',
  );

  const sourceControlElements: TSecurityControlItem[] =
    sourceControlData?.activeExternalServices?.map((el: any) => ({
      icon: el.serviceName,
      color: dataSourcesConfig.find((item) => item.source === el.serviceName)?.iconColor,
      caption: el.status === 'Connected' ? 'Connected' : 'Configure',
      category: 'Source Control',
      modifier: el.status === 'Connected' ? modifiers.success : modifiers.warning,
      name: dataSourcesConfig.find((item) => item.source === el.serviceName)?.sourceName,
      url: datasourcesUrl(productId),
    }));

  const workTrackingItemData: any = securityControlsElements?.find(
    (el) => el.serviceType === 'WorkItemTracking',
  );

  const workTrackingItemElements: TSecurityControlItem[] =
    workTrackingItemData?.activeExternalServices?.map((el: any) => ({
      icon: el.serviceName,
      color: dataSourcesConfig.find((item) => item.source === el.serviceName)?.iconColor,
      caption: el.status === 'Connected' ? 'Connected' : 'Configure',
      category: 'Work Tracking Item',
      modifier: el.status === 'Connected' ? modifiers.success : modifiers.warning,
      name: dataSourcesConfig.find((item) => item.source === el.serviceName)?.sourceName,
      url: el.status === 'Connected' ? null : datasourcesUrl(productId),
    }));

  const cicdData: any = securityControlsElements?.find(
    (el) => el.serviceType === 'ContinuousIntegration',
  );

  const cicdElements: TSecurityControlItem[] = cicdData?.activeExternalServices.map((el: any) => ({
    icon: el.serviceName,
    color: dataSourcesConfig.find((item) => item.source === el.serviceName)?.iconColor,
    caption: el.status === 'Connected' ? 'Connected' : 'Configure',
    category: 'CI/CD',
    modifier: el.status === 'Connected' ? modifiers.success : modifiers.warning,
    name: dataSourcesConfig.find((item) => item.source === el.serviceName)?.sourceName,
    url: el.status === 'Connected' ? null : datasourcesUrl(productId),
  }));

  const scaScannerElements: TSecurityControlItem[] =
    repositories?.length > 0
      ? [
          {
            icon: ExternalService.DocioScanner,
            color: '#0F0B29',
            caption: 'Connected',
            category: 'SCA Scanner',
            modifier: modifiers.success,
            name: 'Start Left Scanner',
          },
        ]
      : [];

  const sastData: any = securityControlsElements?.find(
    (el) => el.serviceType === 'QualityAnalysis',
  );

  const sastElements: TSecurityControlItem[] = sastData?.activeExternalServices?.map((el: any) => ({
    icon: el.serviceName,
    color: dataSourcesConfig.find((item) => item.source === el.serviceName)?.iconColor,
    caption: el.status === 'Connected' ? 'Connected' : 'Configure',
    category: 'SAST',
    modifier: el.status === 'Connected' ? modifiers.success : modifiers.warning,
    name: dataSourcesConfig.find((item) => item.source === el.serviceName)?.sourceName,
    url: el.status === 'Connected' ? null : datasourcesUrl(productId),
  }));

  // These elements have not been implemented yet
  const dastElements = [];
  const trainingElements = [];
  const apiSecurityElements = [];
  const wafElements = [];
  const cspmElements = [];
  const siemElements = [];
  const iamElements = [];

  const showTab1Badge =
    sourceControlElements?.length > 0 &&
    workTrackingItemElements?.length > 0 &&
    cicdElements?.length > 0 &&
    scaScannerElements?.length > 0;
  const showTab2Badge =
    sastElements?.length > 0 &&
    dastElements?.length > 0 &&
    trainingElements?.length > 0 &&
    apiSecurityElements?.length > 0 &&
    wafElements?.length > 0;
  const showTab3Badge =
    cspmElements?.length > 0 && siemElements?.length > 0 && iamElements?.length > 0;

  const dataTab1: TSecurityControlItem[] = [
    ...setDefaultItem(sourceControlElements ?? [], defaultItems['sourceControl']),
    ...setDefaultItem(workTrackingItemElements ?? [], defaultItems['workTrackingItem']),
    ...setDefaultItem(cicdElements ?? [], defaultItems['cicd']),
    ...setDefaultItem(scaScannerElements ?? [], defaultItems['sca']),
  ];

  const dataTab2: TSecurityControlItem[] = [
    ...setDefaultItem(sastElements ?? [], defaultItems['sast']),
    ...setDefaultItem([], defaultItems['dast']),
    ...setDefaultItem([], defaultItems['training']),
    ...setDefaultItem([], defaultItems['apiSecurity']),
    ...setDefaultItem([], defaultItems['waf']),
  ];

  const dataTab3: TSecurityControlItem[] = [
    ...setDefaultItem([], defaultItems['cspm']),
    ...setDefaultItem([], defaultItems['siem']),
    ...setDefaultItem([], defaultItems['iam']),
  ];

  return (
    <div className="security-controls">
      <header className="security-controls__heading ">Security Controls Monitoring</header>

      <section className="security-controls__tabs">
        <button
          className={`security-controls__tab ${selected === 0 && 'security-controls__tab--active'}`}
          onClick={() => setSelected(0)}
        >
          Software Supply Chain Security{' '}
          {showTab1Badge && <FaIcon icon={'shield-check'} size={18} style={{ color: '#4231B4' }} />}
        </button>
        <button
          className={`security-controls__tab ${selected === 1 && 'security-controls__tab--active'}`}
          onClick={() => setSelected(1)}
        >
          Application Security Posture{' '}
          {showTab2Badge && <FaIcon icon={'shield-check'} size={18} style={{ color: '#4231B4' }} />}
        </button>
        <button
          disabled={dataTab3?.length === 0}
          className={`security-controls__tab ${selected === 2 && 'security-controls__tab--active'}`}
          onClick={() => setSelected(2)}
        >
          Cloud Security Posture{' '}
          {showTab3Badge && <FaIcon icon={'shield-check'} size={18} style={{ color: '#4231B4' }} />}
        </button>
      </section>
      <main className="security-controls__card" style={{}}>
        <div className="security-controls__card-content">
          {selected === 0 && dataTab1.map((item, i) => <SecurityControlItem item={item} key={i} />)}
          {selected === 1 && dataTab2.map((item, i) => <SecurityControlItem item={item} key={i} />)}
          {selected === 2 && dataTab3.map((item, i) => <SecurityControlItem item={item} key={i} />)}
        </div>
      </main>
    </div>
  );
};

export default ProductSecurityControl;
