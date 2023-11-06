import { Button } from '@progress/kendo-react-buttons';
import { DataPerspective } from '@tauruseer/module';
import classNames from 'classnames';

export interface ISelectDataPerspectiveProps {
  dataPerspective: DataPerspective;
  handleChangeDataPerspective: (newDataPerspective: DataPerspective) => () => void;
}

const SelectDataPerspective = ({
  dataPerspective,
  handleChangeDataPerspective,
}: ISelectDataPerspectiveProps) => {
  const buttonClassName = (condition: boolean) => classNames('button', { selected: condition });
  const buttonSize = { width: '68px', height: '42px' };
  return (
    <div className="d-flex align-items-center gap-3 mb-3">
      <div className="text-md ff-ubuntu font-regular">Select Data Perspective</div>
      <div className="button-group">
        <Button
          onClick={handleChangeDataPerspective('ASPM')}
          className={buttonClassName(dataPerspective === 'ASPM')}
          style={buttonSize}
        >
          ASPM
        </Button>
        <Button
          onClick={handleChangeDataPerspective('CSPM')}
          className={buttonClassName(dataPerspective === 'CSPM')}
          style={buttonSize}
        >
          CSPM
        </Button>
        <Button
          onClick={handleChangeDataPerspective('GRC')}
          className={buttonClassName(dataPerspective === 'GRC')}
          style={buttonSize}
        >
          GRC
        </Button>
      </div>
    </div>
  );
};

export default SelectDataPerspective;
