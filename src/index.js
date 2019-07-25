import React from 'react'
import ReactDOM from 'react-dom'
import Route from '@/router/Index'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from '@/store'
import 'antd/dist/antd.css'
import './assets/commom.styl'
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
