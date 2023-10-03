import {createTheme} from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB', // '#900C3F', '#C70039', '#F94C10', '#F8DE22',
  mehroon: '#C70039d4',
  lightRed: '#F94C104a',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

const theme = createTheme({
  colors: {
    $primary: palette.lightRed,
    white: palette.white,
    black: palette.black,
    mehroon: palette.mehroon,

    // -------------
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
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
