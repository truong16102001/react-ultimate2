import { useEffect, useState } from "react";
import UserFormCreate from "../components/user/user.create";
import UserTable from "../components/user/user.table";
import { getAllUserAPI, getUsersPaginateAPI } from "../services/api.service";

const User = () => {
  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getUsers();
  }, [current, pageSize]); //[] + condition

  const getUsers = async () => {
    const res = await getUsersPaginateAPI(current, pageSize);
    if (res.data) {
      setUsers(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User management</h1>
      <UserFormCreate getUsers={getUsers} />
      <UserTable
        users={users}
        getUsers={getUsers}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </div>
  );
};
export default User;
