import React from "react";
import { Card, Button, Form, Input, Row, Col } from "antd";

const Connection = ({ connect, disconnect, connectBtn }) => {
  const [form] = Form.useForm();
  const record = {
    host: 'localhost',
    clientId: `AmtId${Math.random().toString(7).substr(2, 8)}`,
    port: 1883,
    maximumPacketSize: 1
  };
  const onFinish = (values) => {
    const { host, clientId, port, username, password, maximumPacketSize } = values;
    const url = `ws://${host}:${port}/mqtt`;
    const options = {
      keepalive: 30,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'testtopic/react',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false,
      properties:{
        maximumPacketSize: 1024,
        topicAliasMaximum: 100,
        receiveMaximum: 10
      }
    };
    options.clientId = clientId;
    options.username = username;
    options.password = password;
    options.properties.maximumPacketSize = maximumPacketSize;
    connect(url, options);
  };

  const handleConnect = () => {
    form.submit();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const ConnectionForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={record}
      onFinish={onFinish}
    >
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item
            label="Host"
            name="host"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Port"
            name="port"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Client ID"
            name="clientId"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Username"
            name="username"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Password"
            name="password"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Message Size"
            name="maximumPacketSize"
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  return (
    <Card
      title="Connection"
      actions={[
        <Button type="primary" onClick={handleConnect}>{connectBtn}</Button>,
        <Button id="danger-button" danger onClick={handleDisconnect}>Disconnect</Button>
      ]}
    >
      {ConnectionForm}
    </Card>
  );
}

export default Connection;
