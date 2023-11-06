import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { StepperChangeEvent } from '@progress/kendo-react-layout';
import { FormDropDownList, Stepper } from '@tauruseer/core';
import { steps, TrackItemStatus } from '../../model/tickets.model';
import { useLoaderData } from '@remix-run/react';
import React, { ChangeEvent } from 'react';
import { IWorkTrackingTool } from '@tauruseer/module';

export interface ITrackItemsHeaderProps {
  step: number;
  handleStepChange: (e: StepperChangeEvent) => void;
  setStep: (step: number) => void;
  helperTexts: string[];
  setHelperTexts: (helperTexts: string[]) => void;
  setWorkTrackingTool: (workTrackingTool: IWorkTrackingTool) => void;
}

export const TrackItemsHeader: React.FC<ITrackItemsHeaderProps> = ({
  step,
  helperTexts,
  handleStepChange,
  setStep,
  setHelperTexts,
  setWorkTrackingTool,
}) => {
  const { workTrackingTools } = useLoaderData() as { workTrackingTools: IWorkTrackingTool[] };

  const onChangeWorkItemTool = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedItem = e.target.value as unknown as IWorkTrackingTool;

    if (selectedItem.name !== 'Select Work Item Tool') {
      // Sets next step
      setStep(TrackItemStatus.TICKET_INFO);
      // Sets helper text
      const newHelperTexts = helperTexts.map((text) => text);
      newHelperTexts[TrackItemStatus.WORK_ITEM_TOOL] = selectedItem.name;
      setHelperTexts(newHelperTexts);
      // sets WorkItemTool
      setWorkTrackingTool(selectedItem);
    } else {
      setStep(TrackItemStatus.WORK_ITEM_TOOL);
      setHelperTexts(['', '', '']);
    }
  };

  return (
    <div className="card card-content" style={{ marginBottom: '20px' }}>
      <div className="d-flex justify-content-between align-items-center">
        <div style={{ width: '500px' }}>
          <div className="typography-display">Track Item</div>

          <Form
            render={() => {
              return (
                <FormElement style={{ width: '100%' }}>
                  <Field
                    id="work-item-tool-dropdown"
                    name="workItemTool"
                    data={workTrackingTools}
                    rounded="medium"
                    fillMode="outline"
                    size="large"
                    textField="name"
                    defaultItem={{ name: 'Select Work Item Tool' }}
                    component={FormDropDownList}
                    onChange={onChangeWorkItemTool}
                  />
                </FormElement>
              );
            }}
          />
        </div>

        <div>
          <Stepper
            step={step}
            onChange={handleStepChange}
            steps={steps}
            helperTexts={helperTexts}
          />
        </div>
      </div>
    </div>
  );
};
