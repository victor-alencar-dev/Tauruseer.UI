import { Button } from '@progress/kendo-react-buttons';
import { TrStore } from '@tauruseer/core';
import classNames from 'classnames';

interface IProps {
  cancelEvent?: React.EventHandler<any>;
  saveEvent?: React.EventHandler<any>;
  deleteEvent?: React.EventHandler<any>;
  isDeleteBtnEnabled?: boolean;
}
export const FormFooter = ({ cancelEvent, saveEvent, deleteEvent, isDeleteBtnEnabled }: IProps) => {
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
      {isDeleteBtnEnabled && (
        <div className="me-auto p-2">
          <Button
            size="large"
            themeColor="error"
            fillMode="solid"
            rounded="medium"
            className="button button-error"
            onClick={deleteEvent}
          >
            <i className="fa-solid fa-trash-can"></i>
            <span className="ms-1"> Delete Data Sources</span>
          </Button>
        </div>
      )}
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
          iconClass="fa-regular fa-floppy-disk"
          className="button button-primary"
          onClick={saveEvent}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
