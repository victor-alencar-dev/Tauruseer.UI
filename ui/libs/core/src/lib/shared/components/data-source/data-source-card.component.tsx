import React from 'react';
import classNames from 'classnames';
import { Slide } from '@progress/kendo-react-animation';
import { CopyTextToClipboard } from '../copy-text-to-clipboard.component';

import {
  ExternalService,
  ServiceStatus,
  ServiceCategory,
} from '../../models/external-dataservice.model';
import { ExternalServiceIcon } from '../../services/external-img.service';

interface IDataSourceCardProps {
  sourceName: string;
  children?: React.ReactNode;
  source?: ExternalService;
  OnClick: React.EventHandler<any>;
  iconColor?: string;
  isHidden?: boolean | string | number;
  isExpand?: boolean;
  id: number | string;
  isMapped?: boolean;
  isLoading?: boolean;
  status: ServiceStatus;
  assetsMapped?: number;
  subtitle?: string;
  categories: ServiceCategory[];
  expandedHeader: {
    title: string;
    subtitle?: string;
  } | null;
  isPage?: boolean;
}

const ICON_SIZE = '3.5rem';
const BACK_TO_SOURCES_COPY = 'Back to Sources';

// TODO: Rename this component to DataSourceCardItem
export const DataSourceCard: React.FC<IDataSourceCardProps> = ({
  source,
  children,
  iconColor,
  sourceName,
  isHidden,
  id,
  isExpand,
  isMapped,
  status,
  OnClick,
  assetsMapped,
  categories,
  subtitle,
  expandedHeader,
  isPage,
}) => {
  const clsNameContainer = classNames('data-source-grid-item', {
    'data-source-grid-item--mapped':
      status === ServiceStatus.Mapped || (isPage && status === ServiceStatus.Connected),
    'data-source-grid-item--connected': status === ServiceStatus.Connected && !isPage,
    'data-source-grid-item--no-connected':
      status === ServiceStatus.NotConnected || status === ServiceStatus.Disabled,
    'pt-4': isExpand,
  });

  const clsNameTextMapped = classNames('typography-h2', {
    'text-success':
      (status === ServiceStatus.Mapped && !isPage) ||
      (status === ServiceStatus.Connected && isPage),
    'text-warning': status === ServiceStatus.Connected && !isPage,
    'text-muted': status === ServiceStatus.NotConnected || ServiceStatus.Disabled,
  });

  const getHeadingText = ({ status, assetsMapped }: { status: string; assetsMapped: number }) => {
    let assetCopy = assetsMapped > 1 ? 'assets' : 'asset';

    if (categories?.includes(ServiceCategory.SourceRepos)) {
      assetCopy = assetsMapped > 1 ? 'repositories' : 'repository';
    }

    switch (status) {
      case ServiceStatus.Mapped:
        return subtitle ? subtitle : `Mapped - ${assetsMapped} ${assetCopy}`;
      case ServiceStatus.Connected:
        return isPage ? 'Connected' : 'Connected - not mapped';
      case ServiceStatus.NotConnected:
        return 'Not Connected';
      case ServiceStatus.Disabled:
        return 'Not Connected';
      default:
        return 'Not Connected';
    }
  };

  const CardHeader = (
    <div className="d-flex w-100 ms-3 ps-3">
      <div className="d-flex flex-column justify-content-center">
        <ExternalServiceIcon
          projectType={source}
          style={{ color: iconColor, fontSize: ICON_SIZE }}
        />
      </div>
      <div className="d-flex flex-row">
        <div className="d-flex flex-column justify-content-center ms-4 flex-fill">
          <span className="typography-body1 fw-semibold">{sourceName}</span>
          <span className={clsNameTextMapped}>
            {getHeadingText({ status, assetsMapped: assetsMapped ?? 0 })}
          </span>
        </div>
        {isExpand && expandedHeader && (
          <div
            className="d-flex flex-column justify-content-center ms-4 flex-fill ps-4"
            style={{ borderLeft: '1px solid #000' }}
          >
            <span className="typography-body1 ff-ubuntu fw-semibold">{expandedHeader.title}</span>
            {expandedHeader.subtitle && (
              <span style={{ cursor: 'pointer' }} className="typography-body1">
                <CopyTextToClipboard
                  copyText={expandedHeader.subtitle}
                  alertMessage={'Copied to clipboard'}
                >
                  <>
                    <span className="text-sm font-bolder mt-2">
                      <i
                        className="fa-regular fa-copy me-1 text-primary-main"
                        style={{ color: '#4231B4' }}
                      ></i>
                    </span>
                    {expandedHeader.subtitle}
                  </>
                </CopyTextToClipboard>
              </span>
            )}
          </div>
        )}
      </div>
      <div className="d-flex  justify-content-end flex-fill me-4">
        {isExpand && !isMapped && (
          <div onClick={OnClick} style={{ cursor: 'pointer' }}>
            <span className="typography-h4 text-muted me-2">
              <i className="fa-solid fa-chevron-left"></i>
            </span>
            <span className="typography-h4 text-muted">{BACK_TO_SOURCES_COPY}</span>
          </div>
        )}
      </div>
    </div>
  );

  return !isHidden ? (
    <div
      className={clsNameContainer}
      onClick={!isExpand && status !== ServiceStatus.Disabled ? OnClick : () => {}}
      key={id}
      style={{
        cursor: !isExpand && status !== ServiceStatus.Disabled ? 'pointer' : 'default',
      }}
    >
      {CardHeader}
      {/* Content */}
      {isExpand && (
        <Slide transitionEnterDuration={300} transitionExitDuration={300} className="w-100">
          {children}
        </Slide>
      )}
    </div>
  ) : null;
};
