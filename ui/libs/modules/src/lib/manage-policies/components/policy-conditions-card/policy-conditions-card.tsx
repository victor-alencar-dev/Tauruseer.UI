interface IPolicyConditionsCardProps {
  conditions: [];
}

export function PolicyConditionsCard({ conditions }: IPolicyConditionsCardProps) {
  const hasConditions = (conditions ?? []).length > 0;

  return (
    <div className="mb-4 card card-content">
      <div>
        <label className="d-block typography-h1">Conditions</label>
        <label className="d-block typography-h2 text-muted">General Information</label>
      </div>
      <div className="card p-3 mt-4 condition-card" style={{ boxShadow: 'none' }}>
        <div className="typography-h4 font-bold ff-ubuntu">No extra conditions</div>
        <div className="typography-h4 font-regular ff-montserrat">
          This policy applies to all products in your organization
        </div>
      </div>
      <div className="mt-2">
        <label className="d-block typography-h2 mb-2 text-muted">Matching Products</label>
        <div className="d-flex flex-wrap justify-content-between">
          {conditions?.map((condition, i) => (
            <div className="matching-product" key={i}>
              {condition}
            </div>
          ))}
          {!hasConditions && <div className="matching-product empty">No data available</div>}
        </div>
      </div>
    </div>
  );
}
