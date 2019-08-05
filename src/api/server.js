import React from 'react'
import axios from 'axios'
import { message } from 'antd'
import { baseURL } from '@/utils/commons'
import { createHashHistory } from 'history'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
let config = {
  baseURL: baseURL(),
  withCredentials: true
}
const instance = axios.create(config)
class Server extends React.Component {
  bindAccessToken(params) {
    let accessToken = sessionStorage.getItem('token')
      ? sessionStorage.getItem('token')
      : null
    accessToken && (params['adminToken'] = accessToken)
  }
  resolveResponse(data, resolve) {
    switch (data.code) {
      case '01':
        message.error(data.message)
        break
      case '401':
        message.error(data.message)
        if (createHashHistory().location.pathname !== '/login') {
          //这里必须限制为非login页面
          createHashHistory().replace('/login')
        }
        break
      case '403':
        message.error(data.message)
        createHashHistory().replace('/403')
        break
      default:
        resolve(data)
        break
    }
  }

  rejectResponse(data, reject) {
    if (data.response) {
      switch (data.response.status) {
        case 500:
          message.error(data.message)
          break
        default:
          reject(data)
          break
      }
    } else {
      reject(data)
    }
  }
  $httpGet(url, params) {
    this.bindAccessToken(params)
    return new Promise((resolve, reject) => {
      instance
        .get(url, {
          params: params
        })
        .then(({ data }) => {
          this.resolveResponse(data, resolve)
        })
        .catch(data => {
          this.rejectResponse(data, reject)
        })
    })
  }

  $httpPost(url, params, isFormData) {
    this.bindAccessToken(params)
    params = qs.stringify(params)
    return new Promise((resolve, reject) => {
      instance
        .post(url, params)
        .then(({ data }) => {
          this.resolveResponse(data, resolve)
        })
        .catch(data => {
          this.rejectResponse(data, reject)
        })
    })
  }
}
export default Server
