// import warning from 'warning';

export const easing = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
};

export const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195
};

export const formatMs = (milliseconds) => `${Math.round(milliseconds)}ms`;
export const isString = (value) => typeof value === 'string';
export const isNumber = (value) => !isNaN(parseFloat(value));
export default {
  easing,
  duration,
  create: (props = ['all'], options = {}) => {
    const { duration: durationOption = duration.standard, easing: easingOption = easing.easeInOut, delay = 0, ...other } = options;

    // warning(
    //   isString(props) || Array.isArray(props),
    //   'Material-UI: argument "props" must be a string or Array.'
    // )
    // warning(
    //   isNumber(durationOption) || isString(durationOption),
    //   `Material-UI: argument "duration" must be a number or a string but found ${durationOption}.`
    // )
    // warning(
    //   isString(easingOption),
    //   'Material-UI: argument "easing" must be a string.'
    // )
    // warning(
    //   isNumber(delay) || isString(delay),
    //   'Material-UI: argument "delay" must be a number or a string.'
    // )
    // warning(
    //   Object.keys(other).length === 0,
    //   `Material-UI: unrecognized argument(s) [${Object.keys(other).join(',')}]`
    // )

    return (Array.isArray(props) ? props : [props])
      .map(
        (animatedProp) =>
          `${animatedProp} ${typeof durationOption === 'string' ? durationOption : formatMs(durationOption)} ${easingOption} ${
            typeof delay === 'string' ? delay : formatMs(delay)
          }`
      )
      .join(',');
  },
  getAutoHeightDuration(height) {
    if (!height) {
      return 0;
    }
    const constant = height / 36;
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
  }
};
