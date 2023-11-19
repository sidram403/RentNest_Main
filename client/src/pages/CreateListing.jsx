
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    metadata: {
      parentId:"server-0987"
    },
    message: "",
    level: "",
    resourceId: "",
    timestamp:"2023-09-15T08:00:00Z",
    traceId:"",
    spanId:"span-456",
    commit:"",

  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  


  

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData
          
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/search`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Message"
            className="border p-3 rounded-lg"
            id="message"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.message}
          />
          <input
            type="text"
            placeholder="Level"
            className="border p-3 rounded-lg"
            id="level"
            required
            onChange={handleChange}
            value={formData.level}
          />
          <input
            type="text"
            placeholder="Resource Id"
            className="border p-3 rounded-lg"
            id="resourceId"
            required
            onChange={handleChange}
            value={formData.resourceId}
          />
           <input
            type="text"
            placeholder="Trace Id"
            className="border p-3 rounded-lg"
            id="traceId"
            required
            onChange={handleChange}
            value={formData.traceId}
          />
           <input
            type="text"
            placeholder="Commit"
            className="border p-3 rounded-lg"
            id="commit"
            required
            onChange={handleChange}
            value={formData.commit}
          />
          
        </div>
        <div className="flex flex-col flex-1 gap-4">
         
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
