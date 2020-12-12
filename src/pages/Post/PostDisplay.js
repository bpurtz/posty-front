import React, { useEffect, useState } from 'react'
import { withStyles, TextField, Button, IconButton } from '@material-ui/core'
import styles from './styles'
import PropTypes from 'prop-types'
import action from '../../redux/action'
import {
  SET_CURRENT_POST,
  SAVE_POST,
  SEARCH_POSTS,
  CLEAR_REFINED_POSTS
} from '../../redux/types'
import HeaderBar from '../../components/HeaderBar'
import AutoComplete from '../../components/AutoComplete'
import { ArrowBack } from '@material-ui/icons'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Post = ({ classes, match, post, posts, potentialPosts, history }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleSave = (e) => {
    e.preventDefault()
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

  const handleBodyChange = (e) => {
    setBody(e.target.value)
  }

  const handleSearchTitleChange = (e) => {
    if (e.target.value.trim() === '') {
      action(CLEAR_REFINED_POSTS)
    } else {
      setTitle(e.target.value)
      action(SEARCH_POSTS, e.target.value)
    }
  }

  const handleAutocompleteSelection = (post) => {
    action(SET_CURRENT_POST, post.id)
    action(CLEAR_REFINED_POSTS)
    history.push(`/post/${post.id}`)
  }

  // Used to search for the current post if there is a postID
  useEffect(() => {
    // I can only search through the posts if they are there
    if (posts.length > 0 && match.params.postID !== undefined) {
      // Need to load the desired post into the activePost state
      action(SET_CURRENT_POST, match.params.postID)
    }
  }, [match, match.params.postID, posts])

  // Used to update the title and body that will be saved
  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setBody(post.body)
    }
  }, [post])

  return (
    <div className={classes.content_wrap} key={post ? post.id : ''}>
      <HeaderBar title='Edit Your Post' />
      <IconButton onClick={handleBack} className={classes.back_button}>
        <ArrowBack />
      </IconButton>
      <form onSubmit={handleSave} className={classes.body}>
        <AutoComplete
          onChange={handleSearchTitleChange}
          potentialSelections={potentialPosts}
          onSelect={handleAutocompleteSelection}
          defaultValue={post ? post.title : ''}
          color='primary'
          label='Title'
        />
        <TextField
          onChange={handleBodyChange}
          color='primary'
          variant='outlined'
          defaultValue={post ? post.body : ''}
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
  )
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  post: PropTypes.object,
  posts: PropTypes.array.isRequired,
  potentialPosts: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
}

export default withStyles(styles)(Post)
