import React, { useState } from 'react';
import { Card, Form, Input, Row, Col, Button} from 'antd';

const Publisher = ({ publish }) => {
  const [state,setState] = useState({
      topic : '',
      qos : '0',
      payload : '',
  })

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  
  const handleSubmit = async () => {
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
  };

  const PublishForm = (
      <Form
      layout="vertical"
      name="basic"
    >
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            label="Topic"
            name="topic"
          >
            <Input  name='topic' onChange={handleInputChange} value={state.topic} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="QoS"
            name="qos"
          >
            <select id="publisher-qos" name='qos' onChange={handleInputChange} value={state.qos}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            </select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Payload"
            name="payload"
          >
            <Input.TextArea name='payload' value={state.payload} onChange={handleInputChange}/>
          </Form.Item>
        </Col>
        <Col span={8} offset={8} style={{ textAlign: 'center' }}>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Publish
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  return (
    <Card
      title="Publisher"
    >
      {PublishForm}
    </Card>
  );
}

export default Publisher;
