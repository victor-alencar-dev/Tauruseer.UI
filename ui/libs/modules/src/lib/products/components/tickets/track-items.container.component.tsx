import { useState } from 'react';
import { TrackItemStatus } from '../../model/tickets.model';
import { InitialContent } from './ticket-information-initial-content.component';
import { LoadingOverlay } from './ticket-information-loading-overlay.component';
import { TicketInformationForm } from './ticket-information.component';
import { IWorkTrackingTool } from '../../model/product-data-sources.model';

interface TrackItemsContainerProps {
  step: TrackItemStatus;
  setStep: (step: TrackItemStatus) => void;
  helperTexts: string[];
  setHelperTexts: (helperTexts: string[]) => void;
  workTrackingTool: IWorkTrackingTool | null;
  data: {
    teamMembers: any;
    title: string;
    description: string;
  };
}

export const TrackItemsContainer = ({
  step,
  setStep,
  workTrackingTool,
  data,
}: TrackItemsContainerProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="card card-content">
      {loading && <LoadingOverlay />}

      {step === TrackItemStatus.WORK_ITEM_TOOL && <InitialContent />}
      {step > TrackItemStatus.WORK_ITEM_TOOL && (
        <TicketInformationForm
          step={step}
          workTrackingTool={workTrackingTool}
          setStep={setStep}
          setLoading={setLoading}
          data={data}
        />
      )}
    </div>
  );
};
