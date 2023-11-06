import { Field } from '@progress/kendo-react-form';
import { ITeamMember } from '../../../../model/teams.interface';
import { FormInputLayout } from '../product-configuration.model';

interface IRiskOwnersProps {
  data: ITeamMember[];
}
const RiskOwners = ({ data }: IRiskOwnersProps) => {
  const { riskOwners } = FormInputLayout;

  return (
    <>
      <label className="typography-body2 fw-semibold">Risk Owners</label>
      {riskOwners.map((l, i) => {
        return (
          <div className={l.display} key={i}>
            {l.content.map((c, ic) => {
              c.data = data;
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

export default RiskOwners;
