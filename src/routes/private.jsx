import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);
    if (user && user.id) {
      return <>{props.children}</>;
    }
    return (
      <Result
        status="403"
        title="Unauthorize!"
        subTitle={"Bạn cần đăng nhập để truy cập nguồn tài nguyên này."}
        extra={
          <Button type="primary">
            <Link to="/">
              <span>Back to homepage</span>
            </Link>
          </Button>
        }
      />
    );
}
export default PrivateRoute;