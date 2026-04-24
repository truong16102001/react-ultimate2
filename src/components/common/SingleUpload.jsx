import ImageUploadCore from "./ImageUploadCore";

const SingleUpload = ({ image, setImage , viewOnly}) => {
  return (
    <ImageUploadCore
      images={image}
      setImages={setImage}
      multiple={false} // chỉ 1 ảnh
      viewOnly={viewOnly}
    />
  );
};

export default SingleUpload;
