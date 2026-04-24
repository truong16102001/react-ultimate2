import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UsergroupAddOutlined,
  LoginOutlined,
  HomeOutlined,
  AuditOutlined,
  AliwangwangOutlined,
  PlusCircleOutlined 
} from "@ant-design/icons";
import { Menu, Avatar, Dropdown, Space } from "antd";
import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/api.service";
import { ROUTES } from "../../constants/router.constant";
const Header = () => {
  const [current, setCurrent] = useState("");
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // map route → key
  const routeMap = {
    home: ROUTES.HOME,
    users: ROUTES.USERS,
    books: ROUTES.BOOKS,
  };

  useEffect(() => {
    if (location?.pathname) {
      const found = Object.keys(routeMap).find((key) =>
        location.pathname.startsWith(routeMap[key]),
      );

      setCurrent(found || ROUTES.HOME);
    }
  }, [location]);

  const onClick = (e) => {
    setCurrent(e.key);
  };
  // handle dropdown click
  const handleMenuClick = async ({ key }) => {
    if (key === "logout") {
      try {
        await logoutAPI();
      } catch (error) {
        console.log("Logout API error:", error);
      } finally {
        logout();
        navigate(ROUTES.HOME);
      }
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
          icon: <AliwangwangOutlined />,
        },
      ]
    : [
        {
          key: "login",
          label: <Link to={ROUTES.LOGIN}>Login</Link>,
          icon: <LoginOutlined />,
        },
        {
          key: "register",
          label: <Link to={ROUTES.REGISTER}>Register</Link>,
          icon: <PlusCircleOutlined />,
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
      label: <Link to={ROUTES.HOME}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={ROUTES.USERS}>Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={ROUTES.BOOKS}>Books</Link>,
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
      style={{ justifyContent: "space-around" }}
    />
  );
};;

export default Header;
