import React, { useEffect, useState } from 'react'
import { withStyles, TextField, Button, IconButton } from '@material-ui/core'
import styles from './styles'
import PropTypes from 'prop-types'
import action from '../../redux/action'
import { SET_CURRENT_POST, SAVE_POST } from '../../redux/types'
import { connect } from 'react-redux'
import HeaderBar from '../../components/HeaderBar'
import Loading from '../../components/Loading'
import { ArrowBack } from '@material-ui/icons'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Post = ({ classes, match, post, posts, history }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleSave = (e) => {
    e.preventDefault()
    console.log('SAVING')
    action(SAVE_POST, {
      ...post,
      title,
      body
    })
    toast.success('Updated Post!')
  }

  const handleBack = () => {
    history.push('/feed')
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value)
  }

  useEffect(() => {
    // I can only search through the posts if they are there
    if (posts.length > 0) {
      // Need to load the desired post into the activePost state
      action(SET_CURRENT_POST, match.params.postID)
    }
  }, [match, match.params.postID, posts])

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setBody(post.body)
    }
  }, [post])

  return post ? (
    <div className={classes.content_wrap} key={post.id}>
      <HeaderBar title='Edit Your Post' />
      <IconButton onClick={handleBack} className={classes.back_button}>
        <ArrowBack />
      </IconButton>
      <form onSubmit={handleSave} className={classes.body}>
        <TextField
          onChange={handleTitleChange}
          color='primary'
          defaultValue={post.title}
          label='Title'
        />
        <TextField
          onChange={handleBodyChange}
          color='primary'
          variant='outlined'
          defaultValue={post.body}
          className={classes.body_field}
          label='Body'
          multiline
          rows={4}
        />
        <Button
          className={classes.submit_button}
          color='primary'
          variant='contained'
          type='submit'
        >
          Save
        </Button>
      </form>
    </div>
  ) : (
    <Loading />
  )
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  post: state.postState.activePost,
  posts: state.postState.posts
})

export default connect(mapStateToProps)(withStyles(styles)(Post))
