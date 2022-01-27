import React, { useState } from "react";
import { Radio, Card, Button, Form, Input, Row, Col, InputNumber } from "antd";

const Connection = ({ connect, disconnect, connectBtn }) => {
  const [state, setState] = useState({
    name:'',
    protocol: "mqtt://",
    host: "",
    port: "",
    path: "",
    clientId: "",
    username: "",
    password: "",
    messageSize: 1,
    ssl_tls: "",
  });

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    if(state.name===''||state.host===''||state.clientId===''||state.port===''){
      console.log('Good catch')
      alert('All required fields must be filled')
    }else{
    try {
      let result = await fetch("http://localhost:4000/", {
        method: "post",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(state),
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    console.log(state);
  }
  };

  const [form] = Form.useForm();

  const ConnectionForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      onChange={handleInputChange}
    >
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item
            label="Name"
            name="name"
            required
          >
            <Input placeholder="required" required name="name" value={state.name} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Protocol" name="protocol">
            <select name="protocol" value={state.value}>
              <option value="mqtt://">mqtt://</option>
              <option value="mqtts://">mqtts://</option>
              <option value="ws://">ws://</option>
              <option value="wss://">wss://</option>
            </select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item required label="Host" name="host">
            <Input placeholder="required" required name="host" value={state.host} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Port" required name="port">
            <Input placeholder="required" required name="port" value={state.port} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Path" name="path">
            <Input name="path" value={state.path} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Client ID" required name="clientId">
            <Input placeholder="required" name="clientId" value={state.clientId} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Username" name="username">
            <Input required name="username" value={state.username} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Password" name="password">
            <Input id="password" name="password" value={state.password} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Msg Size" name="message_size">
            <InputNumber
              name="messageSize"
              min={1}
              max={1000}
              value={state.messageSize}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="SSL/TLS" name="ssl_tls">
            <Radio.Group value={state.ssl_tls} name="ssl_tls">
              <Radio value="true">True</Radio>
              <Radio value="false">False</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return (
    <Card
      title="Connection"
      actions={[
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          {connectBtn}
        </Button>,
        <Button id="danger-button" danger>
          Disconnect
        </Button>,
      ]}
    >
      {ConnectionForm}
    </Card>
  );
};

export default Connection;
