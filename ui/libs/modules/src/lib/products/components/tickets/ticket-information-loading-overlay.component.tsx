export const LoadingOverlay = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 999,
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <span
          style={{ fontSize: '54px', color: '#4231B4' }}
          className="k-icon k-i-loading mb-3"
        ></span>

        <p style={{ fontSize: '14px', textAlign: 'center' }}>
          <strong>
            Creating Ticket <br />
            This could take a few moments
          </strong>
        </p>
      </div>
    </div>
  );
};
