import React, { useState } from "react";
import { Select, Radio, Card, Button, Form, Input, Row, Col, InputNumber } from "antd";

const Connection = ({ connect, disconnect, connectBtn }) => {
  const [messageSize, setMessageSize] = useState(1);
  const [form] = Form.useForm();

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
    >
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Protocol" name="protocol">
            <Select id="protocol">
              <option value="mqtt://">mqtt://</option>
              <option value="mqtts://">mqtts://</option>
              <option value="ws://">ws://</option>
              <option value="ws://">ws://</option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Host" name="host">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Port" name="port">
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Path" name="path">
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Client ID" name="clientId">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Password" name="password">
            <Input />
          </Form.Item>
        </Col>
        {/* try */}
        <Col span={8}>
          <Form.Item label="message size" name="message_size">
            <InputNumber
              min={1}
              max={1000}
              defaultValue={messageSize}
              onChange={(value) => {
                setMessageSize(value);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="SSL/TLS" name="ssl_tls">
          <Radio.Group >
        <Radio value="true">True</Radio>
        <Radio value="false">False</Radio>
      </Radio.Group>         
       </Form.Item>
        </Col>
        {/* try */}
      </Row>
    </Form>
  );

  return (
    <Card
      title="Connection"
      actions={[
        <Button type="primary" onClick={handleConnect}>
          {connectBtn}
        </Button>,
        <Button id="danger-button" danger onClick={handleDisconnect}>
          Disconnect
        </Button>,
      ]}
    >
      {ConnectionForm}
    </Card>
  );
};

export default Connection;
