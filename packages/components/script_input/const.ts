export const checkInputMessage = {
  string: '请按照变量规则命名',
  boolean: '必须输入布尔值',
  number: '必须输入数字',
  tooltip:
    '1.名称只能是中文、英文、数字和下划线。<br/>2.名称不能以数字开头。<br>3.名称不能仅由下划线和数字组成。',
};

export const typeRules = new Map([
  [
    'string',
    { reg: /^(?!\d)(?![_\d]+$)[\u4e00-\u9fa5A-Za-z0-9_]+$/, message: checkInputMessage.string },
  ],
  ['number', { reg: /^-?\d+(\.\d+)?$/, message: checkInputMessage.number }],
  ['boolean', { reg: /^(true|false)$/, message: checkInputMessage.boolean }],
]);

export const TAG_TYPES = {
  string: 'fx_string',
  number: 'fx_number',
  boolean: 'fx_boolean'
}
