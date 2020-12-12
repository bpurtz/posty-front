import React from 'react'
import PropTypes from 'prop-types'
import {
  withStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core'
import styles from './styles'

const PostCard = ({ classes, post, onClick }) => {
  return (
    <Card className={classes.content_wrap}>
      <CardContent>
        <Typography variant='h3' className={classes.title}>
          {post.title}
        </Typography>
        <Typography variant='body1' className={classes.body}>
          {post.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onClick} color='primary' variant='outlined'>
          Edit Post
        </Button>
      </CardActions>
    </Card>
  )
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default withStyles(styles)(PostCard)
