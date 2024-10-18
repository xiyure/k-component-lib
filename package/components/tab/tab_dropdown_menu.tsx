import { defineComponent } from 'vue';
import { KDropdown, KDropdownItem } from '../dropdown';

export default defineComponent({
  name: 'TabLabel',
  props: {
    tabs: {
      type: Array,
      default: () => ([])
    },
  },
  emits: ['command'],
  setup(props, { slots, emit }) {
    return () => (
      <>
       <KDropdown
          trigger={"click"}
          disabled={props.tabs.length === 0}
          maxHeight={'300px'}
          onCommand={jumpToTab}
          v-slots={slots}
        >
        {
          props.tabs.map((tab: any) => (
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
    function jumpToTab(command: any) {
      emit('command', command)
    }
  }
})
