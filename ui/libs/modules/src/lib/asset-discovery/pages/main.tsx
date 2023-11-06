import '@progress/kendo-react-intl';
import { Alert, ButtonIndicator, Header, MessageCard } from '@tauruseer/core';
import { BtnActive, IAssetDiscovery, mainPageBtnIndicator } from '@tauruseer/module';
import * as React from 'react';
import { AssetDiscoveryTGrid } from '../components/grid/asset-discovery-grid.component';

interface IProps {
  data: Array<IAssetDiscovery>;
  percentUnmanagedString: string;
  isConnectedToDataSources: boolean;
  isPendingReconciliation: boolean;
}

export function AssetDiscovery({
  data,
  percentUnmanagedString,
  isConnectedToDataSources,
  isPendingReconciliation,
}: IProps) {
  const active: IAssetDiscovery[] = data.filter(
    (d: IAssetDiscovery) => !d.isDismissed && !d.isInvestigated && !d.isMapped,
  );
  const dismiss: IAssetDiscovery[] = data.filter((d: IAssetDiscovery) => d.isDismissed);
  const investigating: IAssetDiscovery[] = data.filter(
    (d: IAssetDiscovery) => d.isInvestigated && !d.isDismissed,
  );
  const isMapped: IAssetDiscovery[] = data.filter((d: IAssetDiscovery) => d.isMapped);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [gridData, setGridData] = React.useState<IAssetDiscovery[]>(active);

  const setSelected = (key: number) => {
    if (key === BtnActive.Discovered) setGridData(active);
    if (key === BtnActive.Investigating) setGridData(investigating);
    if (key === BtnActive.RiskAccepted) setGridData(dismiss);
    if (key === BtnActive.IsMapped) setGridData(isMapped);
    setSelectedTab(key);
  };
  const setIndicatorValue = (key: number): number => {
    let countIndicator = 0;
    if (key === BtnActive.Discovered) countIndicator = active.length;
    if (key === BtnActive.Investigating) countIndicator = investigating.length;
    if (key === BtnActive.RiskAccepted) countIndicator = dismiss.length;
    if (key === BtnActive.IsMapped) countIndicator = isMapped.length;
    return countIndicator;
  };

  const Buttons = mainPageBtnIndicator.map((item, index) => (
    <ButtonIndicator
      Event={setSelected}
      id={index}
      key={index}
      title={item.title}
      valueIndicator={setIndicatorValue(index)}
      isActive={selectedTab === index}
      hasIndicator={item.hasIndicator}
    />
  ));

  const showBanner =
    data.some((d: IAssetDiscovery) => !d.isRepoFinishedScanning) || isPendingReconciliation;

  const [loading, setLoading] = React.useState(false);

  return (
    <div className="pb-5">
      <div>
        <Header
          title="Asset Discovery"
          icon="k-i-align-left-element"
          buttons={Buttons}
          alignBtn="left"
        >
          <Alert type="error" hideCloseButton={true}>
            <div className="d-flex align-items-center">
              <div className="ms-2" style={{ fontSize: '40px' }}>
                <i className="fa-solid fa-shield-exclamation"></i>
              </div>
              <div className="d-flex flex-column ms-4">
                <span className="text-xxlg font-bolder">{percentUnmanagedString}</span>{' '}
                <span>
                  of your software portfolio assets are unmanaged. To enable continuous monitoring
                  of these assets, they must be mapped to a product.{' '}
                </span>
              </div>
            </div>
          </Alert>
        </Header>
        {showBanner && (
          <MessageCard
            title="There’s currently an asset discovery process running."
            message={
              'It should take between 5 to 20 minutes to see it reflected on this screen. \nPlease refresh this page in a couple of minutes.'
            }
            icon="fa-message-exclamation"
            loading={loading}
            button={{
              label: 'Refresh this page',
              icon: 'fa-rotate',
              onClick: () => {
                window.location.reload();
                setLoading(true);
              },
            }}
          />
        )}
        <div>
          <AssetDiscoveryTGrid
            data={gridData}
            selectedTab={selectedTab}
            showCTAOnEmptyList={!isConnectedToDataSources}
          />
        </div>
      </div>
    </div>
  );
}

export default AssetDiscovery;
