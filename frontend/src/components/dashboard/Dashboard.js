import React, { Component } from 'react'
import LayoutOfDashboard from './LayoutOfDashboard'
import RoomNameSelection from './RoomNameSelection'
import SingleRoomActions from './SingleRoomActions'

export class Dashboard extends Component {
  render() {
    return (
      <LayoutOfDashboard>
        <RoomNameSelection />
        <SingleRoomActions/>
      </LayoutOfDashboard>
    )
  }
}

export default Dashboard
