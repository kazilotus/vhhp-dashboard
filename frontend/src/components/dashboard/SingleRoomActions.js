import React, { Component } from 'react'
import { Row, Col, Empty, Button } from 'antd'

export class SingleRoomActions extends Component {
  render() {
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
            <Row style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Col span={8}>
                <Button type="primary">Pre Event</Button>
              </Col>
              <Col span={8}>
                <Button type="primary">Youtube Video`</Button>
              </Col>
              <Col span={8}>
                <Button type="primary">Youtube Stream</Button>
              </Col>
            </Row>
            <Row style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Col span={8}>
                <Button type="primary">Image</Button>
              </Col>
              <Col span={8}>
                <Button type="primary">Watch party</Button>
              </Col>
              <Col span={8}>
                <Button type="primary">Text</Button>
              </Col>
            </Row>
          </>
        )}
      </>
    )
  }
}

export default SingleRoomActions
