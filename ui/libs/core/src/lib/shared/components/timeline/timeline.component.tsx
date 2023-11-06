import { groupBy, ITimeLine, ITimelineViewModel } from '@tauruseer/core';
import { TimeLineEmptyState } from './timeline-empty-state.component';
import { TimeLineEvent } from './timeline-event.component';

interface ITraceabilityProps {
  data: ITimeLine;
}

export const TimeLine = ({ data }: ITraceabilityProps) => {
  const { events } = data;
  const timeline = groupBy(events, (v: any) => v.monthString);

  return (
    <div className="card mb-3">
      <div className="card-content ">
        <label className="ff-ubuntu text-ml font-medium mb-3">Traceability</label>
        <div className="traceability-content">
          {events.length ? (
            Object.keys(timeline).map((key) => {
              return (
                <div key={key}>
                  <span>
                    <span className="k-icon k-i-calendar"></span> {key}
                  </span>
                  <div className="traceability-timeline ps-3 ms-2">
                    {timeline[key].map((eve: ITimelineViewModel, i) => {
                      return <TimeLineEvent {...eve} key={i} />;
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <TimeLineEmptyState />
          )}
        </div>
      </div>
    </div>
  );
};
