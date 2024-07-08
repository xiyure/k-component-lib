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
    },
    cellStyle: {
      type: [Object, Function],
      default: () => {}
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
      return  <KColumnGroup
        { ...col }
        resizable={true}
      >
        {
          group.map((item) => {
            if (Array.isArray(item.group) && item.group.length) {
              return addColumnGroup(item)
            } else {
              return <KTableColumn {...item}></KTableColumn>
            }
          })
        }
      </KColumnGroup>
    }
    function getTableColumn(slots, col) {
      if (!col.render) {
        return <KTableColumn {...col}>
        {
         (data) =>{
           const field = col.field ?? '';
           const { row } = data;
           if (slots[field]) {
             return slots[field]?.(data);
           } else if (!col.render && !col.type) {
               return <TableColumnContent col={col} row={row} size={props.size} cellStyle={props.cellStyle} />
           }
         }
        }
        </KTableColumn>
      } else {
        return <KTableColumn {...col} />
      }
    }
  }
})
