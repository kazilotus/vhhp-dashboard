import React, { Component } from 'react'
import { Row, Col, Empty, Typography, Radio } from 'antd'

const { Title } = Typography

export class SingleRoomActions extends Component {
  state = {
    size: 'Youtube Stream',
  }

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value })
  }
  render() {
    const { size } = this.state
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
                <Radio.Group value={size} onChange={this.handleSizeChange}>
                  <Radio.Button value="Pre Event">Pre Event</Radio.Button>
                  <Radio.Button value="Youtube Video">
                    Youtube Video
                  </Radio.Button>
                  <Radio.Button value="Youtube Stream">
                    Youtube Stream
                  </Radio.Button>
                  <Radio.Button value="Image">Image</Radio.Button>
                  <Radio.Button value="Watch party">Watch party</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          </>
        )}
      </>
    )
  }
}

export default SingleRoomActions
