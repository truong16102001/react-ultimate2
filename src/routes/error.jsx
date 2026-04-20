import { Button, Result } from "antd";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <Result
      status="403"
      title="Oops!"
      subTitle={error.statusText || error.message}
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
