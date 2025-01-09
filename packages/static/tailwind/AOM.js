import colors from 'tailwindcss/colors';

const themes = {
  padding: {
    buttonSm: '0.5rem',
    buttonBase: '0.75rem'
  },
  // rounded
  borderRadius: {
    sm: '0.125',
    DEFAULT: '0.375rem', // 默认, 4px
    lg: '0.5rem'
  },
  // text, 字体大小
  fontSize: {
    sm: {
      fontSize: '0.75rem',
      lineHeight: '1rem'
    },
    base: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem'
    },
    lg: {
      fontSize: '1rem',
      lineHeight: '1.5rem'
    }
  },
  // shadow, 阴影
  boxShadow: {
    focus: '0 0 0 0.125rem  rgba(00, 00, 00, 0.08)'
  },
  colors: {
    // 主题色, 继承 blue
    primary: {
      50: colors.blue[50],
      DEFAULT: colors.blue[500],
      100: colors.blue[100],
      200: colors.blue[200],
      300: colors.blue[300],
      400: colors.blue[400],
      500: colors.blue[500],
      600: colors.blue[600],
      700: colors.blue[700],
      800: colors.blue[800],
      900: colors.blue[900],
      950: colors.blue[950]
    },
    // 辅助色--成功, 继承 green
    success: {
      50: colors.green[50],
      DEFAULT: colors.green[500],
      100: colors.green[100],
      200: colors.green[200],
      300: colors.green[300],
      400: colors.green[400],
      500: colors.green[500],
      600: colors.green[600],
      700: colors.green[700],
      800: colors.green[800],
      900: colors.green[900],
      950: colors.green[950]
    },
    // 辅助色--警告, 继承 yellow
    warning: {
      50: colors.yellow[50],
      DEFAULT: colors.yellow[500],
      100: colors.yellow[100],
      200: colors.yellow[200],
      300: colors.yellow[300],
      400: colors.yellow[400],
      500: colors.yellow[500],
      600: colors.yellow[600],
      700: colors.yellow[700],
      800: colors.yellow[800],
      900: colors.yellow[900],
      950: colors.yellow[950]
    },
    // 辅助色--危险, 继承 red
    danger: {
      50: colors.red[50],
      DEFAULT: colors.red[500],
      100: colors.red[100],
      200: colors.red[200],
      300: colors.red[300],
      400: colors.red[400],
      500: colors.red[500],
      600: colors.red[600],
      700: colors.red[700],
      800: colors.red[800],
      900: colors.red[900],
      950: colors.red[950]
    },
    // 辅助色--危险, 继承 slate
    info: {
      50: colors.slate[50],
      DEFAULT: colors.slate[500],
      100: colors.slate[100],
      200: colors.slate[200],
      300: colors.slate[300],
      400: colors.slate[400],
      500: colors.slate[500],
      600: colors.slate[600],
      700: colors.slate[700],
      800: colors.slate[800],
      900: colors.slate[900],
      950: colors.slate[950]
    },
    normal: '#38363c',
    borderColorNormal: colors.gray[300]
  },
  // screens
  screens: {
    '2xs': '768px',
    xs: '960px',
    sm: '1440px',
    base: '1920px',
    lg: '2560px',
    xl: '3008px',
    '2xl': '3840px'
  },
  extend: {}
};

export default themes;
