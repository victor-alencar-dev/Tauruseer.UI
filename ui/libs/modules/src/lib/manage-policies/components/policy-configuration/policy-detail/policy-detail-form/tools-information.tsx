import { Field } from '@progress/kendo-react-form';
import { FormToolLayout } from '../../../../model/configure-policy.model';

const PolicyTools = () => {
  return (
    <>
      {FormToolLayout.map((l, i) => {
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

export default PolicyTools;
