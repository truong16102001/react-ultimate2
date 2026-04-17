import ImageUploadCore from "../common/ImageUploadCore";

const AvatarUpload = ({ avatar, setAvatar , viewOnly}) => {
  return (
    <ImageUploadCore
      images={avatar}
      setImages={setAvatar}
      multiple={false} // chỉ 1 ảnh
      viewOnly={viewOnly}
    />
  );
};

export default AvatarUpload;
