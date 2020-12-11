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
import { withRouter } from 'react-router-dom'

const PostCard = ({ classes, post, history }) => {
  const handleButtonClick = () => {
    history.push(`/post/${post.id}`)
  }

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
        <Button onClick={handleButtonClick} color='primary' variant='outlined'>
          Edit Post
        </Button>
      </CardActions>
    </Card>
  )
}

PostCard.propTypes = {
  classes: PropTypes.object,
  post: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(withStyles(styles)(PostCard))
