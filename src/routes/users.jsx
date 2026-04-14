import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";

const User = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>User management</h1>
      <UserForm />
      <UserTable />
    </div>
  );
};
export default User;
