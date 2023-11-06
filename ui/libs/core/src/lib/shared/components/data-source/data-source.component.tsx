import { Slide } from '@progress/kendo-react-animation';
import { ExternalService } from '../../models/external-dataservice.model';
import { ExternalServiceIcon } from '../../services/external-img.service';

import classNames from 'classnames';
import React from 'react';
import { DataSourceForma } from './data-source-form';

interface IProps {
  sourceName: string;
  source?: ExternalService;
  OnClick: React.EventHandler<any>;
  ChildrenEvent: React.EventHandler<any>;
  iconColor?: string;
  isHide?: boolean | string | number;
  isExpand?: boolean;
  id: number | string;
  isMapped?: boolean;
  isLoading?: boolean;
}

export const DataSourceMap = ({
  source,
  iconColor,
  sourceName,
  isHide,
  id,
  isExpand,
  isLoading,
  isMapped,
  OnClick,
  ChildrenEvent,
}: IProps) => {
  const childrenForm = isExpand ? (
    <DataSourceForma Event={ChildrenEvent} disabled={isMapped} isLoading={isLoading} />
  ) : null;
  const clsNameContainer = classNames('d-flex flex-column data-source-container mb-4', {
    'data-source-container-mapped': isMapped,
    'data-source-container-no-connected': !isMapped,
  });
  const clsNameTextMapped = classNames('typography-h2', {
    'text-success': isMapped,
    'text-muted': !isMapped,
  });
  return !isHide ? (
    <div
      className={clsNameContainer}
      onClick={!isExpand ? OnClick : () => {}}
      key={id}
      style={{ cursor: !isExpand ? 'pointer' : 'default' }}
    >
      <div className="d-flex w-100">
        <div className="d-flex flex-column justify-content-center">
          <ExternalServiceIcon
            projectType={source}
            style={{ color: iconColor, fontSize: '3.5rem' }}
          />
        </div>
        <div className="d-flex flex-column justify-content-center ms-4 flex-fill">
          <span className="typography-body1 fw-semibold">{sourceName}</span>
          <span className={clsNameTextMapped}>{isMapped ? 'Mapped' : 'Not connected'}</span>
        </div>
        <div className="d-flex  justify-content-end flex-fill">
          {isExpand && !isMapped && (
            <div onClick={OnClick} style={{ cursor: 'pointer' }}>
              <span className="typography-h4 text-muted me-2">
                <i className="fa-solid fa-chevron-left"></i>
              </span>
              <span className="typography-h4 text-muted">Back to Sources</span>
            </div>
          )}
        </div>
      </div>
      {isExpand && (
        <Slide transitionEnterDuration={300} transitionExitDuration={300}>
          {childrenForm}
        </Slide>
      )}
    </div>
  ) : null;
};
