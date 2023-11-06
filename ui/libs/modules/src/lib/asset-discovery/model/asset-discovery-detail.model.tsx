import { ExternalServiceIcon } from '@tauruseer/core';
import { IAssetDiscovery } from '@tauruseer/module';
import InvestigateAsset from '../components/dismiss-alert/investigate-asset.component';
import InfoCard from '../components/info-card/info-card.component';
import ScannerResult from '../components/scanner/scanner.component';

export const DetailsContent = (data: IAssetDiscovery, scanDetails: any) => {
  const {
    investigateReasons,
    products,
    dataSource: {
      projectType,
      displayName,
      discoveredAtString,
      createdAtString,
      creatorIdentity,
      createdAt,
      creatorName,
      externalService: { name },
      lastScanAt,
      lastScanStatus,
      externalLink,
      isDismissed,
      isInvestigated,
      dateTimeUtc,
      dismissedAt,
      investigatedAt,
      dismissedByUserName,
      investigatedByUserName,
      id,
      isMapped,
    },
  } = data;
  const scannerProps = {
    displayName,
    discoveredAtString,
    createdAtString,
    creatorIdentity,
    creatorName,
    projectType,
    name,
    createdAt,
    externalLink,
    isDismissed,
    isInvestigated,
    dateTimeUtc,
    dismissedAt,
    investigatedAt,
    dismissedByUserName,
    investigatedByUserName,
    lastScanAt,
    lastScanStatus,
    id,
    isMapped,
  };
  const hasScanResults = lastScanAt != null;
  const scanTitle = hasScanResults
    ? `${scanDetails.length} Vulnerabilities Found `
    : 'This asset hasn’t been scanned';

  return [
    {
      display: 'flex-column',
      content: [
        {
          title: `${displayName}`,
          subtitle: 'Info Card',
          element: <InfoCard {...scannerProps} />,
          height: 'auto',
          icon: <ExternalServiceIcon projectType={name} style={{ color: '#3778BF' }} />,
          isDismissed,
          isInvestigated,
          hasStatus: true,
          scanKey: true,
          isMapped,
        },
        {
          title: 'Actions',
          subtitle: '',
          height: 'auto',
          element: (
            <InvestigateAsset
              investigateReasons={investigateReasons}
              products={products}
              displayName={displayName}
              assetId={id}
              isDismissed={isDismissed}
              isInvestigated={isInvestigated}
              isMapped={isMapped}
            />
          ),
          icon: '',
        },
      ],
    },
    {
      display: 'flex-column',
      content: [
        {
          title: 'Scan Details',
          subtitle: scanTitle,
          height: '98.2%',
          element: (
            <ScannerResult
              scanResults={scanDetails}
              projectType={projectType}
              hasScanResults={hasScanResults}
            />
          ),
          icon: '',
        },
      ],
    },
  ];
};
