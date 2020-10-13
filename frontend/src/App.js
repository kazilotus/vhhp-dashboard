import React, { Component } from 'react'
import Landing from './pages/Landing'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.0.106:5000/'

export class App extends Component {
  render() {
    return (
      <>
        <Landing />
      </>
    )
  }
}

export default App
