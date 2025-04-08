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
  setup(props, { slots, attrs, emit }) {
    return () => (
      <>
       <KDropdown
          {...attrs}
          disabled={props.tabs.length === 0}
          v-slots={slots}
          onCommand={(command: number) => {
            emit('command', command)
          }}
        >
        {
          props.tabs.map((tab: any, index: number) => (
            <KDropdownItem
              key={tab.index}
              disabled={tab.disabled}
              command={tab.index}
            >
              { typeof tab?.label ==='function'? tab.label() : tab.label }
            </KDropdownItem>
          ))
        }
        
      </KDropdown>
      </>
    )
  }
})
