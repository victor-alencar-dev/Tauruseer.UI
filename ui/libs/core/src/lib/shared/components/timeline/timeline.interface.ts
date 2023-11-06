import { ReferenceTypes, TimelineEventTypes } from './timeline.model';

export interface ITimeLine {
  events: ITimelineViewModel[];
}
export interface ITimelineViewModel {
  id: number;
  eventDate: string;
  month: number;
  year: number;
  timeString: string;
  shortDayString: string;
  dayString: string;
  monthString: string;
  type: TimelineEventTypes;
  primaryReference: ITimelineReference;
  secondaryReference: ITimelineReference;
  sourceUser: ITimelineReference;
  targetUser: ITimelineReference;
  imgUrl: string;
  title: string;
  payload: string;
  eventCategory?: string;
  eventMessage?: string;
  eventClassification?: string;
}

export interface ITimelineReference {
  referenceType: ReferenceTypes;
  referenceTypeName: string;
  name: string;
  id: string;
  productId: number;
}
