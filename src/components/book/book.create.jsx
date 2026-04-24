import { Button, Input, Modal, InputNumber, Select } from "antd";
import { useState } from "react";
import { notifyError, notifySuccess } from "../../utils/notify";
import { createBookAPI, uploadFileAPI } from "../../services/api.service";
import SingleUpload from "../common/SingleUpload";

const BookFormCreate = (props) => {
  const { getBooks } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    mainText: "",
    author: "",
    price: 0,
    quantity: 0,
    category: "",
    thumbnail: "",
  });

  const [thumbnail, setThumbnail] = useState([]);

  const handleChange = (key, value) => {
    console.log("abc ", key, value)
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleCreateBtnClicked = async () => {
    let thumbnailName = "";

    // upload ảnh nếu có
    if (thumbnail.length > 0 && thumbnail[0]?.file) {
      const formData = new FormData();
      formData.append("fileImg", thumbnail[0].file);

      const resUpload = await uploadFileAPI(formData, "book"); // nhớ import

      if (!resUpload?.data) {
        notifyError("Upload thumbnail failed");
        return;
      }

      thumbnailName = resUpload.data.fileUploaded;
    }

    const payload = {
      ...form,
      thumbnail: thumbnailName,
    };

    const res = await createBookAPI(payload);

    if (res?.data) {
      notifySuccess("Create book successfully");

      // reset form
      setForm({
        mainText: "",
        author: "",
        price: 0,
        quantity: 0,
        category: "",
        thumbnail: "",
      });

      setThumbnail([]);
      setIsModalOpen(false);

      await getBooks();
    } else {
      const errors = res?.message;
      const errorMessage = Array.isArray(errors)
        ? errors.map((e, i) => <div key={i}>- {e}</div>)
        : errors;

      notifyError(errorMessage);
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add New Book
      </Button>

      <Modal
        title="Create Book"
        open={isModalOpen}
        onOk={handleCreateBtnClicked}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        okText="CREATE"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {/* Thumbnail */}
          <div>
            <span>Thumbnail</span>
            <SingleUpload image={thumbnail} setImage={setThumbnail} />
          </div>

          {/* Name */}
          <div>
            <span>Book Name</span>
            <Input
              value={form.mainText}
              onChange={(e) => handleChange("mainText", e.target.value)}
            />
          </div>

          {/* Author */}
          <div>
            <span>Author</span>
            <Input
              value={form.author}
              onChange={(e) => handleChange("author", e.target.value)}
            />
          </div>

          {/* Price */}
          <div>
            <span>Price</span>
            <InputNumber
              style={{ width: "100%" }}
              addonAfter={" đ"}
              value={form.price}
              onChange={(value) => handleChange("price", value)}
            />
          </div>

          {/* Quantity */}
          <div>
            <span>Quantity</span>
            <InputNumber
              style={{ width: "100%" }}
              value={form.quantity}
              onChange={(value) => handleChange("quantity", value)}
            />
          </div>

          {/* Category */}
          <div>
            <span>Category</span>
            <Select
              style={{ width: "100%" }}
              value={form.category}
              onChange={(value) => handleChange("category", value)}
              options={[
                { value: "Arts", label: "Arts" },
                { value: "Business", label: "Business" },
                { value: "Comics", label: "Comics" },
                { value: "Cooking", label: "Cooking" },
                { value: "Entertainment", label: "Entertainment" },
                { value: "History", label: "History" },
                { value: "Music", label: "Music" },
                { value: "Sports", label: "Sports" },
                { value: "Teen", label: "Teen" },
                { value: "Travel", label: "Travel" },
              ]}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookFormCreate;
