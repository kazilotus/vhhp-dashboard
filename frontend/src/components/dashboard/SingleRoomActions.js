import React, { Component } from 'react'
import axios from 'axios'
import {
  Button,
  Row,
  Col,
  Empty,
  Typography,
  Radio,
  Divider,
  Input,
  Form,
} from 'antd'

const { Title, Paragraph } = Typography

export class SingleRoomActions extends Component {
  state = {
    currentStatus: this.props.roomStatus,
    link: null,
    textInput: null,
  }
  componentDidMount() {
    // do stuff

  }
  handleRoomStatusChange = (e) => {
    this.setState({
      currentStatus: e.target.value,
      // link: null,
      // textInput: null,
    })
  }
  handleLinkChange = (e) => {
    this.setState({ link: e.target.value })
  }
  handleTextAreaChange = (e) => {
    this.setState({ textInput: e.target.value })
  }
  onFinish = (values) => {
    console.log(this.state)
    axios
      .post(`/api/v1/admin/conferenceRoom/`, {
        roomName: this.props.roomSelected,
        ...this.state,
      })
      .then((res) => {
        console.log(res)
        // console.log(res.data)
        this.props.handleRoomStatusUpdate(this.state.currentStatus)
      })
  }

  render() {
    const { currentStatus } = this.state
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

                <Form
                  name="basic"
                  onFinish={this.onFinish}
                  style={{ margin: 'auto' }}
                >
                  <Form.Item>
                    <Radio.Group
                      // value={currentStatus}
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
                      <Radio.Button value="Watch party">
                        Watch party
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                  {this.state.currentStatus === 'Youtube Video' ||
                  this.state.currentStatus === 'Youtube Stream' ||
                  this.state.currentStatus === 'Image' ? (
                    <Form.Item
                      name="url"
                      onChange={(e) => {
                        this.handleLinkChange(e)
                      }}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter an URL!',
                        },
                      ]}
                    >
                      <Input placeholder="Please type URL here..." />
                    </Form.Item>
                  ) : null}

                  {this.state.currentStatus === 'Text' ? (
                    <Form.Item
                      name="textInput"
                      onChange={(e) => {
                        this.handleTextAreaChange(e)
                      }}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter some text..',
                        },
                      ]}
                    >
                      <Input.TextArea placeholder="Enter the text you want to show..." />
                    </Form.Item>
                  ) : null}

                  <Form.Item style={{ marginTop: 20 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ cursor: 'pointer' }}
                      // onClick={handleCancel}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>

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
