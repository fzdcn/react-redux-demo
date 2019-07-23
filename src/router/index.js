import React, { Component } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import asyncComponent from '@/utils/asyncComponent'
const login = asyncComponent(() => import('@/pages/login/Login'))
const index = asyncComponent(() => import('@/pages/index/Index'))
const about = asyncComponent(() => import('@/pages/about/About'))
const nothing = asyncComponent(() => import('@/pages/nothing/Nothing'))
let Routers = [
  {
    path: '/index',
    name: 'index',
    component: index,
    auth: true
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/',
    name: 'index',
    component: index,
    auth: true
  },
  {
    path: '/404',
    name: '404',
    component: nothing
  }
]
class RouteConfig extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      token: props.token
    }
  }
  render() {
    return (
      <div className="router">
        <HashRouter>
          <Switch>
            {Routers.map((item, index) => {
              return (
                <Route
                  key={index}
                  path={item.path}
                  name={item.name}
                  exact
                  render={props =>
                    !item.auth ? (
                      <item.component {...props} />
                    ) : this.state.token ? (
                      <item.component {...props} />
                    ) : (
                      <Redirect
                        to={{
                          pathname: '/login',
                          state: { from: props.location }
                        }}
                      />
                    )
                  }
                />
              )
            })}
            <Route component={nothing} />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { token: state.userReducer.token }
}
export default connect(mapStateToProps)(RouteConfig)
