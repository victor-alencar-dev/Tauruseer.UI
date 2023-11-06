import { Button } from '@progress/kendo-react-buttons';
import { TrStore } from '@tauruseer/core';
import classNames from 'classnames';

type ThemeColor =
  | 'base'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'dark'
  | 'light'
  | 'inverse'
  | null
  | undefined;

type FillMode = 'flat' | 'link' | 'solid' | 'outline' | null | undefined;

type ButtonAlign = 'left' | 'right';

export interface IFormFooterButton {
  key: string;
  themeColor: ThemeColor;
  fillMode: FillMode;
  className: string;
  text: string;
  icon?: string;
  align?: ButtonAlign;
  disabled?: boolean;
  event: React.EventHandler<any>;
}

interface IProps {
  buttons: IFormFooterButton[];
}

export const FormFooter = ({ buttons }: IProps) => {
  const store = TrStore((state) => state);

  const footerClsName = classNames('form-footer container-fluid', {
    'form-footer-expanded': store.lefNavToggle,
    'form-footer-collapse': !store.lefNavToggle,
  });

  const footerBtnClassName = classNames({
    'form-footer-btn-expanded': store.lefNavToggle,
    'form-footer-btn-collapse': !store.lefNavToggle,
  });

  const rightButtons = buttons.filter((button) => button.align === 'right' || !button.align);
  const leftButtons = buttons.filter((button) => button.align === 'left');

  return (
    <div className={footerClsName}>
      <div className="d-flex justify-content-between align-items-center">
        <div className={footerBtnClassName}>
          {leftButtons.map((button) => (
            <Button
              size="large"
              rounded="medium"
              key={button.key}
              themeColor={button.themeColor}
              fillMode={button.fillMode}
              className={button.className}
              onClick={button.event}
            >
              {button.icon && <i className={`${button.icon} me-2`}></i>}
              {button.text}
            </Button>
          ))}
        </div>

        <div className={footerBtnClassName}>
          {rightButtons.map((button) => (
            <Button
              size="large"
              rounded="medium"
              key={button.key}
              themeColor={button.themeColor}
              fillMode={button.fillMode}
              className={button.className}
              disabled={button.disabled}
              onClick={button.event}
            >
              {button.icon && <i className={`${button.icon} me-2`}></i>}
              {button.text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
