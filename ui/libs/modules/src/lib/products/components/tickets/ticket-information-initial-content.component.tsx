export const InitialContent = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 my-4">
      <span
        style={{ fontSize: '28px', color: '#4231B4' }}
        className="k-icon k-i-grid-layout mb-3"
      ></span>

      <p style={{ fontSize: '16px' }}>
        <strong>Select a Work Item Tool</strong>{' '}
      </p>

      <p style={{ textAlign: 'center' }}>
        To continue with the ticket creation form, first select a <br /> work item from the field
        above
      </p>
    </div>
  );
};
