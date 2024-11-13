import { defineComponent } from 'vue';
import { KDropdown, KDropdownItem } from '../dropdown';
import { flattenChildren, isValidElement, camelize } from '../../utils';

export default defineComponent({
  name: 'TabLabel',
  props: {
    tabIndexList: {
      type: Array,
      default: () => ([])
    },
    tabSlots: {
      type: Object,
      default: () => null
    }
  },
  emits: ['command'],
  setup(props, { slots, emit }) {
    return () => {
      const tabIndexMap = new Map(props.tabIndexList.map((tabIndex, index) => [tabIndex, index]))
      const tabs = parseTabList(flattenChildren(props.tabSlots?.default?.()))
        .filter((_item, index) => tabIndexMap.has(index));
      return (
        <>
         <KDropdown
            trigger={"click"}
            disabled={props.tabIndexList.length === 0}
            maxHeight={'300px'}
            onCommand={jumpToTab}
            v-slots={slots}
          >
          {
            tabs.map((tab: any) => (
              <KDropdownItem
                key={tab.name}
                command={tab}
                disabled={tab.disabled}
              >
                { typeof tab?.label ==='function'? tab.label() : tab.label }
              </KDropdownItem>
            ))
          }
          
        </KDropdown>
        </>
      )
    }
    function jumpToTab(command: any) {
      emit('command', command)
    }
    // 解析tab-pane
function parseTabList(children: any[]): any[] {
  return children
  .map((node) => {
    if (isValidElement(node)) {
      const props = { ...(node.props || {}) };
      for (const [k, v] of Object.entries(props)) {
        delete props[k];
        props[camelize(k)] = v;
      }
      const slots = node.children || {};
      const name = node.props?.name !== undefined ? node.props.name : undefined;
      const { label = slots.label, disabled } = props;
      return {
        name,
        label,
        disabled: disabled === '' || disabled
      };
    }
    return null;
  })
  .filter((tab) => tab);
}
  }
})
