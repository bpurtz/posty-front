import React, { lazy, Suspense, useEffect } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import Theme from './components/Theme'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import pagesSpecs from './pages'
import action from './redux/action'
import { INIT_POSTS } from './redux/types'
import { ToastContainer } from 'react-toastify'
import Loading from './components/Loading'

const pages = pagesSpecs.map((spec) => ({
  Component: lazy(() => import(`./pages/${spec.name}`)),
  options: {
    key: spec.name,
    path: spec.path,
    exact: !spec.isSubrouter
  }
}))

function App() {
  useEffect(() => {
    action(INIT_POSTS)
  })
  return (
    <Provider store={store}>
      <Theme>
        <Suspense fallback={<Loading />}>
          <ToastContainer
            position='bottom-right'
            closeOnClick
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
            bodyClassName='srf-toast-body'
          />
          <div className='App'>
            <Router>
              <Switch>
                {pages.map((page, i) => (
                  <Route component={page.Component} {...page.options} />
                ))}
                <Redirect to='/feed' />
              </Switch>
            </Router>
          </div>
        </Suspense>
      </Theme>
    </Provider>
  )
}

export default App
