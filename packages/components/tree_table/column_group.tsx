import { defineComponent } from 'vue';
import { KTableColumn, KColumnGroup } from '../table';
import TableColumnContent from './table_column_content.vue';
import { ColumnConfig } from './type';

type SlotsType = {
  [key: string]: any;
}
const SLOT_NAMES: string[] = ['header', 'edit'];
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
    function addColumnGroup(col: ColumnConfig) {
      const group = col.group || [];
      const childrenSlots = getChildrenSlots(slots, col.field );
      return  <KColumnGroup
        { ...col }
        key={col}
        resizable={true}
        v-slots={childrenSlots}
      >
        {
          group.map((item: ColumnConfig) => {
            if (Array.isArray(item.group) && item.group.length) {
              return addColumnGroup(item)
            } else {
              return getTableColumn(slots, item);
            }
          })
        }
      </KColumnGroup>
    }
    function getTableColumn(slots: SlotsType, col: ColumnConfig) {
      const childrenSlots = getChildrenSlots(slots, col.field);
      if (!col.render && (slots[col.field ?? ''] || col.showIcon) && !col.type) {
        childrenSlots['default'] =  (data: any) =>{
          const field = col.field ?? '';
          const { row } = data;
          if (slots[field]) {
            return slots[field]?.(data);
          } else if (col.showIcon) {
            const fieldLabelSlot: SlotsType = {};
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
    function getChildrenSlots(slots: SlotsType, fieldName: string | undefined) {
      if (!fieldName) {
        return {};
      }
      const childrenSlots: SlotsType = {};
      for (const name of SLOT_NAMES) {
        const slotName = `${fieldName}-${name}`;
        if (slots[slotName]) {
          childrenSlots[name] = (data: any) => slots[slotName]?.(data);
        }
      }
      return childrenSlots;
    }
  }
})
