import React, { useState, useEffect } from 'react'
import styles from './styles'
import { withStyles, Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const PaginateArrows = ({
  classes,
  className = '',
  step = 1,
  forwardDisabled = false,
  setOffset
}) => {
  const [pagination, setPagination] = useState({
    first: step,
    offset: 0,
    step: step
  })

  const handlePagination = (direction) => {
    if (direction === 'forward') {
      setPagination({
        ...pagination,
        offset: pagination.offset + pagination.step
      })
    } else {
      setPagination({
        ...pagination,
        offset: pagination.offset - pagination.step
      })
    }
  }

  useEffect(() => {
    setOffset(pagination.offset)
  }, [pagination, setOffset])

  return (
    <div className={classes.pagination_wrap + ' ' + className}>
      <Button
        className='paginate-back'
        disabled={pagination.offset === 0}
        onClick={() => {
          handlePagination('back')
        }}
      >
        {'<'}
      </Button>
      <Button
        className='paginate-forward'
        disabled={forwardDisabled}
        onClick={() => {
          handlePagination('forward')
        }}
      >
        {'>'}
      </Button>
    </div>
  )
}

PaginateArrows.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  step: PropTypes.number,
  forwardDisabled: PropTypes.bool,
  setOffset: PropTypes.func.isRequired
}

export default withStyles(styles)(PaginateArrows)
