import {createTheme} from '@shopify/restyle';

export const palette = {
  // purpleLight: '#8C6FF7',
  // purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB', // '#900C3F', '#C70039', '#F94C10', '#F8DE22',
  mehroon: '#C70039d4',
  lightRed: '#F94C104a',
  yellow: '#F8DE22',

  // greenLight: '#56DCBA',
  // greenPrimary: '#0ECD9D',
  // greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#FFFFFF',
  whiteMilk: '#F0F2F3',
};

const theme = createTheme({
  colors: {
    $primary: palette.mehroon,
    $lightRed: palette.lightRed,
    $whiteMilk: palette.whiteMilk,
    white: palette.white,
    black: palette.black,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
      color: 'black',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      fontSize: 16,
      lineHeight: 24,
      color: 'black',
    },
  },
});

export type Theme = typeof theme;
export default theme;
