import React, { useState, useEffect } from "react";
import { Radio, Card, Button, Form, Input, Row, Col, InputNumber, Select } from "antd";
import mqtt from "mqtt/dist/mqtt";
import './TestConnection.css'


export const TestConnection = () => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const record = {
    host: "broker.emqx.io",
    clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
    port: 8083,
    message_size: 1,
    protocol: 'mqtt://',
    path: '',
    ssl_tls: '',
    username: '',
    password: '',
    name : '',
    qos: 0,
    subscribers: 1,
    publishers: 1,
    time_interval: 1,

  };


//   const mqttConnect = (host, mqttOption) => {
//     setConnectStatus("Connecting");
//     setClient(mqtt.connect(host, mqttOption));
//   };
//   const onFinish = (values) => {
    
//     const { name, host, clientId, port } = values;
//     if(name===''||host===''||clientId===''||port===''){
//       console.log('Good catch')
//       alert('All required fields must be filled')
//     }else{
//     const url = `ws://${host}:${port}/mqtt`;
//     const options = {
//       keepalive: 30,
//       protocolId: "MQTT",
//       protocolVersion: 4,
//       clean: true,
//       reconnectPeriod: 1000,
//       connectTimeout: 30 * 1000,
//       will: {
//         topic: "WillMsg",
//         payload: "Connection Closed abnormally..!",
//         qos: 0,
//         retain: false,
//       },
//       rejectUnauthorized: false,
//     };
//     mqttConnect(url, options);
//     console.log(values)
//   }
// }

const [client, setClient] = useState(null);
const [connectStatus, setConnectStatus] = useState("Test Connection");

useEffect(() => {
  if (client) {
    client.on("connect", () => {
      setConnectStatus("Connected");
    });
    client.on("error", (err) => {
      console.error("Connection error: ", err);
      client.end();
    });
    client.on("reconnect", () => {
      setConnectStatus("Reconnecting");
    });
  }
}, [client]);

const mqttDisconnect = () => {
  if (client) {
    client.end(() => {
      setConnectStatus("Test Connection");
    });
  }
};

//This handleConnect send data to the server for connection
const handleConnect = (event) => {
  // form.submit();
  fetch('http://localhost:5000/Testbench/server',{
      method: 'POST',
      //Converting the React state to a JSON and send it as the POST body
      body: JSON.stringify(this.state)
  }).then((response) =>{
      console.log(response)
      return resonse.json();
  });
  //Convert the React state to JSON

  event.preventDefault();

};
  const handleDisconnect = () => {
  mqttDisconnect();
};

  const ConnectionForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={record}
    //   onFinish={onFinish}
    >
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item label="Name" name="name" required>
            <Input
              placeholder="required"
              required
              name="name"
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Protocol" name="protocol">
            <select name="protocol">
              <option value="mqtt://">mqtt://</option>
              <option value="mqtts://">mqtts://</option>
              <option value="ws://">ws://</option>
              <option value="wss://">wss://</option>
            </select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item required label="Host" name="host">
            <Input
              placeholder="required"
              required
              name="host"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Port" required name="port">
            <Input
              placeholder="required"
              required
              name="port"
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Path" name="path">
            <Input name="path" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Client ID" required name="clientId">
            <Input
              placeholder="required"
              name="clientId"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Username" name="username">
            <Input required name="username" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Password" name="password">
            <Input id="password" name="password" />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="Msg Size" name="message_size">
            <InputNumber
              name="messageSize"
              min={1}
              max={1000}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="SSL/TLS" name="ssl_tls">
            <Radio.Group name="ssl_tls">
              <Radio value="true">True</Radio>
              <Radio value="false">False</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="QoS"
            name="qos"
          >
            <Select>
            <Option value="0">0</Option>
            <Option value="1">1</Option>
            <Option value="2">2</Option>         
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Publishers" name="publishers">
            <InputNumber
              name="publishers"
             />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Subsscribers" name="subscribers">
            <InputNumber
              name="subscribers"
              />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Time Interval" name="time_interval">
            <InputNumber
              name="timeInterval"
              min={1}
              max={10}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return (
    <div className="testconnection">
      <Card
        title="Test Connection"
        actions={[
          <Button type="primary" htmlType="submit" onClick={handleConnect}>
            {connectStatus}
          </Button>,
          <Button onClick={handleDisconnect} id="danger-button" danger>
            Disconnect
          </Button>,
        ]}
      >
        {ConnectionForm}
      </Card>
    </div>
  );
};