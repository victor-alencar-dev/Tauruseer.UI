import { useParams } from '@remix-run/react';
import DependencyDataGrid from './dependency-grid/dependency-grid';

export const SbomProductReport = () => {
  const { productId } = useParams();
  return (
    <div className="row" style={{ height: '700px' }}>
      <div className="col-12">
        <DependencyDataGrid productId={productId} />
      </div>
    </div>
  );
};

export default SbomProductReport;
