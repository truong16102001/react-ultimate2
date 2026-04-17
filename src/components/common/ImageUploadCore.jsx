import { useState, useEffect, useRef } from "react";
import { Image } from "antd";
import '../common/Upload.css'
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const ImageUploadCore = ({
  images = [],
  setImages,
  multiple = false,
  maxCount = 5,
  viewOnly=false
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const inputRef = useRef(null);

  // cleanup memory (tránh leak)
  useEffect(() => {
    return () => {
      images.forEach((item) => {
        if (item.preview) URL.revokeObjectURL(item.preview);
      });
    };
  }, [images]);

  const handleChangeFile = (e) => {
    const files = Array.from(e.target.files || []);

    const newList = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const finalList = multiple
      ? [...images, ...newList].slice(0, maxCount)
      : newList.slice(0, 1);

    setImages(finalList);
    //  fix: chọn lại cùng file vẫn trigger
    e.target.value = "";
  };

  //  xoá ảnh
  const handleRemove = (index) => {
    const newList = images.filter((_, i) => i !== index);
    setImages(newList);
  };

  //  preview
  const handlePreview = (img) => {
    setPreviewImage(img);
    setPreviewOpen(true);
  };

  //  trigger chọn file
  const triggerUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {images.map((item, index) => (
        <div
          key={index}
          className="image-item"
          style={{
            width: 200,
            height: 200,
            border: "1px solid #ccc",
            borderRadius: 8,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={item.preview || item.url}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/*  overlay */}
          <div className="overlay">
            <EyeOutlined
              onClick={() => handlePreview(item.preview || item.url)}
            />
            {!viewOnly && (
              <>
                <EditOutlined onClick={triggerUpload} />

                <DeleteOutlined onClick={() => handleRemove(index)} />
              </>
            )}
          </div>
        </div>
      ))}

      {/*  upload box */}
      {!viewOnly &&
        (multiple ? images.length < maxCount : images.length === 0) && (
          <div className="upload-box" onClick={triggerUpload}>
            <PlusOutlined />
          </div>
        )}

      {/*  input hidden */}
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple={multiple}
        onChange={handleChangeFile}
      />

      {/*  preview modal */}
      {previewImage && (
        <Image
          width={0}
          height={0}
          src={previewImage}
          preview={{
            visible: previewOpen,
            onVisibleChange: (v) => {
              setPreviewOpen(v);
              if (!v) setPreviewImage("");
            },
          }}
        />
      )}
    </div>
  );
};

export default ImageUploadCore;
