import React, { Component } from 'react'
import LayoutOfDashboard from './LayoutOfDashboard'
import RoomNameSelection from './RoomNameSelection'
import SingleRoomActions from './SingleRoomActions'

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomSelected: null,
      roomStatus: null,
    }
    this.handleRoomNameSelection = this.handleRoomNameSelection.bind(this)
    this.handleRoomStatusUpdate = this.handleRoomStatusUpdate.bind(this)
  }
  
  componentDidMount() {
    // console.log(this.roomSelected)
    // console.log(this.state)
  }

  handleRoomNameSelection(room) {
    this.setState({ ...this.state, roomSelected: room })
  }

  handleRoomStatusUpdate(roomStatus) {
    this.setState({ ...this.state, roomStatus: roomStatus })
  }

  render() {

    // require('../../index.css');
    // require('antd/dist/antd.css');

    return (
      <LayoutOfDashboard>
        <RoomNameSelection
          handleRoomNameSelection={this.handleRoomNameSelection}
          handleRoomStatusUpdate={this.handleRoomStatusUpdate}
        />
        <SingleRoomActions
          roomSelected={this.state.roomSelected}
          roomStatus={this.state.roomStatus}
          handleRoomStatusUpdate={this.handleRoomStatusUpdate}
        />
      </LayoutOfDashboard>
    )
  }
}

export default Dashboard
