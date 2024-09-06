export const dateTypeOptions = [
  {
    label: 'exactDate',
    value: 'date'
  },
  {
    label: 'dateRange',
    value: 'range'
  },
  {
    label: 'today',
    value: 'today'
  },
  {
    label: 'tomorrow',
    value: 'tomorrow'
  },
  {
    label: 'yesterday',
    value: 'yesterday'
  },
  {
    label: 'thisWeek',
    value: 'current-week'
  },
  {
    label: 'lastWeek',
    value: 'last-week'
  },
  {
    label: 'thisMonth',
    value: 'current-month'
  },
  {
    label: 'lastMonth',
    value: 'last-month'
  },
  {
    label: 'withinThePastSevenDays',
    value: 'past-seven-days'
  },
  {
    label: 'withinThePastThirtyDays',
    value: 'past-thirty-days'
  }
];
export const logicOptions = [
  {
    type: 'number',
    logicList: [
      {
        logic: 'equal',
        handler(a: number, b: number) {
          return Number(a) === Number(b);
        }
      },
      {
        logic: 'gt',
        handler(a: number, b: number) {
          return Number(a) > Number(b);
        }
      },
      {
        logic: 'lt',
        handler(a: number, b: number) {
          return Number(a) < Number(b);
        }
      },
      {
        logic: 'gte',
        handler(a: number, b: number) {
          return Number(a) >= Number(b);
        }
      },
      {
        logic: 'lte',
        handler(a: number, b: number) {
          return Number(a) <= Number(b);
        }
      },
      {
        logic: 'notEqual',
        handler(a: number, b: number) {
          return Number(a) !== Number(b);
        }
      },
      {
        logic: 'empty',
        handler(a: number) {
          return a === undefined || a === null || !a.toString();
        }
      },
      {
        logic: 'nonEmpty',
        handler(a: number) {
          return !(a === undefined || a === null || !a.toString());
        }
      }
    ]
  },
  {
    type: 'string',
    logicList: [
      {
        logic: 'equal',
        handler(a: string, b: string) {
          return a === b;
        }
      },
      {
        logic: 'notEqual',
        handler(a: string, b: string) {
          return a !== b;
        }
      },
      {
        logic: 'contain',
        handler(a: string, b: string) {
          return a.includes(b);
        }
      },
      {
        logic: 'empty',
        handler(a: string) {
          return !a;
        }
      },
      {
        logic: 'nonEmpty',
        handler(a: string) {
          return a;
        }
      }
    ]
  },
  {
    type: 'date',
    logicList: [
      {
        logic: 'equal',
        handler(a: string | Date, b: string | Date | any[]) {
          if (Array.isArray(b)) {
            return getTime(a) > getTime(b[0]) && 
              getTime(a) < getTime(b[1]);
          }
          return getTime(a) === getTime(b);
        }
      },
      {
        logic: 'before',
        handler(a: string, b: string) {
          return getTime(a) < getTime(b);
        }
      },
      {
        logic: 'after',
        handler(a: string, b: string) {
          return getTime(a) > getTime(b);
        }
      },
      {
        logic: 'empty',
        handler(a: string) {
          return !a;
        }
      },
      {
        logic: 'nonEmpty',
        handler(a: string) {
          return a;
        }
      }
    ]
  }
];

function getTime(d: string | Date) {
  if (d instanceof Date) {
    return d.getTime();
  }
  return new Date(d).getTime();
}