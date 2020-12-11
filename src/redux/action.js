import store from './store'

const action = (type, payload) => store.dispatch({ type, payload })

export default action
