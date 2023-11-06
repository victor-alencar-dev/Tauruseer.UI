interface IRemediationContent {
  data: any;
  isLoading: boolean;
}
export const RemediationContent = ({ data, isLoading }: IRemediationContent) => {
  const { under30Days, under60Days, under90Days, over90Days, averageRemediationTime, maxOpenAge } =
    data;
  const remediationData = [
    {
      days: '0-30 days',
      count: under30Days?.count,
    },
    {
      days: '31-60 days',
      count: under60Days?.count,
    },
    {
      days: '61-90 days',
      count: under90Days?.count,
    },
    {
      days: '+90 days',
      count: over90Days?.count,
    },
  ];
  const getText = (days: number) => {
    return `${days} ${days === 1 ? 'vulnerability' : 'vulnerabilities'}`;
  };
  return (
    <div
      className="d-flex flex-column align-items-center gap-2 prioritized-risk-remediation"
      style={{ margin: remediationData.length ? '0' : 'auto' }}
    >
      <div className="d-flex  justify-content-between gap-4 prioritized-risk-remediation_description">
        <div className="d-flex flex-column  gap-1">
          <span className="ff-ubuntu font-medium prioritized-risk-remediation_description_value">
            {averageRemediationTime}
          </span>
          <span className="ff-ubuntu font-regular">Avg. Remediation Time</span>
        </div>
        <div className="d-flex flex-column align-items-center gap-1">
          <span className="ff-ubuntu font-medium prioritized-risk-remediation_description_value">
            {maxOpenAge}
          </span>
          <span className="ff-ubuntu  font-regular">Max. Remediation Time</span>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between prioritized-risk-remediation_header">
        <span>
          <span className="ff-montserrat  font-bold">Time</span>
        </span>
        <span className="ff-montserrat  font-bold">Count</span>
      </div>
      {remediationData.map((r, i) => {
        return (
          <div
            key={i}
            className="d-flex align-items-center justify-content-between prioritized-risk-remediation_content"
          >
            <span>
              <span className="ff-montserrat  font-regular">{r.days}</span>
            </span>
            <span className="ff-montserrat font-regular">{getText(r.count || 0)}</span>
          </div>
        );
      })}
    </div>
  );
};
