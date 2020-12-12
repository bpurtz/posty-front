const styles = (theme) => ({
  content_wrap: {
    width: '100%',
    height: '100%'
  },
  search_field: {
    display: 'block',
    width: 'fit-content',
    margin: '0.75em auto 0em'
  },
  post_feed: {
    display: 'flex',
    flexFlow: 'row wrap',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0em 3em',
    justifyContent: 'center'
  },
  [theme.mobile]: {
    post_feed: {
      padding: '0em 0.25em'
    }
  }
})

export default styles
