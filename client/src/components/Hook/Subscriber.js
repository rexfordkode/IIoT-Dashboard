import React, { useContext } from "react";
import { Card, Form, Input, Row, Col, Button, Select } from "antd";
import { QosOption } from "./index";

const Subscriber = ({ sub, unSub, showUnsub }) => {
  const [form] = Form.useForm();
  const qosOptions = useContext(QosOption);

  const record = {
    topic: "testtopic/react",
    qos: 0,
  };

  const onFinish = (values) => {
    sub(values);
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
      initialValues={record}
      onFinish={onFinish}
    >
      <Row gutter={20}>
        <Col span={12}>
<<<<<<< HEAD
          <Form.Item
            label="Topic" 
            name="topic">
            <Input placeholder='Enter topic' />
          </Form.Item>
          <Form.Item
            label="Topic"
            name="topic"
          >
=======
          <Form.Item label="Topic" name="topic">
>>>>>>> 275cfae9441d035eff08747c9f598d22927efcee
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="QoS" name="qos">
            <Select options={qosOptions} />
          </Form.Item>
        </Col>
        <Col span={8} offset={5} style={{ textAlign: "right" }}>
          <Form.Item>
            {showUnsub ? null : (
              <Button type="primary" htmlType="submit">
<<<<<<< HEAD
              Subscribe
              </Button>}
            {
              showUnsub ?
                <Button type="danger" style={{ marginLeft: '10px' }} onClick={handleUnsub}>
                  Unsubscribe
                </Button>
                : null
            }
=======
                Subscribe
              </Button>
            )}
            {showUnsub ? (
              <Button
                id="danger-button2"
                type="danger"
                style={{ marginLeft: "10px" }}
                onClick={handleUnsub}
              >
                Unsubscribe
              </Button>
            ) : null}
>>>>>>> 275cfae9441d035eff08747c9f598d22927efcee
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return <Card title="Subscriber">{SubForm}</Card>;
};

export default Subscriber;
