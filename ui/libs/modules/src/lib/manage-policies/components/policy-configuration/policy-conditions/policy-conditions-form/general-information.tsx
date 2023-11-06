import { Field } from '@progress/kendo-react-form';
import { FormConditionsLayout } from '../../../../model/configure-policy.model';

const PolicyConditionsGeneralInfo = () => {
  const { generalInformation } = FormConditionsLayout;
  return (
    <>
      <label className="typography-body2 fw-semibold">General Information</label>
      {generalInformation.map((l, i) => {
        return (
          <div className={l.display} key={i}>
            {l.content.map((c, ic) => {
              return (
                <div className="col-4" key={i + ic} style={{ position: 'relative' }}>
                  <Field {...c} />
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default PolicyConditionsGeneralInfo;
