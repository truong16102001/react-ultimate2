import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import UserFormUpdate from "./user.form.update";
import { useState } from "react";
import UserDetails from "./user.details";
import { deleteUserAPI } from "../../services/api.service";
import { notifyError, notifySuccess } from "../../utils/notify";

const UserTable = (props) => {
    const {
      users,
      getUsers,
      current,
      pageSize,
      total,
      setCurrent,
      setPageSize,
    } = props;
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [updateUser, setUpdateUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const columns = [
      {
        title: "No",
        render: (_, record, index) => {
          return <>{index + 1 + (current - 1) * pageSize}</>;
        },
      },
      {
        title: "ID",
        dataIndex: "_id",
        render: (_, record) => {
          return (
            <a
              onClick={() => {
                setUserDetails(record);
                setIsDetailsOpen(true);
              }}
              href="#"
            >
              {record._id}
            </a>
          );
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
            <Popconfirm
              title="Delete User"
              description="Are you sure to delete this user?"
              onConfirm={() => handleDeleteUser(record._id)}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
            </Popconfirm>
          </div>
        ),
      },
    ];

    const handleDeleteUser = async (id) => {
      const res = await deleteUserAPI(id);
      if (res?.data) {
        const isLastItemOnPage = users.length === 1;
        if (isLastItemOnPage && current > 1) {
          setCurrent(current - 1);
        } else {
          await getUsers();
        }
        notifySuccess("Delete user successfully");
      } else {
        const errors = res?.message;
        const errorMessage = Array.isArray(errors)
          ? errors.map((e, i) => <div key={i}>- {e}</div>)
          : errors;
        notifyError(errorMessage);
      }
    };

    const onChange = (pagination, filters, sorter, extra) => {
      // setCurrent, setPageSize
      //nếu thay đổi trang : current
      if (pagination && pagination.current) {
        if (+pagination.current !== +current) {
          setCurrent(+pagination.current); //"5" => 5
        }
      }

      //nếu thay đổi tổng số phần tử : pageSize
      if (pagination && pagination.pageSize) {
        if (+pagination.pageSize !== +pageSize) {
          setPageSize(+pagination.pageSize); //"5" => 5
        }
      }
    };

    return (
      <>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="_id"
          pagination={{
            current: current,
            pageSize: pageSize,
            showSizeChanger: true,
            total: total,
            showTotal: (total, range) => {
              return (
                <div>
                  {" "}
                  {range[0]}-{range[1]} trên {total} rows
                </div>
              );
            },
          }}
          onChange={onChange}
        />

        <UserFormUpdate
          updateUser={updateUser}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          setUpdateUser={setUpdateUser}
          getUsers={getUsers}
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
