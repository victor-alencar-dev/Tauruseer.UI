import { Button } from '@progress/kendo-react-buttons';
import { Loader } from '@progress/kendo-react-indicators';
import { ModalForm } from '@tauruseer/core';
import React from 'react';

export type TConfirmationModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  copy: string;
  children?: React.ReactNode;
  acceptCopy?: string;
};

export const ConfirmationModal: React.FC<TConfirmationModalProps> = ({
  copy,
  onClose,
  onConfirm,
  isLoading,
  children,
  acceptCopy,
}) => {
  return (
    <ModalForm type="dialog" onClose={() => onClose()} title={''} width={children ? 1000 : 362}>
      <div className="d-flex flex-column justify-center align-items-center gap-5">
        <h2 className="ff-ubuntu text-xl text-center" style={{ width: children ? 900 : 220 }}>
          {copy}
        </h2>
        <div className="d-flex flex-row gap-2 justify-center align-items-center">
          {isLoading ? (
            <Loader size="medium" type="infinite-spinner" />
          ) : (
            <section className="d-flex flex-column align-items-center">
              {children}
              <footer className="d-flex flex-row gap-2 justify-center align-items-center mt-4">
                <Button
                  style={{ width: '150px' }}
                  disabled={isLoading}
                  className="button button-secondary"
                  themeColor={'light'}
                  fillMode="solid"
                  rounded="medium"
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  style={{ width: '150px' }}
                  className="button button-primary"
                  onClick={() => onConfirm()}
                >
                  {acceptCopy?.length ? acceptCopy : 'Yes'}
                </Button>
              </footer>
            </section>
          )}
        </div>
      </div>
    </ModalForm>
  );
};
