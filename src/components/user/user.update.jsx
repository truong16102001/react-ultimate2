import { Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI, uploadFileAPI } from "../../services/api.service";
import { notifyError, notifySuccess } from "../../utils/notify";
import SingleUpload from "../common/SingleUpload";
import { UPLOAD_TYPE } from "../../constants/common.constant";

const UserFormUpdate = (props) => {
  const { updateUser, setUpdateUser, isOpenModal, setIsOpenModal, getUsers } =
    props;
  const [form, setForm] = useState({
    _id:"",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    avatar:""
  });
  const [avatar, setAvatar] = useState([]);

  // useEffect run if updateUser change value
  useEffect(() => {
    if (updateUser) {
      setForm({
        _id: updateUser._id || "",
        fullName: updateUser.fullName || "",
        email: updateUser.email || "",
        password: "",
        phone: updateUser.phone || "",
        avatar : updateUser.avatar || ""
      });

      // fill avatar
      if (updateUser.avatar) {
        setAvatar([
          {
            url: `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${updateUser.avatar}`,
          },
        ]);
      } else {
        setAvatar([]);
      }
    }
  }, [updateUser]);
  

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleUpdateBtnClicked = async () => {
    //step 1: upload file
    let avatarName = form.avatar; // if not change avatar
    if (avatar.length === 0) {
      // if without an avatar
      avatarName = "";
    } else if (avatar[0]?.file) {
      // if change avatar
      const formData = new FormData();
      formData.append("fileImg", avatar[0].file);
      const uploadRes = await uploadFileAPI(formData, UPLOAD_TYPE.AVATAR);
      if (!uploadRes?.data) {
        notifyError("Upload avatar failed");
        return;
      }
      avatarName = uploadRes.data.fileUploaded;
    }
    const payload = {
      ...form,
      avatar: avatarName,
    };
    const res = await updateUserAPI(payload);
    if (res?.data) {
      notifySuccess("Update user successfully");
      // reset form
      setForm({
        _id: "",
        fullName: "",
        email: "",
        phone: "",
        avatar: "",
      });
      setAvatar([]);
      setIsOpenModal(false);
      setUpdateUser(null);
      await getUsers();
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
            <span>Avatar</span>
            <SingleUpload image={avatar} setImage={setAvatar} />
          </div>
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
};

export default UserFormUpdate;