import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Navbar from "./components/layout/NavBar";
import Welcome from "./components/layout/Welcome";
import Footer from "./components/layout/Footer";
import NotFound from "./pages/NotFound";
import Movies from "./pages/Movies";
import Members from "./pages/Members";
import Users from "./pages/Users";

function App() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return (
      <div>
        <Login />
      </div>
    );
  } else
    return (
      <Router>
        <div className="flex flex-col h-screen">
          <Navbar />
          <Welcome />
          <main className="flex mx-auto ">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/main" element={<Main />} />
              <Route path="/" element={<Main />} />
              <Route exact path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<Movies />} />
              <Route exact path="/members" element={<Members />} />
              <Route path="/users" element={<Users />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    );
}

export default App;
