import React, { useState, useEffect, lazy, Suspense } from 'react'
import { MuiThemeProvider, useMediaQuery } from '@material-ui/core'
import PropTypes from 'prop-types'
import makeTheme from './makeTheme'
const ThemeProvider = lazy(() => import('@material-ui/styles/ThemeProvider'))
// TODO: Changing this variable should update the theme. Move into redux
const theme = 'conformity'

const Theme = ({ children }) => {
  const isMobile = useMediaQuery('@media only screen and (max-width: 709px)')
  const isTablet = useMediaQuery(
    '@media only screen and (max-width: 969px) and (min-width: 709px)'
  )
  const isDesktop = useMediaQuery('@media only screen and (min-width: 969px)')
  const [muiTheme, setMuiTheme] = useState(
    makeTheme({
      themeName: theme,
      screenSize: isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile'
    })
  )

  // Recreate the theme with new colors when screen size changes
  useEffect(() => {
    setMuiTheme(
      makeTheme({
        themeName: theme,
        screenSize: isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile'
      })
    )
  }, [isMobile, isTablet, isDesktop])

  return (
    muiTheme && (
      <Suspense fallback={<div />}>
        <MuiThemeProvider theme={muiTheme}>
          <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
        </MuiThemeProvider>
      </Suspense>
    )
  )
}

Theme.propTypes = {
  children: PropTypes.any
}

export default Theme
