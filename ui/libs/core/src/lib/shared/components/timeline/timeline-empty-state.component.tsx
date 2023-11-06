export const TimeLineEmptyState = () => {
  return (
    <div className="d-flex flex-column justify-content-center h-100 align-items-center">
      <div
        className="justify-content-center w-75 p-5 border rounded"
        style={{ borderColor: 'rgba(27, 33, 36, 0.25)!important' }}
      >
        <div className="text-center">
          <span className="k-icon k-i-align-justify mb-2" style={{ color: '#4231B4' }}></span>
          <div className="ff-ubuntu text-md text-muted ">
            There are no a TimeLine To display yet
          </div>
          <div className="ff-montserrat text-md text-muted ">
            If any issue arrives, this section will show the actions needed to be taken
          </div>
        </div>
      </div>
    </div>
  );
};
