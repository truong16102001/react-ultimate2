import { NavLink } from "react-router-dom";
import "./header.css";
const Header = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/manage/users">Users</NavLink>
        </li>
        <li>
          <NavLink to="/manage/books">Books</NavLink>
        </li>
      </ul>
    </>
  );
};

export default Header;