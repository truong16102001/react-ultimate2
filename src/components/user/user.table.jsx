import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import UserFormUpdate from "./user.form.update";
import { useState } from "react";
import UserDetails from "./user.details";

const UserTable = (props) => {
    const {users, getAllUser} = props;
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [updateUser, setUpdateUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const columns = [
      {
        title: "ID",
        dataIndex: "_id",
        render: (_, record) => {
          return <a onClick={() => {
            setUserDetails(record);
            setIsDetailsOpen(true);
          }} href="#">{record._id}</a>;
        },
      },
      {
        title: "Name",
        dataIndex: "fullName",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Phone Number",
        dataIndex: "phone",
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <div style={{ display: "flex", gap: "20px" }}>
            <EditOutlined
              onClick={() => {
                setUpdateUser(record);
                setIsOpenModal(true);
              }} 
              style={{ cursor: "pointer", color: "orange" }}
            />
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </div>
        ),
      },
    ];
    console.log("UserTable render");
    return (
      <>
        <Table columns={columns} dataSource={users} rowKey="_id" />

        <UserFormUpdate
          updateUser={updateUser}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          setUpdateUser={setUpdateUser}
          getAllUser={getAllUser}
        />

        <UserDetails
          userDetails={userDetails}
          isDetailsOpen={isDetailsOpen}
          setIsDetailsOpen={setIsDetailsOpen}
          setUserDetails={setUserDetails}
        />
      </>
    );
}

export default UserTable;
