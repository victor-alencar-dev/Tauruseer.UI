import { Button } from '@progress/kendo-react-buttons';
import { useFetcher } from '@remix-run/react';
import { ModalForm } from '@tauruseer/core';
import { ASSET_DISCOVERY_ACTION, DIALOG_TEXT_ACTIONS } from '@tauruseer/module';
import { useEffect, useState } from 'react';
interface IRulesDeleteForm {
  onClose: React.EventHandler<any>;
  repoId: number;
  actionType?: string;
}
export const AcceptRiskForm = ({ repoId, onClose, actionType }: IRulesDeleteForm) => {
  const fetcher = useFetcher();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [ctaText, setCtaText] = useState<string>();
  const [dialogText, setDialogText] = useState<string>();
  const [actionDialogText, setActionDialogText] = useState<string>();

  useEffect(() => {
    const { data, type, state } = fetcher;
    if (type === 'done' && state === 'idle' && data.success) {
      setDialogText(data.message);
      closeAfterSuccess();
    }
    if (type === 'done' && state === 'idle' && data.error) {
      setDialogText(data.error);
    }
    if (state === 'submitting' || state === 'loading') {
      setIsSubmitting(true);
    } else {
      setIsSubmitting(false);
    }
  }, [fetcher]);

  useEffect(() => {
    dialogTextActions();
  }, []);

  const closeAfterSuccess = () => {
    setTimeout(() => {
      onClose(true);
    }, 3000);
  };
  const dialogTextActions = () => {
    if (actionType === ASSET_DISCOVERY_ACTION.ACCEPT_RISK) {
      setDialogText(DIALOG_TEXT_ACTIONS.ACCEPT_RISK.TEXT_DESCRIPTION);
      setActionDialogText(DIALOG_TEXT_ACTIONS.ACCEPT_RISK.ACTION_TEXT);
      setCtaText(DIALOG_TEXT_ACTIONS.ACCEPT_RISK.btnText);
    }
    if (actionType === ASSET_DISCOVERY_ACTION.INVESTIGATE_ASSET) {
      setDialogText(DIALOG_TEXT_ACTIONS.INVESTIGATE_ASSET.TEXT_DESCRIPTION);
      setActionDialogText(DIALOG_TEXT_ACTIONS.INVESTIGATE_ASSET.ACTION_TEXT);
      setCtaText(DIALOG_TEXT_ACTIONS.INVESTIGATE_ASSET.btnText);
    }
    if (actionType === ASSET_DISCOVERY_ACTION.SET_MANUAL_SCAN) {
      setDialogText(DIALOG_TEXT_ACTIONS.SET_MANUAL_SCAN.TEXT_DESCRIPTION);
      setActionDialogText(DIALOG_TEXT_ACTIONS.SET_MANUAL_SCAN.ACTION_TEXT);
      setCtaText(DIALOG_TEXT_ACTIONS.SET_MANUAL_SCAN.btnText);
    }
  };

  const acceptRiskAction = () => {
    const payload = {
      action: actionType,
      assetId: repoId,
    };
    fetcher.submit({ payload: JSON.stringify(payload) }, { method: 'post' });
  };

  return (
    <ModalForm title="" type={'dialog'} onClose={onClose} width={500}>
      <p className="text-center ff-ubuntu text-ml mt-5 mb-5">
        <i
          className={
            isSubmitting
              ? 'fas fa-circle-notch fa-spin me-2 text-xl'
              : 'fa-light fa-circle-info text-xl'
          }
          style={{ color: isSubmitting ? '#0D6EFD' : '#FF8A00' }}
        ></i>
        <span className="ms-3">{isSubmitting ? actionDialogText : dialogText}</span>
      </p>
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
          style={{
            padding: '16px 32px',
            fontSize: '13px',
            width: ctaText === DIALOG_TEXT_ACTIONS.INVESTIGATE_ASSET.btnText ? '166px' : '132px',
          }}
          onClick={isSubmitting ? () => {} : acceptRiskAction}
        >
          <span>
            {isSubmitting && <i className="fas fa-circle-notch fa-spin me-2"></i>} {ctaText}
          </span>
        </Button>
      </div>
    </ModalForm>
  );
};
