import { Switch } from '@progress/kendo-react-inputs';
import { useNavigate } from '@remix-run/react';
import { SBOM_PATH } from '@tauruseer/module';

interface IProductFilterView {
  path: string;
  checked?: boolean;
}
export const SbomProductFilterView = ({ path, checked }: IProductFilterView) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-end align-items-center me-4 custom-switch">
      <Switch
        size={'medium'}
        trackRounded={'full'}
        thumbRounded={'full'}
        onChange={() => {
          path === SBOM_PATH.AGGREGATED
            ? navigate(`${SBOM_PATH.REPORT}`)
            : navigate(`${SBOM_PATH.AGGREGATED}`);
        }}
        checked={checked}
      />
      <label className="ms-3 ff-ubuntu text-md font-regular">
        Show Product Aggregated SBOM Report
      </label>
    </div>
  );
};

export default SbomProductFilterView;
