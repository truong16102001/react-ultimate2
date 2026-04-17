import { Drawer, Button, Image } from "antd";
import { useState, useEffect } from "react";
import { notifyError, notifySuccess } from "../../utils/notify";
import AvatarUpload from "../common/AvatarUpload";

const UserDetails = (props) => {
  const { userDetails, setUserDetails, isDetailsOpen, setIsDetailsOpen } =
    props;

  const [avatar, setAvatar] = useState([]);

  // fill avatar từ backend
  useEffect(() => {
    if (userDetails?.avatar) {
      setAvatar([
        {
          url: `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${userDetails.avatar}`,
        },
      ]);
    } else {
      setAvatar([]);
    }
  }, [userDetails]);

  //  cleanup memory preview
  useEffect(() => {
    return () => {
      avatar.forEach((item) => {
        if (item.preview) URL.revokeObjectURL(item.preview);
      });
    };
  }, [avatar]);

  return (
    <Drawer
      width={"40vw"}
      title="User Details"
      onClose={() => {
        setIsDetailsOpen(false);
        setUserDetails(null);
      }}
      open={isDetailsOpen}
    >
      {userDetails ? (
        <>
          <p>ID: {userDetails._id}</p> <br />
          <p>FullName: {userDetails.fullName}</p> <br />
          <p>Email: {userDetails.email}</p> <br />
          <p>Phone: {userDetails.phone}</p> <br />
          <p>Role: {userDetails.role}</p> <br />
          <p>Avatar:</p>
          {/*  AVATAR */}
          <AvatarUpload viewOnly={true} avatar={avatar} setAvatar={setAvatar} />
        </>
      ) : (
        <p>No data</p>
      )}
    </Drawer>
  );
};

export default UserDetails;
