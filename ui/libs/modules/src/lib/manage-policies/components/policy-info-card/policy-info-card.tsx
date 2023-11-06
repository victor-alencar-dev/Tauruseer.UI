import { Policy } from '../../model/manage-policies.model';
import { PolicyStatusBox } from '../policy-status-box/policy-status-box';
import { PolicyInfoCardHeader } from './policy-info-card-header';

export interface IPolicyInfoCard {
  policy: Policy;
}
export function PolicyInfoCard({ policy }: IPolicyInfoCard) {
  const formatDate = (date: string) => {
    const dObject = new Date(date);
    return dObject.toLocaleDateString();
  };

  return (
    <div className="mb-4 card card-content">
      <PolicyInfoCardHeader policy={policy} />
      <section className="mt-4">
        <div className="typography-h2 ff-ubuntu">Description</div>
        <div className="typography-h4 ff-montserrat font-regular">{policy?.description}</div>
      </section>
      <section className="mt-3">
        <div className="d-flex">
          <div className="w-50">
            <div className="typography-h2 ff-ubuntu">Type</div>
            <div className="typography-h4 ff-montserrat font-regular mt-3">
              {policy?.policyType}
            </div>
          </div>
          <div className="w-50">
            <div className="typography-h2 ff-ubuntu">Status</div>
            <div className="typography-h4 ff-montserrat font-regular mt-2">
              <PolicyStatusBox status={policy?.isActive ? 'active' : 'inactive'} />
            </div>
          </div>
        </div>
      </section>
      <section className="mt-3">
        <div className="d-flex">
          <div className="w-50">
            <div className="typography-h2 ff-ubuntu">Created</div>
            <div className="typography-h4 ff-montserrat font-regular mt-2">
              {formatDate(policy?.createdAt ?? '')}
            </div>
            <div>
              <span className="typography-h4 ff-montserrat font-regular">
                By {policy?.createdByUserName}
              </span>
              <span className="typography-h4 text-muted ff-montserrat ms-1">
                ({policy?.createdByUserEmail})
              </span>
            </div>
          </div>
          <div className="w-50">
            <div className="typography-h2 ff-ubuntu">Updated</div>
            {policy.updatedAt && (
              <>
                <div className="typography-h4 ff-montserrat font-regular mt-2">
                  {formatDate(policy.updatedAt)}
                </div>
                <div>
                  <span className="typography-h4 ff-montserrat font-regular">
                    By {policy.updatedByUserName}
                  </span>
                  <span className="typography-h4 text-muted ff-montserrat ms-1">
                    ({policy.updatedByUserEmail})
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
