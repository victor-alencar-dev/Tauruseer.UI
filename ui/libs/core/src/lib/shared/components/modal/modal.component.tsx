import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

interface IModalProps {
  title: string;
  children: any;
  onClose: React.EventHandler<any>;
  style?: any;
  titleClass?: string;
  width?: number | string;
  hasButtons?: boolean;
  isDialog?: boolean;
  icon?: string;
  iconClass?: any;
  subTitle?: string;
  type?: 'dialog' | 'modal' | null;
  fontSize?: 'xlg' | 'xl' | 'xxlg' | null;
  onAction?: React.EventHandler<any>;
}

interface IModalTitleProps {
  title: string;
  icon?: string;
  fontSize: 'xlg' | 'xl' | 'xxlg';
  titleClass?: string;
  iconClass?: any;
  subTitle?: string;
}

const ModalTitle = ({
  title,
  icon,
  fontSize,
  titleClass,
  iconClass,
  subTitle,
}: IModalTitleProps) => {
  return (
    <div className="d-flex flex-column">
      <div className={`d-flex w-100 ff-ubuntu align-items-center font-medium ${titleClass}`}>
        <span>
          <i className={`${icon} icon-modal-title`} style={iconClass}></i>
        </span>
        <span className={`text-${fontSize}`}>{title}</span>
      </div>
      <span className={`text-md ff-montserrat font-regular`}>{subTitle}</span>
    </div>
  );
};

export const ModalForm = ({
  title,
  children,
  width,
  onClose,
  style,
  titleClass,
  type,
  hasButtons,
  onAction,
  icon,
  fontSize,
  iconClass,
  subTitle,
}: IModalProps) => {
  return (
    <Dialog
      autoFocus
      style={style}
      onClose={onClose}
      className={type === 'dialog' ? 'dialog-notification' : 'modal-form-dialog'}
      width={width}
      title={
        <ModalTitle
          title={title}
          icon={icon}
          fontSize={fontSize || 'xlg'}
          titleClass={titleClass}
          iconClass={iconClass}
          subTitle={subTitle}
        />
      }
    >
      {' '}
      {children}
      {hasButtons && (
        <DialogActionsBar>
          <Button
            themeColor={'light'}
            fillMode="solid"
            size="large"
            className="button button-secondary me-3"
            rounded="medium"
            onClick={onClose}
          >
            No
          </Button>
          <Button
            size="large"
            themeColor={'dark'}
            fillMode="solid"
            rounded="medium"
            className="button button-primary"
            onClick={onAction}
          >
            Yes
          </Button>
        </DialogActionsBar>
      )}
    </Dialog>
  );
};
