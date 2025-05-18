import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface PostType {
  title: string;
  content: string;
  image: string;
  author: string;
  kategori: string;
  fakultas: string;
}

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostType>({
    title: "",
    content: "",
    image: "",
    author: "",
    kategori: "",
    fakultas: "",
  });
  const [originalPost, setOriginalPost] = useState<PostType | null>(null);

  useEffect(() => {
    fetch(`https://blog-api-production-f847.up.railway.app/api/posts/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setOriginalPost(data);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://blog-api-production-f847.up.railway.app/api/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        }
      );

      if (res.ok) {
        navigate("/");
      } else {
        const data = await res.json();
        alert("Gagal mengupdate post: " + (data.message || res.statusText));
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Terjadi kesalahan jaringan atau server tidak merespon.");
    }
  };

  if (!originalPost) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Edit Post</h2>
      <div className="mb-4">
        <h4>Original Post</h4>
        <p>
          <strong>Title:</strong> {originalPost.title}
        </p>
        <p>
          <strong>Image URL:</strong> {originalPost.image}
        </p>
        <p>
          <strong>Author:</strong> {originalPost.author}
        </p>
        <p>
          <strong>Kategori:</strong> {originalPost.kategori}
        </p>
        <p>
          <strong>Fakultas:</strong> {originalPost.fakultas}
        </p>
        <p>
          <strong>Content:</strong> {originalPost.content}
        </p>
      </div>
      <h4>Edit Post</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            className="form-control"
            name="image"
            value={post.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            className="form-control"
            name="author"
            value={post.author}
            onChange={handleChange}
            placeholder="Author"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kategori</label>
          <select
            className="form-select"
            name="kategori"
            value={post.kategori}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Pilih Kategori
            </option>
            <option value="Shitpost USK">Shitpost USK</option>
            <option value="Informasi USK">Informasi USK</option>
            <option value="Hiburan">Hiburan</option>
            <option value="Lain-lain">Lain-lain</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Fakultas</label>
          <select
            className="form-select"
            name="fakultas"
            value={post.fakultas}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Pilih Fakultas
            </option>
            <option value="Umum">Umum</option>
            <option value="Ekonomi dan Bisnis (FEB)">
              Ekonomi dan Bisnis (FEB)
            </option>
            <option value="Hukum (FH)">Hukum (FH)</option>
            <option value="Keguruan dan Ilmu Pendidikan (FKIP)">
              Keguruan dan Ilmu Pendidikan (FKIP)
            </option>
            <option value="Teknik (FT)">Teknik (FT)</option>
            <option value="Kedokteran (FK)">Kedokteran (FK)</option>
            <option value="Pertanian (FP)">Pertanian (FP)</option>
            <option value="Matematika dan Ilmu Pengetahuan Alam (FMIPA)">
              Matematika dan Ilmu Pengetahuan Alam (FMIPA)
            </option>
            <option value="Kedokteran Hewan (FKH)">
              Kedokteran Hewan (FKH)
            </option>
            <option value="Kelautan dan Perikanan (FKP)">
              Kelautan dan Perikanan (FKP)
            </option>
            <option value="Ilmu Sosial dan Ilmu Politik (FISIP)">
              Ilmu Sosial dan Ilmu Politik (FISIP)
            </option>
            <option value="Keperawatan (FKep)">Keperawatan (FKep)</option>
            <option value="Kedokteran Gigi (FKG)">Kedokteran Gigi (FKG)</option>
            <option value="Ilmu Kelautan (FIK)">Ilmu Kelautan (FIK)</option>
            <option value="Psikologi (FPsi)">Psikologi (FPsi)</option>
            <option value="Ilmu Budaya (FIB)">Ilmu Budaya (FIB)</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            name="content"
            rows={4}
            value={post.content}
            onChange={handleChange}
            placeholder="Content"
            required
          />
        </div>
        <button className="btn btn-success" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;
