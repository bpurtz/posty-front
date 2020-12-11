const styles = (theme) => ({
  content_wrap: {
    background: theme.palette.primary.main,
    padding: '1em'
  },
  title: {
    fontSize: '2.5em',
    color: theme.palette.getContrastText(theme.palette.primary.main)
  }
})

export default styles
