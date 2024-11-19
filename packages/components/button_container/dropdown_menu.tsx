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
  setup(props, { slots, attrs }) {
    return () => (
      <>
       <KDropdown
          {...attrs}
          disabled={props.tabs.length === 0}
          v-slots={slots}
        >
        {
          props.tabs.map((tab: any) => (
            <KDropdownItem
              key={tab}
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
})
