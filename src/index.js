import React from 'react'
import ReactDOM from 'react-dom'
import Route from './router'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '@/store'
import './assets/commom.styl'
import 'antd/dist/antd.css'
import './index.styl'
import * as serviceWorker from './serviceWorker'
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route />
    </Router>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
