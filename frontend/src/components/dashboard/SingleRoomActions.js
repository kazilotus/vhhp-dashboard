import React, { Component } from 'react'
import { Row, Col, Empty } from 'antd'

export class SingleRoomActions extends Component {
  render() {
    return (
      <>
        <Row>
          <Col span={24} style={{ marginTop: '20vh' }}>
            <Empty description="No room selected"/>
          </Col>
        </Row>
      </>
    )
  }
}

export default SingleRoomActions
