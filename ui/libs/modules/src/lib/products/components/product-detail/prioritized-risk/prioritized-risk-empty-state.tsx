export const LoadingState: React.ReactNode = (
  <div style={{ height: '132', width: '275', textAlign: 'center' }}>
    <i className="fa-solid fa-spinner-third fa-spin text-xxlg" style={{ color: '#4231B4' }}></i>
    <div className="data-empty-message d-flex flex-column mt-2">
      <span className="ff-ubuntu text-ml font-medium">{'Loading '}</span>
      <div className="ff-montserrat text-md font-regular d-flex flex-column">
        <span>{'Please wait while we collect your data'}</span>
      </div>
    </div>
  </div>
);
export const ChartEmptyState: React.ReactNode = (
  <div style={{ height: '132', width: '275', textAlign: 'center' }}>
    <i className="fa-duotone fa-chart-column text-xxlg" style={{ color: '#4231B4' }}></i>
    <div className="data-empty-message d-flex flex-column mt-2">
      <span className="ff-ubuntu text-ml font-medium">
        {'No content available here at the moment'}
      </span>
      <div className="ff-montserrat text-md font-regular d-flex flex-column">
        <span>{'Please explore other sections or return later.'}</span>
      </div>
    </div>
  </div>
);
