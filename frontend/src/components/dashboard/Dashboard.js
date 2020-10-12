import React, { Component } from 'react'
import LayoutOfDashboard from './LayoutOfDashboard'
import RoomNameSelection from './RoomNameSelection'
import SingleRoomActions from './SingleRoomActions'

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomSelected: null,
    }
    this.handleRoomNameSelection = this.handleRoomNameSelection.bind(this)
  }
  componentDidMount() {
    // console.log(this.roomSelected)
  }
  handleRoomNameSelection(room) {
    this.setState({ ...this.state, roomSelected: room })
  }

  render() {
    return (
      <LayoutOfDashboard>
        <RoomNameSelection
          handleRoomNameSelection={this.handleRoomNameSelection}
        />
        <SingleRoomActions roomSelected={this.state.roomSelected} />
      </LayoutOfDashboard>
    )
  }
}

export default Dashboard
