import { ASSET_DISCOVERY_ACTION, IObjectList, actionCards } from '@tauruseer/module';
import classNames from 'classnames';
import React from 'react';
import MapProduct from '../map-product/map-product.-container.component';
import { AcceptRiskForm } from './accept-risk-modal.component';

interface IProps {
  investigateReasons: Array<IObjectList>;
  products: Array<IObjectList>;
  displayName: string;
  isDismissed: boolean;
  isInvestigated: boolean;
  assetId: number;
  isMapped: boolean;
}

const InvestigateAsset = ({
  displayName,
  products,
  assetId,
  isDismissed,
  isInvestigated,
  isMapped,
}: IProps) => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [toggleAcceptRisk, seToggleAcceptRisk] = React.useState<boolean>(false);
  const [actionType, setActionType] = React.useState<string>();
  const toggleDialog = () => {
    setToggle(!toggle);
  };
  const canDisplayInvestigate = isDismissed || isInvestigated;
  const showAcceptRisk = (actionType: string) => {
    setActionType(actionType);
    seToggleAcceptRisk(!toggleAcceptRisk);
  };

  const btnClass = (action: string): string => {
    let ctaClassName = classNames('action-card action-card-active');
    if (action === ASSET_DISCOVERY_ACTION.INVESTIGATE_ASSET) {
      ctaClassName = classNames('action-card', {
        'action-card-inactive': canDisplayInvestigate || isMapped,
        'action-card-active': !canDisplayInvestigate,
      });
    }
    if (action === ASSET_DISCOVERY_ACTION.ACCEPT_RISK) {
      ctaClassName = classNames('action-card', {
        'action-card-inactive': isDismissed || isMapped,
        'action-card-active': !isDismissed,
      });
    }
    return ctaClassName;
  };
  const btnEvents = (action: string) => {
    if (action === ASSET_DISCOVERY_ACTION.MAP_PRODUCT) {
      toggleDialog();
    }
    if (
      action === ASSET_DISCOVERY_ACTION.INVESTIGATE_ASSET &&
      !canDisplayInvestigate &&
      !isMapped
    ) {
      showAcceptRisk(ASSET_DISCOVERY_ACTION.INVESTIGATE_ASSET);
    }
    if (action === ASSET_DISCOVERY_ACTION.ACCEPT_RISK && !isDismissed && !isMapped) {
      showAcceptRisk(ASSET_DISCOVERY_ACTION.ACCEPT_RISK);
    }
    if (action === ASSET_DISCOVERY_ACTION.SET_MANUAL_SCAN) {
      showAcceptRisk(ASSET_DISCOVERY_ACTION.SET_MANUAL_SCAN);
    }
  };
  return (
    <>
      <div className="row mt-3 mb-3">
        <div className="col-12 d-flex justify-content-center" style={{ gap: 32 }}>
          {actionCards.map((c) => {
            return (
              <div className={btnClass(c.action)} onClick={() => btnEvents(c.action)}>
                <i className={c.icon}></i>
                <span className="ff-ubuntu">{c.text}</span>
              </div>
            );
          })}
        </div>
      </div>
      {toggle && (
        <MapProduct
          onClose={toggleDialog}
          displayName={displayName}
          products={products}
          assetId={assetId}
        />
      )}
      {toggleAcceptRisk && (
        <AcceptRiskForm onClose={showAcceptRisk} repoId={assetId} actionType={actionType} />
      )}
    </>
  );
};

export default InvestigateAsset;
