const keys: Array<UpKey> = ['xs', 'sm', 'md', 'lg', 'xl'];

type UpKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Breakpoints {
  keys: Array<UpKey>;
  values: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  up: (key: UpKey) => string;
  down: (key: UpKey) => string;
  between: (start: UpKey, end: UpKey) => string;
  only: (key: UpKey) => string;
  width: (key: UpKey) => number;
}

function createBreakpoints(): Breakpoints {
  const values = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  };
  const unit = 'px';
  const step = 5;

  function up(key: UpKey) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key: UpKey) {
    const endIndex = keys.indexOf(key) + 1;
    if (endIndex === keys.length) {
      return up('xs');
    }

    if (endIndex === 0) {
      throw Error(`the key must be one of [ ${keys.join(' , ')} ]`);
    }

    const upperbound = values[keys[endIndex]];
    return `@media (max-width:${upperbound - step / 100}${unit})`;
  }

  function between(start: UpKey, end: UpKey) {
    const endIndex = keys.indexOf(end) + 1;

    if (endIndex === keys.length) {
      return up(start);
    }

    return `@media (min-width:${values[start]}${unit}) and ` + `(max-width:${values[keys[endIndex]] - step / 100}${unit})`;
  }

  function only(key: UpKey) {
    return between(key, key);
  }

  function width(key: UpKey) {
    return values[key];
  }

  return {
    keys,
    values,
    up,
    down,
    between,
    only,
    width
  };
}

function createMixins(breakpoints: Breakpoints, spacing: Spacing) {
  return {
    gutters: (styles: any = {}) => ({
      paddingLeft: spacing(2),
      paddingRight: spacing(2),
      ...styles,
      [breakpoints.up('sm')]: {
        paddingLeft: spacing(3),
        paddingRight: spacing(3),
        ...styles[breakpoints.up('sm')]
      }
    }),
    toolbar: {
      minHeight: 56,
      [`${breakpoints.up('xs')} and (orientation: landscape)`]: {
        minHeight: 48
      },
      [breakpoints.up('sm')]: {
        minHeight: 64
      }
    }
  };
}

const indigo = {
  50: '#e8eaf6',
  100: '#c5cae9',
  200: '#9fa8da',
  300: '#7986cb',
  400: '#5c6bc0',
  500: '#3f51b5',
  600: '#3949ab',
  700: '#303f9f',
  800: '#283593',
  900: '#1a237e',
  A100: '#8c9eff',
  A200: '#536dfe',
  A400: '#3d5afe',
  A700: '#304ffe'
};

const pink = {
  50: '#fce4ec',
  100: '#f8bbd0',
  200: '#f48fb1',
  300: '#f06292',
  400: '#ec407a',
  500: '#e91e63',
  600: '#d81b60',
  700: '#c2185b',
  800: '#ad1457',
  900: '#880e4f',
  A100: '#ff80ab',
  A200: '#ff4081',
  A400: '#f50057',
  A700: '#c51162'
};
interface Grey {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}
const grey: Grey = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#d5d5d5',
  A200: '#aaaaaa',
  A400: '#303030',
  A700: '#616161'
};

const red = {
  50: '#ffebee',
  100: '#ffcdd2',
  200: '#ef9a9a',
  300: '#e57373',
  400: '#ef5350',
  500: '#f44336',
  600: '#e53935',
  700: '#d32f2f',
  800: '#c62828',
  900: '#b71c1c',
  A100: '#ff8a80',
  A200: '#ff5252',
  A400: '#ff1744',
  A700: '#d50000'
};

const common = {
  black: '#000',
  white: '#fff'
};

function clamp(value: number, min = 0, max = 1) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function convertHexToRGB(color: string) {
  color = color.substr(1);

  const re = new RegExp(`.{1,${color.length / 3}}`, 'g');
  let colors = color.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }

  return colors ? `rgb(${colors.map((n) => parseInt(n, 16)).join(', ')})` : '';
}

function rgbToHex(color: string) {
  if (color.indexOf('#') === 0) {
    return color;
  }
  function intToHex(c: number) {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  let values = decomposeColor(color).values.map((n: number) => intToHex(n));

  return `#${values.join('')}`;
}
interface DecomposeColor {
  type: string;
  values: Array<number>;
}

function decomposeColor(color: string): DecomposeColor {
  if (color.charAt(0) === '#') {
    return decomposeColor(convertHexToRGB(color));
  }

  const marker = color.indexOf('(');
  const type = color.substring(0, marker);
  let valuess: Array<string> = color.substring(marker + 1, color.length - 1).split(',');
  const values = valuess.map((value) => parseFloat(value));

  return { type, values };
}

function recomposeColor(color: DecomposeColor) {
  const { type } = color;
  let values: Array<string | number> = color.values;

  if (type.indexOf('rgb') !== -1) {
    values = color.values.map((n, i) => (i < 3 ? parseInt(n + '', 10) : n));
  }

  if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }

  return `${color.type}(${values.join(', ')})`;
}

