import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles, TextField, Typography } from '@material-ui/core'
import styles from './styles'
import HeaderBar from '../../components/HeaderBar'
import PaginateArrows from '../../components/PaginateArrows'
import PostCard from '../../components/PostCard'
import action from '../../redux/action'
import { CLEAR_REFINED_POSTS, SEARCH_POSTS } from '../../redux/types'

const postLimit = 10

const Feed = ({ classes, posts, refinedPosts, history }) => {
  // Used for pagination
  const [offset, setOffset] = useState(0)
  const [searchString, setSearchString] = useState('')
  const [forwardDisabled, setForwardDisabled] = useState(false)

  const handleSearchChange = (e) => {
    if (e.target.value.trim() === '') {
      action(CLEAR_REFINED_POSTS)
    } else {
      action(SEARCH_POSTS, e.target.value)
    }
    setSearchString(e.target.value.trim())
  }

  // Will react to changes in the postState and determine which posts to show
  useEffect(() => {
    const displayedPosts = searchString !== '' ? refinedPosts : posts
    // If there are no refinedPosts, then we know to show all posts
    if (offset + postLimit >= displayedPosts.length) {
      setForwardDisabled(true)
    } else {
      setForwardDisabled(false)
    }
  }, [offset, posts, refinedPosts, searchString])

  return (
    <div className={classes.content_wrap}>
      <HeaderBar title='Feed' />
      <TextField
        placeholder='Search By Title'
        onChange={handleSearchChange}
        className={classes.search_field}
      />
      <PaginateArrows
        forwardDisabled={forwardDisabled}
        step={postLimit}
        setOffset={setOffset}
      />
      <div className={classes.post_feed}>
        {refinedPosts.length === 0 && searchString !== '' ? (
          <Typography variant='h5'>No Posts Found</Typography>
        ) : searchString === '' ? (
          posts
            .slice(offset, offset + postLimit)
            .map((post, i) => (
              <PostCard
                onClick={() => history.push(`/post/${post.id}`)}
                post={post}
                key={i}
              />
            ))
        ) : (
          refinedPosts
            .slice(offset, offset + postLimit)
            .map((post, i) => (
              <PostCard
                onClick={() => history.push(`/post/${post.id}`)}
                post={post}
                key={i}
              />
            ))
        )}
      </div>
    </div>
  )
}

Feed.propTypes = {
  classes: PropTypes.object,
  posts: PropTypes.array.isRequired,
  refinedPosts: PropTypes.array.isRequired,
  history: PropTypes.object
}

export default withStyles(styles)(Feed)
