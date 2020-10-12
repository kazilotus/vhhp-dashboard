import React, { Component } from 'react'

// importing json file to show in data <select>
import * as roomNames from './roomNames.json'

import { Typography, Select } from 'antd'

const { Title } = Typography
const { Option } = Select

export class RoomNameSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conferenceRoomNames: roomNames.conferenceRoomNames,
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    // console.log(this.state.conferenceRoomNames)
  }
  handleChange(value) {
    this.props.handleRoomNameSelection(value)
  }
  render() {
    return (
      <>
        <Title level={2}>Please select a VHHP room:</Title>
        <Select
          placeholder="Select a conference room"
          style={{ width: '50%' }}
          onChange={this.handleChange}
        >
          {this.state.conferenceRoomNames.map((el, idx) => (
            <Option value={el} key={idx}>
              {el}
            </Option>
          ))}
        </Select>
      </>
    )
  }
}

export default RoomNameSelection
