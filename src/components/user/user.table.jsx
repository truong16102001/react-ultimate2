import { Table } from "antd";

const UserTable = (props) => {
    const {users} = props;
   
    const columns = [
      {
        title: "ID",
        dataIndex: "_id",
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
    ];
    
    return <Table columns={columns} dataSource={users} rowKey={"_id"} />;
}

export default UserTable;
