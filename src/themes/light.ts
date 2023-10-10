import {createTheme} from '@shopify/restyle';

export const palette = {
  mehroon: '#C70039d4',
  lightRed: '#F94C104a',
  gold: '#ffd200',

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
