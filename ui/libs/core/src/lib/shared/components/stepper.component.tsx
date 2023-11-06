import { Stepper as KendoStepper, StepperChangeEvent } from '@progress/kendo-react-layout';
import classNames from 'classnames';

export interface IStepperProps {
  step: number;
  handleStepChange: (e: StepperChangeEvent) => void;
  steps: any;
  helperTextStep: number;
  helperTexts: string[];
}

export const Stepper = ({ step, handleStepChange, steps, helperTexts }: any) => {
  const helperTextClassName = (text: string) =>
    classNames(
      {
        'text-muted': text === 'Missing',
      },
      { 'text-success': text !== 'Missing' },
      'col-4',
      'text-center',
      'typography-body2',
    );

  return (
    <div style={{ minWidth: '450px' }}>
      <KendoStepper value={step} onChange={handleStepChange} items={steps} />

      <div className="row">
        {helperTexts &&
          helperTexts.map((text: string, index: number) => (
            <div className={helperTextClassName(text)} key={index}>
              {text}
            </div>
          ))}
      </div>
    </div>
  );
};
