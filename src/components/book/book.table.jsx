import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Image, Popconfirm, Table } from "antd";
import { notifyError, notifySuccess } from "../../utils/notify";
import { deleteBookAPI } from "../../services/api.service";
import BookDetails from "./book.details";
import { useState } from "react";
import './book.css'
import BookFormUpdate from "./book.update.uncontrolled";

const BookTable = (props) => {
  const { books, getBooks, current, pageSize, total, setCurrent, setPageSize } = props;
    const [bookDetails, setBookDetails] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [updateBook, setUpdateBook] = useState(null);
  const columns = [
    {
      title: "No",
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (value) => {
        return (
          <Image
            width={60}
            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${value}`}
            preview={false}
          />
        );
      },
    },
    {
      title: "Book Name",
      dataIndex: "mainText",
      ellipsis: true,
      sorter: (a, b) => a.mainText.localeCompare(b.mainText),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text, record, index, action) => {
        if (text)
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text);
      },
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Sold",
      dataIndex: "sold",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div
          style={{ display: "flex", gap: "15px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <EditOutlined
            style={{ cursor: "pointer", color: "orange" }}
            onClick={(e) => {
              setUpdateBook(record);
              setIsOpenModal(true);
            }}
          />

          <Popconfirm
            title="Delete Book"
            description="Are you sure to delete this book?"
            onConfirm={() => handleDeleteBook(record._id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined
              style={{ cursor: "pointer", color: "red" }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  // ===== delete =====
  const handleDeleteBook = async (id) => {
    const res = await deleteBookAPI(id);
    if (res?.data) {
      notifySuccess("Delete book successfully");

      if (books.length === 1 && current > 1) {
        setCurrent(current - 1);
      } else {
        await getBooks();
      }
    } else {
      const errors = res?.message;
      const errorMessage = Array.isArray(errors)
        ? errors.map((e, i) => <div key={i}>- {e}</div>)
        : errors;
      notifyError(errorMessage);
    }
  };

  // ===== pagination change =====
  const onChange = (pagination) => {
    if (pagination?.current && +pagination.current !== +current) {
      setCurrent(+pagination.current);
    }

    if (pagination?.pageSize && +pagination.pageSize !== +pageSize) {
      setPageSize(+pagination.pageSize);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={books}
        rowKey="_id"
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
        onRow={(record) => {
          return {
            onClick: () => {
              setBookDetails(record);
              setIsDetailsOpen(true);
            },
          };
        }}
        rowClassName={() => "clickable-row"}
      />
      <BookDetails
        bookDetails={bookDetails}
        isDetailsOpen={isDetailsOpen}
        setIsDetailsOpen={setIsDetailsOpen}
        setBookDetails={setBookDetails}
      />

      <BookFormUpdate
        updateBook={updateBook}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setUpdateBook={setUpdateBook}
        getBooks={getBooks}
      />
    </>
  );
};

export default BookTable;