function getContrastRatio(foreground: string, background: string) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

function getLuminance(color: string) {
  const decomposedColor = decomposeColor(color);

  if (decomposedColor.type.indexOf('rgb') !== -1) {
    const rgb = decomposedColor.values.map((val) => {
      val /= 255;
      return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
    });
    return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
  }

  return decomposedColor.values[2] / 100;
}

function emphasize(color: string, coefficient = 0.15) {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}

function fade(color: string, value: number) {
  if (!color) return color;

  let colorObj = decomposeColor(color);
  value = clamp(value);

  if (colorObj.type === 'rgb' || colorObj.type === 'hsl') {
    colorObj.type += 'a';
  }
  colorObj.values[3] = value;

  return recomposeColor(colorObj);
}

function darken(color: string, coefficient: number) {
  if (!color) return color;

  let colorObj = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (colorObj.type.indexOf('hsl') !== -1) {
    colorObj.values[2] *= 1 - coefficient;
  } else if (colorObj.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      colorObj.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(colorObj);
}

function lighten(color: string, coefficient: number) {
  if (!color) return color;

  let colorObj = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (colorObj.type.indexOf('hsl') !== -1) {
    colorObj.values[2] += (100 - colorObj.values[2]) * coefficient;
  } else if (colorObj.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      colorObj.values[i] += (255 - colorObj.values[i]) * coefficient;
    }
  }

  return recomposeColor(colorObj);
}

const light = {
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)'
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  background: {
    paper: common.white,
    default: grey[50]
  },
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(0, 0, 0, 0.14)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)'
  }
};

const dark = {
  text: {
    primary: common.white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    hint: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)'
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: grey[800],
    default: '#303030'
  },
  action: {
    active: common.white,
    hover: 'rgba(255, 255, 255, 0.1)',
    hoverOpacity: 0.1,
    selected: 'rgba(255, 255, 255, 0.2)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)'
  }
};

function addLightOrDark(intent: any, direction: string, shade: number, tonalOffset: number) {
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = lighten(intent.main, tonalOffset);
    } else if (direction === 'dark') {
      intent.dark = darken(intent.main, tonalOffset * 1.5);
    }
  }
}

interface themePalette {
  contrastText: string;
  dark: string;
  light: string;
  main: string;
}

// interface A {
//   text: {
//     primary: string;
//     secondary: string;
//     disabled: string;
//     hint: string;
//   };
//   divider: string;
//   background: {
//     paper: string;
//     default: string;
//   };
//   action: {
//     active: string;
//     hover: string;
//     hoverOpacity: number;
//     selected: string;
//     disabled: string;
//     disabledBackground: string;
//   };
//   tonalOffset: any;
// }
interface Palette {
  common: any;
  type: 'light' | 'dark';
  grey: Grey;
  primary: themePalette;
  secondary: themePalette;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
    icon?: string;
  };
  error: themePalette;
  background: {
    default: string;
    paper: string;
  };
  getContrastText: (background: string) => string;
}
function createPalette(palette: any): Palette {
  const {
    primary = {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700]
    },
    secondary = {
      light: pink.A200,
      main: pink.A400,
      dark: pink.A700
    },
    error = {
      light: red[300],
      main: red[500],
      dark: red[700]
    },
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette;

  const type: 'dark' | 'light' = palette.type || 'light';

  function getContrastText(background: string) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;

    return contrastText;
  }

  function augmentColor(
    color: any,
    mainShade: number | string = 500,
    lightShade: number | string = 300,
    darkShade: number | string = 700
  ): themePalette {
    color = { ...color };
    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }

    addLightOrDark(color, 'light', Number(lightShade), tonalOffset);
    addLightOrDark(color, 'dark', Number(darkShade), tonalOffset);
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }

    return color;
  }

  const types = { dark, light };

  const paletteOutput = {
    common,
    type,
    primary: augmentColor(primary),
    secondary: augmentColor(secondary, 'A400', 'A200', 'A700'),
    error: augmentColor(error),
    grey,
    contrastThreshold,
    getContrastText,
    augmentColor,
    tonalOffset,
    ...types[type]
  };

  return paletteOutput;
}

