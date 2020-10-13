import React, { Component } from 'react'

import Home from './Home'
import Dashboard from '../components/dashboard/Dashboard'

export default class Landing extends Component {

    state = {
        star: false
    }

    componentDidMount() {
        this.setState({
            star: true
        })
    }

    render() {
        return this.state.star ? <Home /> : <Dashboard />
    }
}