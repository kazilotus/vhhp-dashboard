import React, { Component } from 'react'
import Dashboard from './components/dashboard/Dashboard'
import 'antd/dist/antd.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.0.11:5000/'

export class App extends Component {
  render() {
    return (
      <>
        <Dashboard />
      </>
    )
  }
}

export default App
