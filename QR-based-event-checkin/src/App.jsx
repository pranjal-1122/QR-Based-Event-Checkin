import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import TicketPage from "./pages/TicketPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const App = () => {
  return <>
  <div className="bg-zinc-950 min-h-screen text-zinc-100">
      <Navbar/>
    

      <Routes>
        <Route path="/" element={<RegisterPage/>}/>
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/ticket/:id" element={<TicketPage/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
  </div>
  </>
}

export default App;