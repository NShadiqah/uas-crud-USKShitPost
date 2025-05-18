import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  kategori: string;
  fakultas: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://blog-api-production-f847.up.railway.app/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Daftar Postingan</h1>
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4" key={post._id}>
            <div className="card mb-4">
              <img
                src={post.image}
                className="card-img-top"
                alt={post.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text text-truncate">{post.content}</p>
                <Link to={`/post/${post._id}`} className="btn btn-sm btn-info">
                  Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
