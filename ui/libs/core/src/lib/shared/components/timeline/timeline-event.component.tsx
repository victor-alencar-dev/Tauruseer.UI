import { AlertSeverity, CategoryIcons, ITimelineViewModel } from '@tauruseer/core';
import classNames from 'classnames';
import dayjs from 'dayjs';

export const TimeLineEvent = (event: ITimelineViewModel) => {
  const payload = JSON.parse(event.payload);

  const setTextClass = (type: AlertSeverity) => {
    return classNames(`ff-montserrat text-md font-bold d-flex align-items-center`, {
      'text-warning': type === AlertSeverity.Warning,
      'text-danger': type === AlertSeverity.Critical,
      'text--primary-dark': type === AlertSeverity.Notice,
      'text--primary-main': type === AlertSeverity.Information,
    });
  };
  return (
    <div className="chip chip-secondary justify-content-between p-3 m-1 border mb-1">
      <div>
        <span className={setTextClass(payload?.Severity as AlertSeverity)}>
          <div className={`traceability-status traceability-status__${event.eventClassification}`}>
            <i className={CategoryIcons.get(event.eventClassification || '')}></i>
          </div>
          <span className="ms-2"> {event.title}</span>
          <span className="traceability-type text-xs ms-2"> {event.eventCategory}</span>
        </span>
        <span className="f-montserrat text-md font-regular traceability-description">
          <span
            className="me-1"
            dangerouslySetInnerHTML={{ __html: event.eventMessage || '' }}
          ></span>{' '}
        </span>
      </div>
      <div className="d-block ff-montserrat text-md">
        <span className="d-block text-subtitle font-medium">
          {dayjs(event.eventDate).format('MMMM DD, YYYY')}
        </span>{' '}
        <span className="d-block text-end font-light">
          {dayjs(event.eventDate).format('h:mmA')}
        </span>
      </div>
    </div>
  );
};
