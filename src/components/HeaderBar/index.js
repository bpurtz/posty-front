import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Typography } from '@material-ui/core'
import styles from './styles'

const HeaderBar = ({ classes, title }) => {
  return (
    <div className={classes.content_wrap}>
      <Typography align='center' className={classes.title} variant='h1'>
        {title}
      </Typography>
    </div>
  )
}

HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
  /**
   * @description This prop is used to display a title within the header bar.
   */
  title: PropTypes.string.isRequired
}

export default withStyles(styles)(HeaderBar)
