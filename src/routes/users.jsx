import { useEffect, useState } from "react";
import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { getAllUserAPI } from "../services/api.service";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    const res = await getAllUserAPI();
    setUsers(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User management</h1>
      <UserForm getAllUser ={getAllUser}/>
      <UserTable users={users} />
    </div>
  );
};
export default User;
