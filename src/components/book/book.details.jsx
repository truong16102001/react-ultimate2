import { Drawer, Image } from "antd";

const BookDetails = (props) => {
  const { bookDetails, isDetailsOpen, setIsDetailsOpen, setBookDetails } =
    props;

  return (
    <Drawer
      width={"40vw"}
      title="Book Details"
      onClose={() => {
        setIsDetailsOpen(false);
        setBookDetails(null);
      }}
      open={isDetailsOpen}
    >
      {bookDetails ? (
        <>
          <p>
            <b>ID:</b> {bookDetails._id}
          </p>
          <br />
          <p>
            <b>Name:</b> {bookDetails.mainText}
          </p>
          <br />
          <p>
            <b>Author:</b> {bookDetails.author}
          </p>
          <br />
          <p>
            <b>Category:</b> {bookDetails.category}
          </p>
          <br />
          <p>
            <b>Price:</b> {bookDetails.price.toLocaleString()} đ
          </p>
          <br />
          <p>
            <b>Sold:</b> {bookDetails.sold}
          </p>
          <br />
          <p>
            <b>Quantity:</b> {bookDetails.quantity}
          </p>
          <br />
          <p>
            <b>Thumbnail:</b>
          </p>
          <Image
            width={150}
            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookDetails.thumbnail}`}
          />
          <br />
          <p>
            <b>Slider:</b>
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {bookDetails.slider?.map((img, i) => (
              <Image
                key={i}
                width={100}
                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${img}`}
              />
            ))}
          </div>
        </>
      ) : (
        <p>No data</p>
      )}
    </Drawer>
  );
};

export default BookDetails;
