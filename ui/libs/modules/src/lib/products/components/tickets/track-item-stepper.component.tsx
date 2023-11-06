import { Stepper } from '@tauruseer/core';
import { steps } from '../../model/tickets.model';

export const TrackItemStepper = ({ step, handleStepChange }: any) => {
  return (
    <div>
      <Stepper value={step} onChange={handleStepChange} steps={steps} />
    </div>
  );
};
