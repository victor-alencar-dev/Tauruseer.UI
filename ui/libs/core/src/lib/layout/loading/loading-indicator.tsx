import { Loader } from '@progress/kendo-react-indicators';
import { Card } from '@progress/kendo-react-layout';

export const LoadingIndicator = () => {
  return (
    <Card className='card card-content'>
      <Loader size='large' />
    </Card>
  );
};
