import React, {useCallback, useEffect, useState} from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import {useFetch} from "../../../hooks/useFetch";
import {useParams, useHistory} from "react-router-dom";

const EditFreelancers = () => {
  const history = useHistory();
  let { id } = useParams();
  const [form] = Form.useForm();

  const {response: freelancerData} = useFetch('freelancers/:id', { id: id })
  const { response, isLoading, error, send: updateFreelancer } = useFetch('freelancers/:id', { id: id, immediate: false }, { method: 'post' })
  const onSubmit = useCallback(async (values) => {
    await updateFreelancer({ body: JSON.stringify(values) })
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

  useEffect(() => {
    if (freelancerData){
      form.setFieldsValue({
        ...freelancerData
      });
    }
  }, [freelancerData])

  return (
    <Form
      name="basic"
      form={form}
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
        <Input value={freelancerData?.username} />
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
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
export default EditFreelancers;
