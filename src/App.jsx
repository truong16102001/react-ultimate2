import { Outlet } from 'react-router-dom';
import Footer from './components/layout/footer.jsx';
import Header from './components/layout/header.jsx';
import { AuthContext } from './components/context/auth.context.jsx';
import { useContext, useEffect } from 'react';
import { getAccountByAccessTokenAPI } from './services/api.service.js';
import { COMMON } from './constants/api.constant.js';
import { Spin } from "antd";

function App() {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
  
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const delay = (milSeconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, milSeconds);
    });
  };

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsAppLoading(false);
      return;
    }
    const res = await getAccountByAccessTokenAPI();
    await delay(COMMON.AUTH_DELAY);
    if (res.data) {
      //success
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  };

  return (
    <>
      {isAppLoading === true ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin />
        </div>
      ) : (
        <>
          {" "}
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
