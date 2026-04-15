import { Drawer } from "antd";

const UserDetails = (props) => {
    const { userDetails, setUserDetails, isDetailsOpen, setIsDetailsOpen } = props;
    return (
      <Drawer
        title="User Details"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => {
          setIsDetailsOpen(false);
          setUserDetails(null);
        }}
        open={isDetailsOpen}
      >
        {userDetails ? (
          <>
            <p>ID: {userDetails._id}</p> <br />
            <p>FullName: {userDetails.fullName}</p> <br />
            <p>Email: {userDetails.email}</p> <br />
            <p>Phone: {userDetails.phone}</p> <br />
            <p>Role: {userDetails.role}</p> <br />
          </>
        ) : (
          <>
            <p>No data</p>
          </>
        )}
      </Drawer>
    );
}

export default UserDetails;