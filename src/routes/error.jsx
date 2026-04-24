import { Button, Result } from "antd";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/router.constant";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <Result
      status="404"
      title="Oops!"
      subTitle={error.statusText || error.message}
      extra={
        <Button type="primary">
          <Link to={ROUTES.HOME}>
            <span>Back to homepage</span>
          </Link>
        </Button>
      }
    />
  );
}
