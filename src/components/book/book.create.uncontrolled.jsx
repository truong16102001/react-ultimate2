import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useState } from "react";
import { notifyError, notifySuccess } from "../../utils/notify";
import { createBookAPI, uploadFileAPI } from "../../services/api.service";
import SingleUpload from "../common/SingleUpload";

const BookFormCreate = (props) => {
  const { getBooks } = props;
  const [form] = Form.useForm(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState([]);

  // submit
  const onFinish = async (values) => {
    let thumbnailName = "";

    // upload ảnh nếu có
    if (thumbnail.length > 0 && thumbnail[0]?.file) {
      const formData = new FormData();
      formData.append("fileImg", thumbnail[0].file);

      const resUpload = await uploadFileAPI(formData, "book");

      if (!resUpload?.data) {
        notifyError("Upload thumbnail failed");
        return;
      }

      thumbnailName = resUpload.data.fileUploaded;
    }

    const payload = {
      ...values,
      thumbnail: thumbnailName,
    };

    const res = await createBookAPI(payload);

    if (res?.data) {
      notifySuccess("Create book successfully");

      form.resetFields(); //  reset form
      setThumbnail([]); // reset ảnh
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
        onOk={() => form.submit()} // submit form
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        okText="CREATE"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Thumbnail */}
          <div>
            <span>Thumbnail</span>
            <SingleUpload
              image={thumbnail}
              setImage={setThumbnail}
            />
          </div>

          {/* Book Name */}
          <Form.Item
            label="Book Name"
            name="mainText"
            rules={[
              { required: true, message: "Please enter name of book!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Author */}
          <Form.Item
            label="Author"
            name="author"
            rules={[
              { required: true, message: "Please enter author!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Price */}
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price!" }]}
          >
            <InputNumber style={{ width: "100%" }} addonAfter="đ" />
          </Form.Item>

          {/* Quantity */}
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              { required: true, message: "Please enter quantity!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          {/* Category */}
          <Form.Item
            label="Category"
            name="category"
            rules={[
              { required: true, message: "Please choose type of book!" },
            ]}
          >
            <Select
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
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BookFormCreate;