function round(value: number) {
  return Math.round(value * 1e5) / 1e5;
}

const caseAllCaps = {
  textTransform: 'uppercase'
};
const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';

function createTypography(palette: any, typography: any) {
  const {
    fontFamily = defaultFontFamily,
    fontSize = 14, // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    htmlFontSize = 16,
    allVariants
  } = typeof typography === 'function' ? typography(palette) : typography;

  const coef = fontSize / 14;
  const pxToRem = (size: number) => `${(size / htmlFontSize) * coef}rem`;
  const buildVariant = (fontWeight: number, size: number, lineHeight: number, letterSpacing: number, casing: any = {}) => ({
    color: palette.text.primary,
    fontFamily,
    fontWeight,
    fontSize: pxToRem(size),
    lineHeight,
    ...(fontFamily === defaultFontFamily ? { letterSpacing: `${round(letterSpacing / size)}em` } : {}),
    ...casing,
    ...allVariants
  });

  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.04, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.17, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.33, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.5, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps)
  };

  return {
    pxToRem,
    round,
    fontFamily,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    ...variants
  };
}

const shadowKeyUmbraOpacity = 0.2;
const shadowKeyPenumbraOpacity = 0.14;
const shadowAmbientShadowOpacity = 0.12;

function createShadow(...px: Array<number>) {
  return [
    `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`,
    `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`,
    `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`
  ].join(',');
}

const shadows = [
  'none',
  createShadow(0, 1, 3, 0, 0, 1, 1, 0, 0, 2, 1, -1),
  createShadow(0, 1, 5, 0, 0, 2, 2, 0, 0, 3, 1, -2),
  createShadow(0, 1, 8, 0, 0, 3, 4, 0, 0, 3, 3, -2),
  createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
  createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
  createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
  createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
  createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
  createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
  createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
  createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
  createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
  createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
  createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
  createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
  createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
  createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
  createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
  createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
  createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
  createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
  createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
  createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
  createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)
];

const shape = {
  borderRadius: 4
};

interface Spacing {
  (...args: Array<number>): string | number;
  mui: boolean;
}

function createSpacing(spacingInput = 8): Spacing {
  let transform = (factor: number) => {
    return spacingInput * factor;
  };

  const spacing = (...args: Array<any>) => {
    if (args.length === 1) {
      return transform(args[0]);
    }

    return args
      .map((factor) => {
        const output = transform(factor);
        return typeof output === 'number' ? `${output}px` : output;
      })
      .join(' ');
  };

  Object.defineProperty(spacing, 'unit', {
    get: () => {
      return spacingInput;
    }
  });

  spacing.mui = true;
  return spacing;
}

// import transitions from './transitions';
// import warning from 'warning';

const easing = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
};

const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195
};

const formatMs = (milliseconds: number) => `${Math.round(milliseconds)}ms`;

const transitions = {
  easing,
  duration,
  create: (props = ['all'], options: any = {}) => {
    const { duration: durationOption = duration.standard, easing: easingOption = easing.easeInOut, delay = 0, ...other } = options;

    return (Array.isArray(props) ? props : [props])
      .map(
        (animatedProp) =>
          `${animatedProp} ${typeof durationOption === 'string' ? durationOption : formatMs(durationOption)} ${easingOption} ${
            typeof delay === 'string' ? delay : formatMs(delay)
          }`
      )
      .join(',');
  },
  getAutoHeightDuration(height: number | undefined) {
    if (!height) {
      return 0;
    }
    const constant = height / 36;
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
  }
};
const zIndex = {
  mobileStepper: 1000,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};

interface Options {
  breakpoints?: any;
  mixins?: any;
  palette?: any;
  shadows?: any;
  spacing?: any;
  typography?: any;
}

function createTheme(options: Options = {}) {
  const { palette: paletteInput = {}, shadows: shadowsInput, spacing: spacingInput, typography: typographyInput = {} } = options;

  const palette = createPalette(paletteInput);
  const breakpoints = createBreakpoints();
  const spacing = createSpacing(spacingInput);

  const theme = {
    breakpoints,
    direction: 'ltr',
    mixins: createMixins(breakpoints, spacing),
    overrides: {},
    palette,
    props: {},
    shadows: shadowsInput || shadows,
    typography: createTypography(palette, typographyInput),
    spacing,
    shape,
    transitions,
    zIndex
  };

  return theme;
}

export default createTheme;
