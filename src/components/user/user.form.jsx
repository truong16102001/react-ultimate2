import { Button, Input } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";
import { notifySuccess } from "../../utils/notify";
const UserForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleCreateBtnClicked = async () => {
    // validate đơn giản
    if (!form.email || !form.password) {
      return alert("Email và password không được để trống");
    }
    try {
      const res = await createUserAPI(form);

      if (res?.data) {
        notifySuccess("Create user successfully");

        // reset form
        setForm({
          fullName: "",
          email: "",
          password: "",
          phone: "",
        });
      }
    } catch (error) {
      // đã xử lý ở interceptor
    }
  };
  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div>
          <span>Full Name</span>
          <Input
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>
        <div>
          <span>Email</span>
          <Input
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div>
          <span>Password</span>
          <Input.Password
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
        <div>
          <span>Phone number</span>
          <Input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div>
          <Button type="primary" onClick={handleCreateBtnClicked}>
            Create User{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
