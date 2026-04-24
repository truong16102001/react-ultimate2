import { useEffect, useState } from "react";
import { getBooksPaginateAPI } from "../services/api.service";
import BookTable from "../components/book/book.table";
import BookFormCreate from "../components/book/book.create.uncontrolled";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
      getBooks();
  }, [current, pageSize]); //[] + condition

  const getBooks = async () => {
    const res = await getBooksPaginateAPI(current, pageSize);
    if (res.data) {
      setBooks(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Book management</h1>
      <BookFormCreate getBooks={getBooks} />
      <BookTable
        books={books}
        getBooks={getBooks}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default Book;
