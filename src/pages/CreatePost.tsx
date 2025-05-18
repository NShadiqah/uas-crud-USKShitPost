import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    author: "",
    kategori: "Shitpost USK", // Set default value to a valid enum
    fakultas: "Umum", // Set default value to a valid enum
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://blog-api-production-f847.up.railway.app/api/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        navigate("/");
      } else {
        console.error("Error response:", data);
        alert("Gagal membuat post: " + (data.message || res.statusText));
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Terjadi kesalahan jaringan atau server tidak merespon.");
    }
  };

  return (
    <div className="container">
      <h2>Buat Post Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Judul</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Konten</label>
          <textarea
            className="form-control"
            name="content"
            rows={4}
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL Gambar</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Penulis</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kategori</label>
          <select
            className="form-select"
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Pilih Kategori</option>
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
            value={formData.fakultas}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Pilih Fakultas</option>
            <option value="Umum">Umum</option>
            <option value="Ekonomi dan Bisnis (FEB)">Ekonomi dan Bisnis (FEB)</option>
            <option value="Hukum (FH)">Hukum (FH)</option>
            <option value="Keguruan dan Ilmu Pendidikan (FKIP)">Keguruan dan Ilmu Pendidikan (FKIP)</option>
            <option value="Teknik (FT)">Teknik (FT)</option>
            <option value="Kedokteran (FK)">Kedokteran (FK)</option>
            <option value="Pertanian (FP)">Pertanian (FP)</option>
            <option value="Matematika dan Ilmu Pengetahuan Alam (FMIPA)">Matematika dan Ilmu Pengetahuan Alam (FMIPA)</option>
            <option value="Kedokteran Hewan (FKH)">Kedokteran Hewan (FKH)</option>
            <option value="Kelautan dan Perikanan (FKP)">Kelautan dan Perikanan (FKP)</option>
            <option value="Ilmu Sosial dan Ilmu Politik (FISIP)">Ilmu Sosial dan Ilmu Politik (FISIP)</option>
            <option value="Keperawatan (FKep)">Keperawatan (FKep)</option>
            <option value="Kedokteran Gigi (FKG)">Kedokteran Gigi (FKG)</option>
            <option value="Ilmu Kelautan (FIK)">Ilmu Kelautan (FIK)</option>
            <option value="Psikologi (FPsi)">Psikologi (FPsi)</option>
            <option value="Ilmu Budaya (FIB)">Ilmu Budaya (FIB)</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;