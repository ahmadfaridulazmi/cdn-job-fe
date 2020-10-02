import React, {useCallback, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import {Table, Spin, Button, Space} from "antd";
import { UserAddOutlined } from '@ant-design/icons';
import {useFetch} from "../../../hooks/useFetch";

const ListFreelancers = () => {
  const history = useHistory();

  const { response, isLoading, error, send: refreshFreelancersList } = useFetch('freelancers')
  const { response: responseDelete, isLoading: isLoadingDelete, error: errorDelete, send: deleteFreelancersFor} = useFetch('freelancers/:id', { immediate: false }, { method: 'delete' })
  const [data, setData] = useState([])

  useEffect(() => {
    if (response) {
      setData(response.map(res => {
        return {
          key: res.id,
          ...res
        }
      }));
    }
  }, [response])

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Phone Number",
      dataIndex: "contact_number",
      key: "contact_number"
    },
    {
      title: "Skill Sets",
      dataIndex: "skillsets",
      key: "skillsets"
    },
    {
      title: "Hobby",
      dataIndex: "hobby",
      key: "hobby"
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => history.push(`/users/${record.id}/edit`)} >Edit</a>
          <a onClick={deleteFreelancers} data-id={record.id} >Delete</a>
        </Space>
      ),
    },
  ]

  const deleteFreelancers = useCallback(async e => {
    let id = e.target.getAttribute("data-id");
    await deleteFreelancersFor({ id });
    await refreshFreelancersList();
  })


  return (
    <>
      <h2>Users</h2>
      <Spin spinning={isLoading || isLoadingDelete}>
        <Table dataSource={data} columns={columns} />
        <Button type="primary" icon={<UserAddOutlined />} onClick={() => history.push("/users/new")} >Add User</Button>
      </Spin>
    </>
  )

}
export default ListFreelancers;
