import { Button } from '@progress/kendo-react-buttons';
import { useFetcher } from '@remix-run/react';
import { ModalForm } from '@tauruseer/core';
import { USER_ACTIONS } from '@tauruseer/module';
import { useEffect, useState } from 'react';
import { UserStore } from '../state/users-storage';

interface IUserInactiveForm {
  onClose: React.EventHandler<any>;
  accountId: string;
}

export const InactiveUserForm = ({ onClose, accountId }: IUserInactiveForm) => {
  const store = UserStore((state) => state);
  const fetcher = useFetcher();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [wasActionValid, setWasActionValid] = useState<boolean>(false);
  const [actionMsg, setActionMsg] = useState<string>();

  useEffect(() => {
    const { data, type, state } = fetcher;
    if (type === 'done' && state === 'idle' && data.success) {
      setActionMsg(data.message);
      setWasActionValid(true);
      setTimeout(() => {
        onClose(null);
      }, 3000);
    }
    if (type === 'done' && state === 'idle' && !data.success) {
      setActionMsg(data.message);
      setWasActionValid(false);
    }
    if (state === 'submitting' || state === 'loading') {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  }, [fetcher]);

  const setInactiveUser = () => {
    const payload = {
      userId: store.user.userId,
      email: store.user.email,
      firstName: store.user.firstName,
      lastName: store.user.lastName,
      isAccountAdmin: store.user.isAccountAdmin,
      canViewAllProducts: store.user.canViewAllProducts,
      action: USER_ACTIONS.USER_INACTIVE,
      isActive: false,
    };
    fetcher.submit({ user: JSON.stringify(payload), accountId }, { method: 'post' });
  };

  return (
    <ModalForm
      onClose={onClose}
      title=""
      type={'dialog'}
      icon={'fa-regular fa-folder'}
      iconClass={{ fontSize: '39px' }}
      titleClass={'justify-content-center ps-5 mt-3'}
    >
      {!actionMsg ? (
        <div className="text-center ff-ubuntu text-xl  mb-5 mt-3 d-flex flex-column">
          <span className="ms-3">Are you sure you want to</span>
          <span className="ms-3">set this User as inactive?</span>
        </div>
      ) : (
        <div className="text-center ff-ubuntu text-xl  mb-5 mt-3 d-flex flex-column">
          <span className={`ms-3 ${!wasActionValid ? 'text-danger' : ''}`}>{actionMsg}</span>
        </div>
      )}
      <div className="mb-3 mt-5 d-flex justify-content-center">
        <Button
          themeColor={'light'}
          fillMode="solid"
          size="large"
          className="button button-secondary me-3"
          style={{ padding: '16px 32px', fontSize: '13px', width: '104px' }}
          rounded="medium"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          size="large"
          themeColor={'dark'}
          fillMode="solid"
          rounded="medium"
          className="button button-primary"
          style={{ padding: '16px 32px', fontSize: '13px', width: '152px' }}
          onClick={isSubmitting || wasActionValid ? () => {} : setInactiveUser}
        >
          {isSubmitting ? (
            <span>
              <i className="fas fa-circle-notch fa-spin me-2"></i> Setting as Inactive{' '}
            </span>
          ) : (
            'Set as Inactive'
          )}
        </Button>
      </div>
    </ModalForm>
  );
};
