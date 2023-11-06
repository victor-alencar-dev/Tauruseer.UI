import { useFetcher } from '@remix-run/react';
import { Modal } from '@tauruseer/core';
import { useEffect, useState } from 'react';
interface IRulesDeleteForm {
  policyId?: string;
  ruleId?: string;
  onClose: React.EventHandler<any>;
}
export const RuleDeleteForm = ({ policyId, ruleId, onClose }: IRulesDeleteForm) => {
  const fetcher = useFetcher();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dialogText, setDialogText] = useState<string>('Are you sure you want to continue?');
  const [actionValid, setActionValid] = useState<boolean>(true);

  useEffect(() => {
    const { data, type, state } = fetcher;
    if (type === 'done' && state === 'idle' && data.success) {
      setDialogText(data.message);
      setActionValid(false);
    }
    if (type === 'done' && state === 'idle' && data.error) {
      setDialogText(data.error);
      setActionValid(true);
    }
    if (state === 'submitting' || state === 'loading') {
      setIsSubmitting(true);
      setActionValid(false);
    } else {
      setIsSubmitting(false);
    }
  }, [fetcher]);

  const handleDeleteRule = () => {
    fetcher.submit(
      { rule: JSON.stringify({ policyId, ruleId, action: 'delete' }) },
      { method: 'post' },
    );
  };

  return (
    <Modal
      title="Delete Rule"
      onClose={onClose}
      hasButtons
      width={450}
      onAction={actionValid ? handleDeleteRule : () => {}}
    >
      <p className="text-center ff-ubuntu text-ml mt-5 mb-5">
        <i
          className={
            isSubmitting ? 'fas fa-circle-notch fa-spin me-2' : 'fa-solid fa-triangle-exclamation'
          }
        ></i>
        <span className="ms-3">{isSubmitting ? 'Deleting rule please wait ' : dialogText}</span>
      </p>
    </Modal>
  );
};
