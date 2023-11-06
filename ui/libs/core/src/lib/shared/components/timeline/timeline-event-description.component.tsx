import { ITimelineViewModel, TimelineEventTypes } from '@tauruseer/core';

interface IEventDescription {
  timeLineEvent: ITimelineViewModel;
  payload: any; // json type object no model know so far
}
export const EventDescription = ({ timeLineEvent, payload }: IEventDescription) => {
  let message;
  let userInfo = timeLineEvent?.sourceUser?.name;
  const nameReferenceName = timeLineEvent?.primaryReference?.name || '';
  const secondaryReferenceName = timeLineEvent?.secondaryReference?.name || '';
  const messageClassName = 'font-bold';
  // most common template for the event description
  const commonTemplate = (msg: Array<string>, ref: string) => {
    return (
      <>
        {msg[0]} <span className={messageClassName}>{ref} </span> {msg[1]}
      </>
    );
  };

  switch (timeLineEvent.type) {
    case TimelineEventTypes.PortfolioCreated:
    case TimelineEventTypes.ProductCreated:
    case TimelineEventTypes.PolicyCreated:
      message = commonTemplate(['', 'was created by'], nameReferenceName);
      break;
    case TimelineEventTypes.ProductEdited:
    case TimelineEventTypes.PolicyEdited:
      message = commonTemplate(['', 'was edited by'], nameReferenceName);
      break;
    case TimelineEventTypes.ReconcilitaionDataSourceDiscoverd:
      message = commonTemplate(['', 'has been discovered.'], nameReferenceName);
      userInfo = '';
      break;
    case TimelineEventTypes.ReconcilitaionDataSourceDismissed:
      message = commonTemplate(['', 'has been dismissed by'], nameReferenceName);
      break;
    case TimelineEventTypes.DatasourceMappingCreated:
      message = (
        <>
          <span className={messageClassName}>{nameReferenceName} </span> has been mapped to{' '}
          <span className={messageClassName}>{secondaryReferenceName} </span> by
        </>
      );
      break;
    case TimelineEventTypes.ReconcilitaionDataSourceMapped:
      message = (
        <>
          <span className={messageClassName}>{nameReferenceName} </span> has been mapped to{' '}
          <span className={messageClassName}>{secondaryReferenceName} </span> by
        </>
      );
      break;
    case TimelineEventTypes.NewTeamMember:
      message = commonTemplate(['', 'has joined the team'], nameReferenceName);
      userInfo = '';
      break;
    case TimelineEventTypes.InsightAutoDismissed:
      // TODO: implement complete functionality later on, InsightDetected, InsightAutoDismissed  and InsightUserDismissed
      message = 'Insight Auto Dismissed';
      userInfo = '';
      break;
    case TimelineEventTypes.OutageCreated:
      message = commonTemplate(['A new outage on', 'was created by'], secondaryReferenceName);
      break;
    case TimelineEventTypes.OutageEdited:
      message = commonTemplate(['A outage on', 'was edited by'], secondaryReferenceName);
      break;
    case TimelineEventTypes.ReleaseCreated:
      message = commonTemplate(['A new', 'release was created by'], secondaryReferenceName);
      break;
    case TimelineEventTypes.ReleaseEdited:
      message = commonTemplate(['A', 'release was edited by'], secondaryReferenceName);
      break;
    case TimelineEventTypes.PolicyRuleCreated:
      message = (
        <span>
          {payload.PolicyRuleType} {payload.Description} is {payload.RuleResult}
        </span>
      );
      userInfo = '';
      break;
    case TimelineEventTypes.PolicyRuleEdited:
      message = (
        <span>
          {payload.PolicyRuleType} {payload.Description} changed from{' '}
          <span className={messageClassName}>{payload.OldRuleResult} </span> to
          <span className={messageClassName}> {payload.RuleResult} </span> by
        </span>
      );
      break;
    case TimelineEventTypes.PolicyRuleDeleted:
      message = (
        <span>
          {payload.PolicyRuleType} {payload.Description} {payload.RuleResult} was deleted by
        </span>
      );
      break;
    case TimelineEventTypes.PolicyConditionsUpdated:
      message = (
        <span>
          {nameReferenceName} policy conditions were edited by{' '}
          <span className={messageClassName}> {userInfo} </span> {payload.fieldUpdates}
        </span>
      );
      break;
    case TimelineEventTypes.VulnerabilitiesDismissed:
      message = commonTemplate(['', 'product vulnerability were dismissed by'], nameReferenceName);
      break;
  }
  return (
    <>
      <span className="me-1">{message}</span>{' '}
      <span className="font-bold  text-muted">{userInfo}</span>
    </>
  );
};
