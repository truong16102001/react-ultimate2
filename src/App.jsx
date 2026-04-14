import { Outlet } from 'react-router-dom';
import Footer from './components/layout/footer.jsx';
import Header from './components/layout/header.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
