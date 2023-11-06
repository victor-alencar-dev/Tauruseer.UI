import { Field } from '@progress/kendo-react-form';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { FormConditionsLayout } from '../../../../model/configure-policy.model';

const BusinessCriticalityTooltip = () => (
  <Tooltip anchorElement="target" position="top">
    <span
      className="k-icon k-i-help"
      title="Following the ISAACA protocol. Click for more information."
      style={{
        position: 'absolute',
        top: '16.6px',
        left: '136px',
        cursor: 'pointer',
        fontSize: '14px',
      }}
    ></span>
  </Tooltip>
);

const PolicyConditionsBusinessImpact = () => {
  const { businessImpact } = FormConditionsLayout;

  return (
    <>
      <label className="typography-body2 fw-semibold">Business Impact</label>
      {businessImpact.map((l, i) => {
        return (
          <div className={l.display} key={i}>
            {l.content.map((c, ic) => {
              return (
                <div className="col-4" key={i + ic} style={{ position: 'relative' }}>
                  {c.name === 'businessCriticality' && <BusinessCriticalityTooltip />}
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

export default PolicyConditionsBusinessImpact;
