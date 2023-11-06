import { Button } from '@progress/kendo-react-buttons';
import { useFetcher } from '@remix-run/react';
import { ModalForm } from '@tauruseer/core';
import { PORTFOLIO_ACTIONS } from '@tauruseer/module';
import { useEffect, useState } from 'react';
import { PortfolioStore } from '../../state/portfolio-storage';
interface IPortfolioDeleteForm {
  onClose: React.EventHandler<any>;
  portfolioId: number;
}
export const ArchivePortfolio = ({ onClose, portfolioId }: IPortfolioDeleteForm) => {
  const store = PortfolioStore((state) => state);
  const fetcher = useFetcher();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [wasDeleted, setWasDeleted] = useState<boolean>(false);
  const [actionMsg, setActionMsg] = useState<string>();

  useEffect(() => {
    const { data, type, state } = fetcher;
    if (type === 'done' && state === 'idle' && data.success) {
      setActionMsg(data.message);
      setWasDeleted(true);
      setTimeout(() => {
        onClose(null);
      }, 3000);
    }
    if (type === 'done' && state === 'idle' && !data.success) {
      setActionMsg(data.message);
      setWasDeleted(false);
    }
    if (state === 'submitting' || state === 'loading') {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  }, [fetcher]);

  const archivePortfolio = () => {
    const payload = {
      action: PORTFOLIO_ACTIONS.ARCHIVE_PORTFOLIO,
      portfolioId: store.portfolio.portfolioId,
      IsArchived: true,
    };
    fetcher.submit({ payload: JSON.stringify(payload) }, { method: 'post' });
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
          <span className="ms-3">Are you sure you want to Archive</span>
          <span className="ms-3">this portfolio?</span>
        </div>
      ) : (
        <div className="text-center ff-ubuntu text-xl  mb-5 mt-3 d-flex flex-column">
          <span className="ms-3">{actionMsg}</span>
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
          style={{ padding: '16px 32px', fontSize: '13px', width: '104px' }}
          onClick={isSubmitting || wasDeleted ? () => {} : archivePortfolio}
        >
          {isSubmitting ? (
            <span>
              <i className="fas fa-circle-notch fa-spin me-2"></i> Archiving{' '}
            </span>
          ) : (
            'Archive'
          )}
        </Button>
      </div>
    </ModalForm>
  );
};
