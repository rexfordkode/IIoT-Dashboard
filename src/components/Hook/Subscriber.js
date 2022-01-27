import React, { useState } from 'react';
import { Card, Form, Input, Row, Col, Button } from 'antd';
const Subscriber = ({ sub, unSub, showUnsub }) => {
  const [form] = Form.useForm();
const [state,setState] = useState({
  topic: '',
  qos: 0,
})

const handleInputChange = (event) => {
  setState({
    ...state,
    [event.target.name]: event.target.value,
  });
};

const onFinish = (values) => {
  sub(values);
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

  const handleUnsub = () => {
    const values = form.getFieldsValue();
    unSub(values);
  };

  const SubForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      onChange={handleInputChange}
      onFinish={onFinish}
    >
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            label="Topic"
            name="topic"
          >
            <Input name='topic' value={state.topic} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="QoS"
            name="qos"
          >
            <select id="subscriber-qos" name='qos' value={state.qos}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            </select>         
             </Form.Item>
        </Col>
        <Col span={8} offset={10} style={{ textAlign: 'left' }}>
          <Form.Item>
            {  showUnsub ? null :
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Subscribe
            </Button>}
            {
              showUnsub ?
                <Button type="danger" onClick={handleUnsub}>
                  Unsubscribe
                </Button>
                : null
            }
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  return (
    <Card
      title="Subscriber"
    >
      {SubForm}
    </Card>
  );
}

export default Subscriber;
