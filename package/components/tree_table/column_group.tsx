import { defineComponent, Fragment } from 'vue';
import { KTableColumn, KColumnGroup } from '../table';
import TableColumnContent from './table_column_content.vue';
import { columnConfigType } from './type.d';

export default defineComponent({
  name: 'ColumnGroup',
  props: {
    data: Array,
    column: {
      type: Array<columnConfigType>,
      default: []
    },
    size: {
      type: String,
      default: 'default'
    }

  },
  setup(props, { slots }) {
    return () => (
      <Fragment>
          {
           props.column.map((col) => {
              if (!col) {
                return;
              } else if (Array.isArray(col.group) && col.group.length) {
                return addColumnGroup(col);
              } else {
                return getTableColumn(slots, col);
              }
            })
          }
      </Fragment>
    )
    function addColumnGroup(col) {
      const group = col.group || [];
      const childrenSlots = {};
      const slotName = `${col.field}-header`;
      if (slots[slotName]) {
        childrenSlots['header'] = (data) => slots[slotName]?.(data)
      };
      return  <KColumnGroup
        { ...col }
        key={col}
        resizable={true}
        v-slots={childrenSlots}
      >
        {
          group.map((item) => {
            if (Array.isArray(item.group) && item.group.length) {
              return addColumnGroup(item)
            } else {
              return getTableColumn(slots, item);
            }
          })
        }
      </KColumnGroup>
    }
    function getTableColumn(slots, col) {
      const childrenSlots = {};
      const slotName = `${col.field}-header`;
      if (slots[slotName]) {
        childrenSlots['header'] = (data) => slots[slotName]?.(data);
      };
      if (!col.render) {
        childrenSlots['default'] =  (data) =>{
          const field = col.field ?? '';
          const { row } = data;
          if (slots[field]) {
            return slots[field]?.(data);
          } else if (!col.render && !col.type) {
              return <TableColumnContent key={col.field} col={col} row={row} size={props.size} />
          }
        };
      }
      return <KTableColumn key={col.field} {...col} v-slots={childrenSlots} />
    }
  }
})
