import { Switch, SwitchChangeEvent } from '@progress/kendo-react-inputs';
import { useFetcher } from '@remix-run/react';
import { Chip, NotificationType, NotificationsAlert, TChipModifier } from '@tauruseer/core';
import { useEffect, useState } from 'react';
import { CategoryMap, Cognitions, SeverityMap } from '../model/cognition.model';

interface IProps {
  description: Cognitions;
}
export const CognitionsCardsDescription = ({ description }: IProps) => {
  const severity = SeverityMap.get(description.severity);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const fetcher = useFetcher();
  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'loading') {
      return;
    }
    if (fetcher.data) {
      const { msg, success } = fetcher.data;
      setAlertType(success ? 'success' : 'error');
      setAlertMessage(msg);
      displayNotification();
    }
  }, [fetcher.data]);

  const setActiveCognitions = (event: SwitchChangeEvent) => {
    fetcher.load(
      `/manage-cognitions/cognitions-actions?id=${description.id}&isActive=${event.value}`,
    );
  };
  const displayNotification = () => {
    setShowAlert(true);
    if (!showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };
  return (
    <>
      <div className="card cognition-content">
        <div className="cognition-content__title">
          <span>
            <span className="ff-montserrat text-md font-bolder" style={{ color: '#4231B4' }}>
              {description.code}
            </span>
            <span className=" cognition-content__pipe"> | </span>
            <span className="ff-montserrat text-md font-bold">{description.title}</span>
            <span className="cognition-content__type text-xs ms-3">
              {' '}
              {CategoryMap.get(description.category)}
            </span>
          </span>
          <span
            className="ff-montserrat text-md font-regular cognition-content__description"
            dangerouslySetInnerHTML={{ __html: description.description || '' }}
          ></span>
        </div>
        <div className="d-flex flex-column ff-montserrat text-md" style={{ gap: '10px' }}>
          <Chip
            copy={severity || ''}
            type="severity"
            modifier={severity?.toLocaleLowerCase() as TChipModifier}
          />
          <span className="d-block text-end font-light">
            <div className="d-flex justify-content-end align-items-center me-4 custom-switch">
              <label className="text-md font-light me-3">Active</label>
              <Switch
                size={'medium'}
                disabled={fetcher.state === 'loading'}
                defaultChecked={description.isActive}
                trackRounded={'full'}
                thumbRounded={'full'}
                onChange={setActiveCognitions}
              />
            </div>
          </span>
        </div>
      </div>
      <NotificationsAlert
        alert={showAlert}
        alertMessage={alertMessage}
        type={alertType as NotificationType}
      />
    </>
  );
};
