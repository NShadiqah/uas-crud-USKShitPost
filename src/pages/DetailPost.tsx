import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const DetailPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://blog-api-production-f847.up.railway.app/api/posts/id/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(
          `https://blog-api-production-f847.up.railway.app/api/posts/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("Post deleted successfully");
          navigate("/"); // Redirect to home or posts list after deletion
        } else {
          alert("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("An error occurred while deleting the post");
      }
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{post.title}</h2>
      <p>
        <strong>Author:</strong> {post.author}
      </p>
      <p>
        <strong>Kategori:</strong> {post.kategori}
      </p>
      <p>
        <strong>Fakultas:</strong> {post.fakultas}
      </p>
      <img src={post.image} alt={post.title} className="img-fluid mb-3" />
      <p>{post.content}</p>
      <div className="d-flex gap-2">
        <Link to={`/edit/${post._id}`} className="btn btn-warning">
          Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DetailPost;
