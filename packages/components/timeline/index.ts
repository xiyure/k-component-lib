import Timeline from './time_line.vue';
import TimelineItem from './timeline_item.vue';
import { withInstall, withNoopInstall } from '../../utils/install';
import { KTimeline as _KTimeline, KTimelineItem as _KTimelineItem } from '../../../typings/all';

export const KTimeline = withInstall<typeof _KTimeline, { TimelineItem: typeof _KTimelineItem }>(Timeline, { TimelineItem });
export default KTimeline;

export const KTimelineItem = withNoopInstall<typeof _KTimelineItem>(TimelineItem);

export * from './type';