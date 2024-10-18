import { SlotsType, defineComponent } from 'vue';
import { KTableColumn, KColumnGroup } from '../table';
import TableColumnContent from './table_column_content.vue';
import { columnConfigType } from './type.d';

export default defineComponent({
  name: 'ColumnGroup',
  props: {
    data: Array,
    column: {
      type: Object,
      default: () => ({})
    },
    size: {
      type: String,
      default: 'default'
    },
    align: {
      type: String,
      default: () => 'left'
    }

  },
  setup(props, { slots }) {
    return () => (
      Array.isArray(props.column.group)
        && props.column.group.length ? addColumnGroup(props.column)
        : getTableColumn(slots, props.column)
    )
    function addColumnGroup(col: columnConfigType) {
      const group = col.group || [];
      const childrenSlots = {};
      const slotName = `${col.field}-header`;
      if (slots[slotName]) {
        childrenSlots['header'] = (data: any) => slots[slotName]?.(data)
      };
      return  <KColumnGroup
        { ...col }
        key={col}
        resizable={true}
        v-slots={childrenSlots}
      >
        {
          group.map((item: columnConfigType) => {
            if (Array.isArray(item.group) && item.group.length) {
              return addColumnGroup(item)
            } else {
              return getTableColumn(slots, item);
            }
          })
        }
      </KColumnGroup>
    }
    function getTableColumn(slots: SlotsType, col: columnConfigType) {
      const childrenSlots = {};
      const slotName = `${col.field}-header`;
      if (slots[slotName]) {
        childrenSlots['header'] = (data: any) => slots[slotName]?.(data);
      };
      if (!col.render && (slots[col.field ?? ''] || col.showIcon) && !col.type) {
        childrenSlots['default'] =  (data: any) =>{
          const field = col.field ?? '';
          const { row } = data;
          if (slots[field]) {
            return slots[field]?.(data);
          } else if (col.showIcon) {
            const fieldLabelSlot = {};
            const fieldLabelSlotName = `${field}-label`;
            if (slots[fieldLabelSlotName]) {
              fieldLabelSlot[fieldLabelSlotName] = (data: any) => slots[fieldLabelSlotName]?.(data);
            }
            return <TableColumnContent
              key={col.field} col={col}
              row={row}
              size={props.size}
              align={props.align}
              v-slots={fieldLabelSlot}
            />
          }
        };
      }
      return <KTableColumn key={col.field} {...col} v-slots={childrenSlots} />
    }
  }
})
