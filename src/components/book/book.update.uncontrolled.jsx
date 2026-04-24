import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import SingleUpload from "../common/SingleUpload";
import { notifyError, notifySuccess } from "../../utils/notify";
import { updateBookAPI, uploadFileAPI } from "../../services/api.service";

const BookFormUpdate = (props) => {
  const { updateBook, setUpdateBook, isOpenModal, setIsOpenModal, getBooks } =
    props;

  const [form] = Form.useForm(); // form của antd
  const [thumbnail, setThumbnail] = useState([]);

  // fill data khi mở modal
  useEffect(() => {
    if (updateBook) {
      form.setFieldsValue({
        _id: updateBook._id,
        mainText: updateBook.mainText,
        author: updateBook.author,
        price: updateBook.price,
        quantity: updateBook.quantity,
        category: updateBook.category,
      });

      // thumbnail
      if (updateBook.thumbnail) {
        setThumbnail([
          {
            url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${updateBook.thumbnail}`,
          },
        ]);
      } else {
        setThumbnail([]);
      }
    }
  }, [updateBook]);

  // submit
  const handleUpdate = async (values) => {
    let thumbnailImg = updateBook.thumbnail;

    // upload nếu đổi ảnh
    if (thumbnail.length === 0) {
      thumbnailImg = "";
    } else if (thumbnail[0]?.file) {
      const formData = new FormData();
      formData.append("fileImg", thumbnail[0].file);

      const uploadRes = await uploadFileAPI(formData, "book");
      if (!uploadRes?.data) {
        notifyError("Upload thumbnail failed");
        return;
      }

      thumbnailImg = uploadRes.data.fileUploaded;
    }

    const payload = {
      ...values,
      thumbnail: thumbnailImg,
    };

    const res = await updateBookAPI(payload);

    if (res?.data) {
      notifySuccess("Update book successfully");

      form.resetFields();
      setThumbnail([]);
      setIsOpenModal(false);
      setUpdateBook(null);

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
    <Modal
      title="Update Book"
      open={isOpenModal}
      onOk={() => form.submit()} // 🔥 submit form
      onCancel={() => {
        setIsOpenModal(false);
        setUpdateBook(null);
        form.resetFields();
      }}
      maskClosable={false}
      okText="UPDATE"
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        {/* Thumbnail */}
        <div>
          <span>Thumbnail</span>
          <SingleUpload image={thumbnail} setImage={setThumbnail} />
        </div>

        <Form.Item label="ID" name="_id">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Book Name"
          name="mainText"
          rules={[{ required: true, message: "Không được để trống!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: "Không được để trống!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Không được để trống!" }]}
        >
          <InputNumber style={{ width: "100%" }} addonAfter="đ" />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Không được để trống!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Không được để trống!" }]}
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
  );
};

export default BookFormUpdate;
