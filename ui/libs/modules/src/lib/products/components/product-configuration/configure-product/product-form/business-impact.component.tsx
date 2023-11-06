import { Field } from '@progress/kendo-react-form';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { FormInputLayout } from '../product-configuration.model';

const BusinessCriticalityTooltip = () => (
  <Tooltip anchorElement="target" position="top">
    <span
      className="k-icon k-i-help"
      title="Following the ISAACA protocol. Click for more information."
      style={{
        position: 'absolute',
        top: '4px',
        left: '136px',
        cursor: 'pointer',
        fontSize: '14px',
      }}
    ></span>
  </Tooltip>
);

const BusinessImpact = () => {
  const { businessImpact } = FormInputLayout;

  return (
    <>
      <label className="typography-body2 fw-semibold">Business Impact</label>
      {businessImpact.map((l, i) => {
        return (
          <div className={l.display} key={i}>
            {l.content.map((c, ic) => {
              return (
                <div className="col-4 mb-3" key={i + ic} style={{ position: 'relative' }}>
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

export default BusinessImpact;
