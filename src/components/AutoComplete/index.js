import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  withStyles,
  Typography,
  TextField,
  Card,
  CardActionArea,
  ClickAwayListener
} from '@material-ui/core'
import styles from './styles'

const AutoComplete = ({
  classes,
  onChange,
  potentialSelections,
  onSelect,
  ...props
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
      <div className={classes.content_wrap}>
        <TextField
          onFocus={() => setShowDropdown(true)}
          {...props}
          onChange={onChange}
          fullWidth
        />
        <div
          className={`${classes.complete_list} ${
            showDropdown ? '' : classes.hide
          }`}
        >
          {potentialSelections.map((s, i) => (
            <Card
              raised
              onClick={() => onSelect(s)}
              className={classes.complete_item}
              key={i}
            >
              <CardActionArea className={classes.action_area}>
                <Typography variant='subtitle1' align='center'>
                  {s.title}
                </Typography>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </ClickAwayListener>
  )
}

AutoComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  /**
   * The main update function that should change the potentialStrings provided
   */
  onChange: PropTypes.func.isRequired,
  /**
   * An array of objects. Objects should contain a title that will be displayed. The rest of the object will be returned if item is selected
   */
  potentialSelections: PropTypes.array.isRequired,
  /**
   * Will be called when a string is selected with the string as an argument
   */
  onSelect: PropTypes.func.isRequired,
  /**
   * An object of potential props for the textField.
   */
  props: PropTypes.object
}

export default withStyles(styles)(AutoComplete)
