import { Button } from '@progress/kendo-react-buttons';
import { TrStore } from '@tauruseer/core';
import classNames from 'classnames';

interface IProps {
  cancelEvent: React.EventHandler<any>;
  saveEvent: React.EventHandler<any>;
  loading: boolean;
}
export const TicketInformationFooter = ({ cancelEvent, saveEvent, loading }: IProps) => {
  const store = TrStore((state) => state);

  const footerClsName = classNames('form-footer container-fluid', {
    'form-footer-expanded': store.lefNavToggle,
    'form-footer-collapse': !store.lefNavToggle,
  });

  const footerBtnClassName = classNames('d-flex justify-content-end', {
    'form-footer-btn-expanded': store.lefNavToggle,
    'form-footer-btn-collapse': !store.lefNavToggle,
  });

  return (
    <div className={footerClsName}>
      <div className={footerBtnClassName}>
        <Button
          themeColor={'light'}
          fillMode="solid"
          size="large"
          className="button button-secondary me-4"
          rounded="medium"
          onClick={cancelEvent}
        >
          Cancel
        </Button>

        <Button
          size="large"
          themeColor={'dark'}
          fillMode="solid"
          rounded="medium"
          disabled={loading}
          // iconClass="fa-regular fa-floppy-disk"
          className="button button-primary"
          onClick={saveEvent}
        >
          Create Ticket
        </Button>
      </div>
    </div>
  );
};
