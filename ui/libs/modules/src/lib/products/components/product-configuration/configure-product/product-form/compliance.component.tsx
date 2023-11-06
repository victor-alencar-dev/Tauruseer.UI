import { Field } from '@progress/kendo-react-form';
import { FormInputLayout } from '../product-configuration.model';

const Compliance = () => {
  const { compliance } = FormInputLayout;

  return (
    <>
      <label className="typography-body2 fw-semibold">Compliance</label>
      {compliance.map((l, i) => {
        return (
          <div className={l.display} key={i}>
            {l.content.map((c, ic) => {
              return (
                <div className="col-4 mb-3" key={i + ic}>
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

export default Compliance;
