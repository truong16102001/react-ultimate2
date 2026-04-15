import { Table } from "antd";
import { useEffect, useState } from "react";
import { getAllUserAPI } from "../../services/api.service";
const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        getAllUser();
    },[])

    const getAllUser = async() =>{
        const res = await getAllUserAPI();
        setUsers(res.data);
    }
   
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
