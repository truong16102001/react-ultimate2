import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UsergroupAddOutlined,
  HomeOutlined,
  AuditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Avatar, Dropdown, Space } from "antd";
import { AuthContext } from "../context/auth.context";
const Header = () => {
  const [current, setCurrent] = useState("");
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const onClick = (e) => {
    setCurrent(e.key);
  };
  // handle dropdown click
  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      logout();
      navigate("/login");
    }
  };

  // dropdown menu items
  const menuItems = isAuthenticated
    ? [
        {
          key: "profile",
          label: (
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                padding: "5px 0",
              }}
            >
              <Avatar
                size={50}
                src={
                  user?.avatar
                    ? `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`
                    : null
                }
              >
                {!user?.avatar && user?.fullName?.charAt(0)?.toUpperCase()}
              </Avatar>

              <div>
                <div style={{ fontWeight: 600 }}>{user?.fullName}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{user?.email}</div>
              </div>
            </div>
          ),
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          label: "Logout",
        },
      ]
    : [
        {
          key: "login",
          label: <Link to="/login">Login</Link>,
        },
        {
          key: "register",
          label: <Link to="/register">Register</Link>,
        },
      ];

  // avatar hiển thị trên header
  const avatarNode = (
    <Dropdown
      menu={{ items: menuItems, onClick: handleMenuClick }}
      trigger={["hover"]}
      placement="bottomRight"
    >
      <div style={{ cursor: "pointer" }}>
        <Avatar
          src={
            user?.avatar
              ? `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`
              : null
          }
        >
          {!user?.avatar && user?.fullName?.charAt(0)?.toUpperCase()}
        </Avatar>
      </div>
    </Dropdown>
  );

  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: "books",
      icon: <AuditOutlined />,
    },
    {
      label: avatarNode,
      key: "avatar",
    },
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{ justifyContent: "space-between" }}
    />
  );
};

export default Header;
