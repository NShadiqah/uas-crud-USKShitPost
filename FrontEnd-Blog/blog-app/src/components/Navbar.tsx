import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Post {
  kategori: string;
}

const Navbar = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://blog-api-production-f847.up.railway.app/api/posts")
      .then((res) => res.json())
      .then((data: Post[]) => {
        const uniqueCategories = Array.from(new Set(data.map((post) => post.kategori)));
        setCategories(uniqueCategories);
      });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">USK SH*tPost</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/create">+ Create</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
