import React, {useCallback, useEffect} from "react";
import { Form, Spin, Input, Button } from 'antd';
import {useFetch} from "../../../hooks/useFetch";
import {useHistory} from "react-router-dom";

const NewFreelancers = () => {
  const history = useHistory();
  const { response, isLoading, error, send: createFreelancer } = useFetch('freelancers', { immediate: false }, { method: 'post' })
  const onSubmit = useCallback(async (values) => {
    await createFreelancer({ body: JSON.stringify(values) })
  })

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  useEffect(() => {
    if (response) {
      return history.push("/")
    }
  }, [response])


  return (
    <Spin spinning={isLoading}>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        validateMessages={validateMessages}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: 'email'
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="contact_number"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Skill Sets"
          name="skillsets"
        >
          <Input placeholder="separate using comma. eg node.js. ruby" />
        </Form.Item>

        <Form.Item
          label="Hobby"
          name="hobby"
        >
          <Input placeholder="separate using comma. eg read books, play games" />
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};
export default NewFreelancers;
