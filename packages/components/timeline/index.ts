import Timeline from './time_line.vue';
import TimelineItem from './timeline_item.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall, withNoopInstall } from '../../utils/install';

export const KTimeline: SFCWithInstall<typeof Timeline> &
{
  TimelineItem: typeof TimelineItem
} = withInstall(Timeline, { TimelineItem });
export default KTimeline;

export const KTimelineItem: SFCWithInstall<typeof TimelineItem> = withNoopInstall(TimelineItem);

export * from './type';