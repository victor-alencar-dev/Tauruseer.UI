import { StepperChangeEvent } from '@progress/kendo-react-layout';
import { Link } from '@remix-run/react';
import { Stepper } from '@tauruseer/core';
import { useState } from 'react';

const steps = [
  { label: 'Sources Control' },
  { label: 'Work Tracking' },
  { label: 'Cloud Hosting' },
];
export enum DataSourcesItems {
  SOURCES_CONTROL = 0,
  WORK_TRACKING = 1,
  CLOUD_HOSTING = 2,
}
export const DataSourceStepper = () => {
  const [stepperValue, setStepperValue] = useState<number>(DataSourcesItems.SOURCES_CONTROL);
  const [helperTexts, setHelperTexts] = useState<string[]>(['Not Selected', 'Missing', 'Missing']);
  const handleChange = (e: StepperChangeEvent) => {
    setStepperValue(e.value);
  };
  return (
    <div className="card card-content" style={{ height: '125px', padding: '1rem' }}>
      <div className="d-flex">
        <div className="flex-fill align-self-center">
          <Stepper
            step={stepperValue}
            onChange={handleChange}
            steps={steps}
            helperTexts={helperTexts}
          />
        </div>
        <div className="d-flex flex-column me-5">
          <label className="d-block typography-body2 mb-1">Next Steps</label>
          <Link to={`#`} style={{ color: '#49A2F4' }}>
            Select a Work Tracking Source
          </Link>
          <p style={{ width: '360px' }}>
            Lorem ipsum dolor sit amet consectetur. Viverra donec sed velit morbi in integer.
          </p>
        </div>
      </div>
    </div>
  );
};
