import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

interface IModalProps {
  title: string;
  children: any;
  onClose: React.EventHandler<any>;
  style?: any;
  width?: number;
  hasButtons?: boolean;
  isDialog?: boolean;
  onAction?: React.EventHandler<any>;
}

interface IModalTitleProps {
  title: string;
}

const ModalTitle = ({ title }: IModalTitleProps) => {
  return (
    <div className="d-flex justify-content-center w-100 typography-h4 fs-3">
      <span style={{ fontSize: '20px' }}>{title}</span>
    </div>
  );
};

export const Modal = ({
  title,
  children,
  width,
  onClose,
  style,
  hasButtons,
  onAction,
}: IModalProps) => {
  return (
    <Dialog
      title={<ModalTitle title={title} />}
      width={width ?? 755}
      style={style}
      onClose={onClose}
      className={'modal-window-dialog'}
    >
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
