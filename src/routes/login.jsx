import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { notifyError, notifySuccess } from "../utils/notify";
import { AuthContext } from "../components/context/auth.context";

const Login= () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    const res = await loginAPI(values.email, values.password);
    if (res.data) {
      notifySuccess("Đăng nhập thành công");
      // lưu user vào context
      login(res.data.user); 
      
      navigate("/");
    } else {
      const errors = res?.message;
      const errorMessage = Array.isArray(errors)
        ? errors.map((e, i) => <div key={i}>- {e}</div>)
        : errors;
      notifyError(errorMessage);
    }
    setLoading(false);
  };
  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Login</legend>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email không được để trống!",
                },
                {
                  type: "email",
                  message: "Email không đúng định dạng!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password không được để trống!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button type="primary" onClick={() => form.submit()} loading={loading}>
                  Login
                </Button>
                <Link to="/">
                  Go to homepage <ArrowRightOutlined />
                </Link>
              </div>
            </Form.Item>
          </Form>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default Login;
