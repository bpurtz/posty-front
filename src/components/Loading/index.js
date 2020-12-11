import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, CircularProgress } from '@material-ui/core'
import styles from './styles'

const Loading = ({ classes }) => {
  return (
    <div className={classes.content_wrap}>
      <CircularProgress size={30} className={classes.spinner} />
    </div>
  )
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Loading)
