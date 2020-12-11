import * as themes from './themes'
import { createMuiTheme } from '@material-ui/core'

// Constants that can be changed to take affect everywhere
const breakpoints = {
  sm: 709,
  md: 969,
  lg: 1280,
  xl: 1920,
  xs: 450
}

/**
@param {screenSize} String: Used to override colors 
based on the size of the screen i.e. mobile, tablet, desktop
@param {themeName} String: The string name of the theme. 
i.e. 'conformity' for the v1
*/
const makeTheme = ({ themeName = 'conformity', screenSize }) => {
  return createMuiTheme({
    tiny: `@media only screen and (max-width: ${breakpoints.xs}px)`,
    mobile: `@media only screen and (max-width: ${breakpoints.sm}px)`,
    tablet: `@media only screen and (max-width: ${breakpoints.md}px)`,
    maxContentWidth: '1440px',
    screenSize,
    mobileThreshold: breakpoints.sm,
    tabletThreshold: breakpoints.md,
    boxShadow1: 'black 2px 2px 9px -5px, black -1px 1px 9px -5px',
    palette: {
      // Get the colors based off of the theme
      primary: {
        main: themes[themeName][screenSize].Primary
          ? themes[themeName][screenSize].Primary
          : themes[themeName].Primary
      },
      secondary: {
        main: themes[themeName][screenSize].Secondary
          ? themes[themeName][screenSize].Secondary
          : themes[themeName].Secondary
      }
    },
    status: {
      danger: themes[themeName][screenSize].Error
        ? themes[themeName][screenSize].Error
        : themes[themeName].Error
    },
    overrides: {
      ...themes[themeName],
      ...themes[themeName][screenSize]
    },
    breakpoints: {
      values: breakpoints
    }
  })
}

export default makeTheme
