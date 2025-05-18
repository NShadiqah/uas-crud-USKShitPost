import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import DetailPost from "./pages/DetailPost";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<DetailPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
