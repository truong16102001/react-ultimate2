import { Button, Input, Form, Row, Col } from "antd";
import { registerUserAPI } from "../services/api.service";
import { notifyError, notifySuccess } from "../utils/notify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    //call api
    const res = await registerUserAPI(
      values.fullName,
      values.email,
      values.password,
      values.phone,
    );
    if (res.data) {
      notifySuccess("Register user successfully");
      navigate("/login");
    } else {
      notifyError("Register user failed");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ margin: "10px" }}
    >
      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                type: "email",
                message: "Email is not valid!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>

      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Phone number"
            name="phone"
            rules={[
              {
                required: true,
                pattern: new RegExp(/\d+/g),
                message: "Wrong format!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col xs={24} md={8}>
          <div>
            <Button onClick={() => form.submit()} type="primary">
              Register
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
export default Register;
