import React, { useContext } from 'react';
import { Card, Form, Input, Row, Col, Button, Select } from 'antd';
import { QosOption } from './index'

const Publisher = ({ publish }) => {
  const [form] = Form.useForm();
  const qosOptions = useContext(QosOption);
  const [data, setData] = React.useState(null )//This code is for testing api from server)

  React.useEffect(() =>{
    fetch("/api")
    .then((res) => res.json())
    .then((data) => setData(data.message))
  },[]);

  const record = {
    topic: 'testtopic/react',
    qos: 0,
  };

}

export default Publisher;
