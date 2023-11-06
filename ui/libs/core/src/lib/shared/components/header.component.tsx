import classNames from 'classnames';
import React from 'react';
import { DialogInfo } from './dialog-info.component';
import { IconButton } from './icon-button.component';

type buttonAlign = 'left' | 'right' | null;
interface IHeaderProps {
  title: string;
  icon?: string;
  children?: React.ReactNode;
  buttons?: React.ReactNode;
  switchOption?: React.ReactNode;
  filterOption?: React.ReactNode;
  hasInfo?: boolean;
  infoData?: any;
  alignBtn?: buttonAlign;
  isFAIcon?: boolean;
}

export const Header = ({
  title,
  icon,
  children,
  buttons,
  hasInfo,
  infoData,
  alignBtn,
  isFAIcon,
  switchOption,
  filterOption,
}: IHeaderProps) => {
  const iconClassName = classNames(icon, isFAIcon ? 'fa' : 'k-icon', 'me-3');
  const contentClassName = classNames('d-flex flex-row align-items-center', {
    '  justify-content-between': alignBtn === 'right' || !alignBtn,
  });
  const [toggle, setToggle] = React.useState<boolean>(false);
  const toggleDialog = () => {
    setToggle(!toggle);
  };

  let dialogProps = {};
  if (infoData)
    dialogProps = {
      onClose: toggleDialog,
      title: title,
      iconTitle: icon,
      subTitle: infoData.title,
      infoContent: infoData.infoContent,
    };

  return (
    <div className="card card-content">
      <div className={contentClassName}>
        <div className="d-flex align-items-center">
          <h3 className="d-flex align-items-center align-middle typography-display">
            {icon && <span className={iconClassName} style={{ fontSize: '29px' }}></span>}
            {title}
          </h3>
          {hasInfo && (
            <IconButton
              icon="k-i-help"
              onClick={toggleDialog}
              style={{ marginLeft: '6px', position: 'relative', top: '-4px' }}
            />
          )}
        </div>

        {buttons && <div className="ms-5">{buttons}</div>}
        {switchOption && <div className="ms-5">{switchOption}</div>}
        {filterOption && <div className="ms-5">{filterOption}</div>}
      </div>

      {children && <div className="mt-4">{children}</div>}

      {toggle && <DialogInfo {...dialogProps} />}
    </div>
  );
};
