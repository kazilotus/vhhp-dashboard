import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'

const { Header, Footer, Content } = Layout

export class Dashboard extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            background: 'white',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            overflow: 'hidden',
            padding: '1rem',
          }}
        >
          Placeholder
        </Header>
        <Content>
          <Row>
            <Col span={24}>
              <Content style={{ padding: '1rem', minHeight: '100vh' }}>
                <h1>I am content </h1>
              </Content>
            </Col>
          </Row>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
                padding: `1rem`,
            borderTop: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          &copy; 2020
        </Footer>
      </Layout>
    )
  }
}

export default Dashboard
