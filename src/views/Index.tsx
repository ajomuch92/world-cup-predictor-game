import NavHeader from '../components/NavHeader';
import { Outlet } from "react-router-dom";

const Index = () => {
  return (
    <main className="container-fluid">
      <NavHeader />
      <Outlet />
    </main>
  );
};

export default Index;