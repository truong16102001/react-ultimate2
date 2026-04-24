import { Input, InputNumber, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import SingleUpload from "../common/SingleUpload";
import { notifyError, notifySuccess } from "../../utils/notify";
import { updateBookAPI, uploadFileAPI } from "../../services/api.service";

const BookFormUpdate = (props) => {
    const { updateBook, setUpdateBook, isOpenModal, setIsOpenModal, getBooks } =
      props;
    const [form, setForm] = useState({
        _id: "",
        mainText: "",
        author: "",
        price: 0,
        quantity: 0,
        thumbnail: "",
        category:""
    });
    const [thumbnail, setThumbnail] = useState([]);

     // useEffect run if updateBook change value
      useEffect(() => {
        if (updateBook) {
          setForm({
            _id: updateBook._id || "",
            mainText: updateBook.mainText || "",
            author: updateBook.author || "",
            price: updateBook.price || 0,
            quantity: updateBook.quantity || 0,
            thumbnail: updateBook.thumbnail || "",
            category:updateBook.category || ""
          });

          // fill thumbnail
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

    const handleChange = (key, value) => {
      setForm({
        ...form,
        [key]: value,
      });
    };

    const handleUpdateBtnClicked = async () => {
      //step 1: upload file
      let thumbnailImg = form.thumbnail; // if not change avatar
      if (thumbnail.length === 0) {
        // if without an avatar
        thumbnailImg = "";
      } else if (thumbnail[0]?.file) {
        // if change thumbnail
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
        ...form,
        thumbnail: thumbnailImg,
      };
      const res = await updateBookAPI(payload);
      if (res?.data) {
        notifySuccess("Update book successfully");
        // reset form
        setForm({
          _id: "",
          mainText: "",
          author: "",
          price: 0,
          quantity: 0,
          thumbnail: "",
          category: "",
        });
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
      <div className="user-form-update" style={{ margin: "20px 0" }}>
        <Modal
          title="Update Book"
          open={isOpenModal}
          onOk={handleUpdateBtnClicked}
          onCancel={() => {
            setIsOpenModal(false);
            setUpdateBook(null);
          }}
          maskClosable={false}
          okText={"UPDATE"}
        >
          <div
            style={{ display: "flex", gap: "15px", flexDirection: "column" }}
          >
            <div>
              <span>Thumbnail</span>
              <SingleUpload image={thumbnail} setImage={setThumbnail} />
            </div>

            <div>
              <span>ID</span>
              <Input value={form._id} disabled />
            </div>

            <div>
              <span>Book Name</span>
              <Input
                value={form.mainText}
                onChange={(e) => handleChange("mainText", e.target.value)}
              />
            </div>

            <div>
              <span>Author</span>
              <Input
                value={form.author}
                onChange={(e) => handleChange("author", e.target.value)}
              />
            </div>

            <div>
              <div>Price</div>
              <InputNumber
                style={{ width: "100%" }}
                addonAfter={" đ"}
                value={form.price}
                onChange={(value) => handleChange("price", value)}
              />
            </div>

            <div>
              <div>Quantity</div>
              <InputNumber
                style={{ width: "100%" }}
                value={form.quantity}
                onChange={(value) => handleChange("quantity", value)}
              />
            </div>

            <div>
              <div>Category</div>
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
}

export default BookFormUpdate;