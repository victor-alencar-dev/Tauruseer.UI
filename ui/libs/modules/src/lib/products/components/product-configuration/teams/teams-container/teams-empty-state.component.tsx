import { Icon } from '@progress/kendo-react-common';
export const TeamsEmptyState = () => {
  return (
    <div className="d-flex flex-column justify-content-center h-100 align-items-center">
      <div className="justify-content-center w-75 p-5 mb-5 border rounded">
        <div className="text-center">
          <Icon name="user" style={{ fontSize: '58px', color: '#4231B4' }} />
          <div className="ff-ubuntu text-md text-muted ">
            There are no Team Members To display yet
          </div>
          <div className="ff-montserrat text-md text-muted ">
            If any Member is added, this section will show the members information accordantly
          </div>
        </div>
      </div>
    </div>
  );
};
