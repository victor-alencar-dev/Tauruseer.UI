import { Button } from '@progress/kendo-react-buttons';
import classNames from 'classnames';
import React from 'react';
import { OnboardingStore } from '../state/onboarding-storage';

interface IProps {
  primaryEvent: React.EventHandler<any>;
  secondaryEven: React.EventHandler<any>;
  deleteDataSource: React.EventHandler<any>;
}
export const OnboardingActions = ({ secondaryEven, primaryEvent, deleteDataSource }: IProps) => {
  const store = OnboardingStore((state) => state);
  const clsContent = classNames('me-1 d-flex p-2', {
    'justify-content-end mt-auto': !store.isSecondaryBtnVisible,
    'justify-content-center': store.isSecondaryBtnVisible,
  });
  const clsActionBtn = classNames('p-2', {
    'd-flex flex-column justify-content-center': store.isSecondaryBtnVisible,
  });
  const clsDeleteBtn = classNames({ 'me-auto p-2': !store.isSecondaryBtnVisible });

  return (
    <div className={clsContent}>
      <div className={clsDeleteBtn}>
        {store.isDeleteBtnEnabled && (
          <Button
            size="large"
            themeColor="error"
            fillMode="solid"
            rounded="medium"
            disabled={store.isDeleteBtnDisabled}
            className="button button-error"
            onClick={deleteDataSource}
          >
            <i className="fa-solid fa-trash-can"></i>
            <span className="ms-1"> Delete Data Sources</span>
          </Button>
        )}
      </div>
      <div className={clsActionBtn}>
        {store.isSecondaryBtnVisible && (
          <Button
            themeColor={'light'}
            fillMode="solid"
            size="large"
            className="button button-secondary mb-3"
            rounded="medium"
            onClick={secondaryEven}
          >
            {store.secondaryBtnText}
          </Button>
        )}
        <Button
          size="large"
          themeColor={'dark'}
          fillMode="solid"
          rounded="medium"
          disabled={store.isActionDisabled}
          className="button button-primary"
          onClick={primaryEvent}
        >
          {store.primaryBtnText}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingActions;
