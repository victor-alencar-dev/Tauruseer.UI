import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { DEVICES, getActualDeviceRes } from '@tauruseer/core';
import { useEffect } from 'react';

interface IProps {
  onClose?: React.EventHandler<any>;
  title?: string;
  subTitle?: string;
  iconTitle?: string;
  infoContent?: string;
  height?: number;
}

export const HEIGHT_RES = {
  LAPTOP: 655,
  DESKTOP: 755,
};

const Title = ({ title, subTitle, iconTitle, height }: IProps) => {
  return (
    <div className="d-flex dialog-info-title w-100 typography-display">
      <div className="d-flex flex-column justify-content-center me-2">
        {iconTitle && <span className={`k-icon fs-3 ${iconTitle}`}></span>}
      </div>
      <div className="d-flex flex-column">
        <span className="ff-montserrat text-xl fw-semibold"> {title}</span>
        <span className="typography-h3 fw-normal">{subTitle || 'About this Page'}</span>
      </div>
    </div>
  );
};

export const DialogInfo = ({ title, onClose, infoContent, subTitle, iconTitle }: IProps) => {
  const device = getActualDeviceRes();
  const height = device !== DEVICES.LAPTOP ? HEIGHT_RES.DESKTOP : HEIGHT_RES.LAPTOP;
  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (
        onClose &&
        e.target instanceof HTMLElement &&
        e.target &&
        e.target.className.includes('k-overlay')
      )
        onClose(e);
    });
  }, []);

  return (
    <Dialog
      title={<Title title={title} subTitle={subTitle} iconTitle={iconTitle} />}
      onClose={onClose}
      width={300}
      height={height}
      className="dialog-info text-h3 fw-normal"
    >
      <div className="mt-2 p-3">
        <p>{infoContent}</p>
      </div>
      <DialogActionsBar>
        <div className="footer-dialog"></div>
      </DialogActionsBar>
    </Dialog>
  );
};
