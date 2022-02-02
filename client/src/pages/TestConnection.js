import React, { useState, useEffect } from "react";
import Reports from './Reports'
import axios from 'axios';
import {
  Radio,
  Card,
  Button,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  Select,
} from "antd";
import mqtt from "mqtt/dist/mqtt";
import "./TestConnection.css";
import { url } from "inspector";

export const TestConnection = () => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const record = {
    host: "localhost",
    clientId: `amtCid + ${Math.random().toString(6).substr(2, 3)}`,
    port: 1883,
    message_size: 1,
    protocol: "mqtt://",
    path: "",
    ssl_tls: "",
    username: "",
    password: "",
    name: "",
    qos: 0,
    subscribers: 1,
    publishers: 1,
    time_interval: 1,
  };

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus("Connecting");
    setClient(mqtt.connect(host, mqttOption));
  };
  const onFinish = (values) => {
    const { name, host, clientId, port } = values;
    if (name === "" || host === "" || clientId === "" || port === "") {
      // console.log('Good catch')
      alert("All required fields must be filled");
    } else {
      const url = `ws://${host}:${port}/mqtt`;
      const options = {
        keepalive: 30,
        protocolId: "MQTT",
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
          topic: "WillMsg",
          payload: "Connection Closed abnormally..!",
          qos: 0,
          retain: false,
        },
        rejectUnauthorized: false,
      };
      mqttConnect(url, options);
      console.log(values);
    }
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
          <Form.Item label="Name" name="name" required>
            <Input placeholder="required" required name="name" />
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
            <Input placeholder="required" required name="host" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Port" required name="port">
            <Input placeholder="required" required name="port" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Path" name="path">
            <Input name="path" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Client ID" required name="clientId">
            <Input placeholder="required" name="clientId" />
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
            <InputNumber name="messageSize" min={1} max={1000} />
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
        <Col span={5}>
          <Form.Item label="QoS" name="qos">
            <Select>
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Publishers" name="publishers">
            <InputNumber name="publishers" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Subscribers" name="subscribers">
            <InputNumber name="subscribers" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Time Interval" name="time_interval">
            <InputNumber name="timeInterval" min={1} max={10} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState("Test Connection");
  // const [post, setPost] = useState(null)

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

  const handleConnect = () => {
    form.submit();
  };
  //This submit button 
  // Start===================================================
    // const handleStart = () =>{
     
    //    // POST request using fetch with async/await
    //    const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ title: 'Broker Start' })
    // };
    // const response = await fetch('http://localhost:5000/broker', requestOptions);
      
    // }
  // End===============================
  const handleDisconnect = () => {
    mqttDisconnect();
  };

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
          <Button id="start-button" >
            Start 
          </Button>,
        ]}
      >
        {ConnectionForm}
      </Card>
      
      <Reports/>

    </div>
  );
};
