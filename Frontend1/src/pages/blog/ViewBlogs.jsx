import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axios/axiosInstance.js";

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs/get-blogs");
        console.log("Response:", res.data);
        setBlogs(res.data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-700">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
      <h1 className="text-3xl font-semibold text-center mb-8">All Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-white/80 text-lg">No blogs found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() => navigate(`/blogs/${blog._id}`)} // ✅ navigate to details page
              className="bg-white text-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Author:</span> {blog.username}
              </p>
              <p className="text-gray-700 mb-3 truncate">{blog.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(blog.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBlogs;
