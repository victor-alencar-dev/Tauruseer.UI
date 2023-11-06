import { Button } from '@progress/kendo-react-buttons';
import { Loader } from '@progress/kendo-react-indicators';
interface IProps {
  Event: React.EventHandler<any>;
  disabled?: boolean;
  isLoading?: boolean;
}
export const DataSourceForma = ({ Event, disabled, isLoading }: IProps) => {
  return (
    <div className="d-flex w-100 p-4 ms-2 mb-3">
      {!disabled ? (
        <Button
          themeColor={'light'}
          fillMode="solid"
          size="large"
          disabled={disabled}
          className="button button-secondary me-4"
          rounded="medium"
          onClick={Event}
        >
          {!isLoading ? 'Connect' : <Loader size="medium" type="pulsing" themeColor="info" />}
        </Button>
      ) : (
        'Already Mapped'
      )}
    </div>
  );
};
