import Timeline from './time_line.vue';
import TimelineItem from './timeline_item.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KTimeline: SFCWithInstall<typeof Timeline> &
{
  TimelineItem: typeof TimelineItem
} = withInstall(Timeline, { TimelineItem });
export default KTimeline;

export const KTimelineItem: SFCWithInstall<typeof TimelineItem> = withInstall(TimelineItem);

export * from './type';