import React, { Component } from 'react'
import axios from 'axios'
import { Button, Row, Col, Empty, Typography, Radio, Divider } from 'antd'

const { Title, Paragraph } = Typography

export class SingleRoomActions extends Component {
  state = {
    roomStatus: this.props.roomStatus,
  }
  componentDidMount() {
    // do stuff
    this.setState({ roomStatus: this.props.roomStatus })
  }
  handleRoomStatusChange = (e) => {
    this.setState({ roomStatus: e.target.value })
    axios
      .post(`/api/v1/admin/conferenceRoom/`, {
        roomName: this.props.roomSelected,
        currentStatus: e.target.value,
      })
      .then((res) => {
        // console.log(res)
        // console.log(res.data)
        this.props.handleRoomStatusUpdate(this.state.roomStatus)
      })
  }

  render() {
    const { roomStatus } = this.state
    return (
      <>
        {!this.props.roomSelected ? (
          <Row>
            <Col span={24} style={{ marginTop: '20vh' }}>
              <Empty description="No room selected" />
            </Col>
          </Row>
        ) : (
          <>
            <Row style={{ marginTop: '2rem' }}>
              <Col span={24}>
                <Title level={3}>Please choose an action</Title>
                <Radio.Group
                  value={roomStatus}
                  onChange={this.handleRoomStatusChange}
                >
                  <Radio.Button value="Pre Event">Pre Event</Radio.Button>
                  <Radio.Button value="Youtube Video">
                    Youtube Video
                  </Radio.Button>
                  <Radio.Button value="Youtube Stream">
                    Youtube Stream
                  </Radio.Button>
                  <Radio.Button value="Text">Text</Radio.Button>
                  <Radio.Button value="Image">Image</Radio.Button>
                  <Radio.Button value="Watch party">Watch party</Radio.Button>
                </Radio.Group>

                <Divider />
                <Paragraph>
                  Room Selected:{' '}
                  <Paragraph strong>{this.props.roomSelected}</Paragraph>
                </Paragraph>
                <Paragraph>
                  Room status:{' '}
                  <Paragraph strong>{this.props.roomStatus}</Paragraph>
                </Paragraph>
              </Col>
            </Row>
          </>
        )}
      </>
    )
  }
}

export default SingleRoomActions
