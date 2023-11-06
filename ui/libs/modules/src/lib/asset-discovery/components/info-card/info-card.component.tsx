import { Chip, ExternalServiceIcon, TChipModifier } from '@tauruseer/core';
import { scannerStatus, scannerStatusInfo } from '@tauruseer/module';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

interface IProps {
  displayName: string;
  creatorIdentity: string;
  creatorName: string;
  name: string;
  projectType: string;
  externalLink: string;
  isDismissed: boolean;
  isInvestigated: boolean;
  dateTimeUtc: string;
  dismissedAt: string;
  investigatedAt: string;
  dismissedByUserName: string;
  investigatedByUserName: string;
  createdAt: string;
  isMapped: boolean;
  lastScanAt: string;
  lastScanStatus: scannerStatus;
}

const InfoCard = (props: IProps) => {
  dayjs.extend(localizedFormat);
  const investigateOnlyStatus = props.isInvestigated && !props.isDismissed;
  const scanStatusValue = props.lastScanStatus === -1 ? 5 : props.lastScanStatus;
  const lastScanStatus = scanStatusValue - 1;
  const statusDate = (): string => {
    let statusDate = props.dateTimeUtc;
    if (props.isInvestigated) statusDate = props.investigatedAt;
    return statusDate;
  };
  const statusText = (): string => {
    let statusTitle = 'Discovered';
    if (props.isInvestigated) statusTitle = ' Investigation Age';
    if (props.isDismissed) statusTitle = 'Approved by';
    if (props.isMapped) statusTitle = 'Mapped';
    return statusTitle;
  };
  return (
    <>
      <div className="w-50 p-3 info-card">
        <dl>
          <dt>Repository Name</dt>
          <dl>
            {' '}
            <a
              href={`${props.externalLink}`}
              target="_blank"
              style={{ textDecoration: 'none' }}
              rel="noreferrer"
            >
              <i
                className="fa-solid fa-arrow-up-right-from-square me-2"
                style={{ fontSize: '14px' }}
              ></i>
              {props.displayName}
            </a>
          </dl>
          <dt>Asset Type</dt>
          <dl>
            <div className="d-flex align-items-center">
              <span>
                <ExternalServiceIcon projectType={props.name || ''} style={{ color: '#3778BF' }} />
              </span>
              <span className="ms-2">{props.name}</span>
            </div>
          </dl>
          <dt>Created by</dt>
          <dl>
            <div className="creator-name"> {props.creatorName}</div>
            <div className="creator-identity">{props.creatorIdentity}</div>
          </dl>
        </dl>
        {props.isDismissed && (
          <dl>
            <dt>Accepted by</dt>
            <dl>
              {props.dismissedByUserName}
              <div className="creator-name">{dayjs(props.dismissedAt).format('LL')}</div>
              <div className="creator-identity">{dayjs(props.dismissedAt).fromNow()}</div>
            </dl>
          </dl>
        )}
        {investigateOnlyStatus && (
          <dl>
            <dt>Investigate by</dt>
            <dl>{props.investigatedByUserName}</dl>
          </dl>
        )}
        <dl>
          <dt>{statusText()}</dt>
          <dl>
            {props.isDismissed ? (
              '-'
            ) : (
              <>
                <div className="creator-name">{dayjs(statusDate()).format('LL')}</div>
                <div className="creator-identity">{dayjs(statusDate()).fromNow()}</div>
              </>
            )}
          </dl>
        </dl>
      </div>
      <div className="w-50 p-3 info-card">
        <dl>
          <dt>Asset Age</dt>
          <dl>
            <div className="creator-name">{dayjs(props.createdAt).format('LL')}</div>
            <div className="creator-identity">{dayjs(props.createdAt).fromNow()}</div>
          </dl>
        </dl>
        <dl>
          <dt>Project Type</dt>
          <dl>
            <div className="d-flex align-items-center">
              <span>{props.projectType || '-'}</span>
            </div>
          </dl>
        </dl>
        <dl>
          <dt>Last Scan Date</dt>
          <dl>
            <div className="creator-name">{dayjs(props.lastScanAt).format('LL')}</div>
            <div className="creator-identity">{dayjs(props.lastScanAt).fromNow()}</div>
          </dl>
        </dl>
        <dl>
          <dt>Last Scan Status</dt>
          <dl>
            <Chip
              copy={scannerStatusInfo[lastScanStatus].text}
              type="badge"
              modifier={scannerStatusInfo[lastScanStatus].type.toLocaleLowerCase() as TChipModifier}
            />
          </dl>
        </dl>
      </div>
    </>
  );
};

export default InfoCard;
