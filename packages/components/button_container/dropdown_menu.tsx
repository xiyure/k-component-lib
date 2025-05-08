import { defineComponent, PropType } from 'vue';
import { KDropdown, KDropdownItem } from '../dropdown';
import { ButtonContainerTab } from './type';

export default defineComponent({
  name: 'TabLabel',
  props: {
    tabs: {
      type: Array as PropType<ButtonContainerTab[]>,
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
          onCommand={(command) => {
            emit('command', command)
          }}
        >
        {
          props.tabs.map((tab) => (
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
