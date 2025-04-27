import { Ref, SetupContext, RenderFunction } from 'vue';
import type { TimelineItemProps as ElTimelineItemProps } from 'element-plus';
import { DefineComponentApp, DefineComponentInstance, ComponentBaseOptions, ComponentSlotType, Merge } from '../common';
import type { TimelineProps, TimelineItemProps } from '../base';

// timeline
export declare const KTimeline: DefineComponentApp<KTimelineProps, KTimelineEmits, KTimelineSlots>;

export type KTimelineInstance = DefineComponentInstance<KTimelineProps, KTimelineConstructor>

export interface KTimelineConstructor extends ComponentBaseOptions, KTimelineMethods {
  props: KTimelineProps
  context: SetupContext<KTimelineEmits>
  getRefMaps(): KTimelinePrivateRef
  getComputeMaps(): KTimelinePrivateComputed
  renderVN: RenderFunction
}

export interface KTimelinePrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KTimelinePrivateComputed {}

export type KTimelineProps = TimelineProps;

export interface KTimelineEmits {}

export interface KTimelineSlots {
  default: () => ComponentSlotType
}

export type KTimelineMethods = {}

// timeline-item
export declare const KTimelineItem: DefineComponentApp<KTimelineItemProps, KTimelineItemEmits, KTimelineItemSlots>;

export type KTimelineItemInstance = DefineComponentInstance<KTimelineItemProps, KTimelineItemConstructor>

export interface KTimelineItemConstructor extends ComponentBaseOptions, KTimelineItemMethods {
  props: KTimelineItemProps
  context: SetupContext<KTimelineItemEmits>
  getRefMaps(): KTimelineItemPrivateRef
  getComputeMaps(): KTimelineItemPrivateComputed
  renderVN: RenderFunction
}

export interface KTimelineItemPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}

export interface KTimelineItemPrivateComputed {}

export type KTimelineItemProps = Merge<TimelineItemProps, ElTimelineItemProps>;

export interface KTimelineItemEmits {}

export interface KTimelineItemSlots {
  default: () => ComponentSlotType
  dot: () => ComponentSlotType
}

export type KTimelineItemMethods = {}