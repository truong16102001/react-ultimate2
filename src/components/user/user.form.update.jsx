import { Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.service";
import { notifyError, notifySuccess } from "../../utils/notify";

const UserFormUpdate = (props) => {
  const { updateUser, setUpdateUser, isOpenModal, setIsOpenModal, getAllUser } = props;
  const [form, setForm] = useState({
    _id:"",
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  // useEffect run if updateUser change value
  useEffect(() => {
    if (updateUser) {
      setForm({
        _id: updateUser._id || "",
        fullName: updateUser.fullName || "",
        email: updateUser.email || "",
        password: "",
        phone: updateUser.phone || "",
      });
    }
  }, [updateUser]);

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleUpdateBtnClicked = async () => {
    const res = await updateUserAPI(form);
    if (res?.data) {
          notifySuccess("Update user successfully");
          // reset form
          setForm({
            _id: "",
            fullName: "",
            email: "",
            phone: "",
          });
          setIsOpenModal(false);
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
    <div className="user-form-update" style={{ margin: "20px 0" }}>
      <Modal
        title="Update User"
        open={isOpenModal}
        onOk={handleUpdateBtnClicked}
        onCancel={() => {
            setIsOpenModal(false);
            setUpdateUser(null);
        }}
        maskClosable={false}
        okText={"UPDATE"}
      >
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <div>
            <span>Id</span>
            <Input value={form._id} disabled />
          </div>
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
              disabled
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
  );
};;;

export default UserFormUpdate;