import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { IRepository } from '@tauruseer/module';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { SBOMStore } from '../../../state/sbom-storage';
import SbomProductFilterView from '../product-aggregated-filter-swicth';

interface IReportSelection {
  repository: Array<IRepository>;
}
export const SbomReportSelection = ({ repository }: IReportSelection) => {
  dayjs.extend(localizedFormat);
  const storage = SBOMStore((state) => state);
  const defaultItemRepository = {
    name: 'Select a Repository ...',
  };

  const onChange = (event: DropDownListChangeEvent) => {
    const { assetId } = event.target.value;
    storage.setSelectedRepository(assetId);
  };

  return (
    <div className="row d-flex flex-wrap">
      <div className="d-flex flex-column col-3">
        <label className="ff-ubuntu font-regular text-md mb-2">Select Repository</label>
        <DropDownList
          size="large"
          fillMode="outline"
          rounded="medium"
          data={repository}
          textField="name"
          onChange={onChange}
          defaultItem={defaultItemRepository}
        />
      </div>

      <div className="d-flex  col-4 justify-content-end align-items-center align-self-center flex-grow-1">
        <SbomProductFilterView path="" />
      </div>
    </div>
  );
};
