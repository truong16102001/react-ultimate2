import { Button, Input , Modal} from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";
import { notifyError, notifySuccess } from "../../utils/notify";
const UserFormCreate = (props) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password:"",
    phone: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getAllUser } = props;
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleCreateBtnClicked = async () => {
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
      setIsModalOpen(false);
      await getAllUser();
    } else {
       const errors = res?.message;
       const errorMessage = Array.isArray(errors)
         ? errors.map((e, i) => <div key={i}>- {e}</div>)
         : errors;
       notifyError(errorMessage);
    }
  };

  return (
    <div className="user-form-create" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Add New
        </Button>

        <Modal
          title="Create User"
          open={isModalOpen}
          onOk={handleCreateBtnClicked}
          onCancel={() => setIsModalOpen(false)}
          maskClosable={false}
          okText={"CREATE"}
        >
          <div
            style={{ display: "flex", gap: "15px", flexDirection: "column" }}
          >
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
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserFormCreate;
