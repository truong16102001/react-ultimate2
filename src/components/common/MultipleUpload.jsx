import ImageUploadCore from "../../common/ImageUploadCore";

const MultipleUpload = ({ images, setImages }) => {
  return (
    <ImageUploadCore
      images={images}
      setImages={setImages}
      multiple={true} // nhiều ảnh
      maxCount={8}
    />
  );
};

export default MultipleUpload;
