import { Button } from '@progress/kendo-react-buttons';
import { ThrownResponse, useNavigate } from '@remix-run/react';
import cloud from './cloud.svg';
import rocket from './rocket.svg';

export interface IError {
  error?: Error;
  caught?: ThrownResponse;
}

export const ErrorDetails = ({ error }: IError) => {
  return (
    <div className="mt-2">
      <div className="typography-body2">{error?.message}</div>
      <hr />
      <div className="typography-body1">{error?.stack}</div>
    </div>
  );
};

export const Error = (props: IError) => {
  const navigate = useNavigate();

  const { error, caught } = props;

  const isDev = process?.env?.['NODE_ENV'] === 'development';

  const errorCode = caught?.status || '';

  const handleReturnToDashboard = () => {
    navigate('/asset-discovery');
  };

  return (
    <div>
      <div
        className="card card-content d-flex align-items-center justify-content-center text-primary-dark"
        style={{ height: isDev && !caught ? '60vh' : '80vh' }}
      >
        <div
          style={{ width: '176px', height: '176px', position: 'relative', marginBottom: '48px' }}
        >
          <img style={{ position: 'absolute', top: 0, right: 0 }} src={cloud} alt="cloud" />
          <img style={{ position: 'absolute', bottom: 0, left: 0 }} src={rocket} alt="rocket" />
        </div>

        <div style={{ fontSize: '24px', lineHeight: 1 }} className="typography-body2 mb-1">
          Error
        </div>

        <div style={{ fontSize: '96px', lineHeight: 1 }} className="typography-body2 my-1">
          {errorCode}
        </div>

        <div style={{ fontSize: '24px', lineHeight: 1 }} className="typography-body2 my-2">
          {caught?.status ? error?.message || caught.data : 'Something went wrong'}
        </div>

        <div className="typography-body2 mt-3" style={{ width: '687px', textAlign: 'center' }}>
          Oh-oh! It seems this page has encountered with a unexpected error and the page fail to
          load. You can return to the dashboard and keep navigating.
        </div>

        <Button className="button button-primary mt-4" onClick={handleReturnToDashboard}>
          Return to the Dashboard
        </Button>
      </div>

      {isDev && !caught && <ErrorDetails error={error} />}
    </div>
  );
};
