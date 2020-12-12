const styles = (theme) => ({
  content_wrap: {
    width: '15em',
    display: 'block',
    margin: 'auto',
    position: 'relative'
  },
  complete_list: {
    position: 'absolute',
    top: '100%',
    left: '0',
    display: 'grid',
    width: '100%',
    height: 'fit-content',
    maxHeight: '20em',
    overflowY: 'scroll',
    zIndex: 2
  },
  complete_item: {
    boxSizing: 'border-box',
    height: 'fit-content',
    zIndex: 3,
    margin: '0.5em'
  },
  hide: {
    display: 'none'
  },
  actionArea: {
    padding: '0.5em 1em'
  }
})

export default styles
