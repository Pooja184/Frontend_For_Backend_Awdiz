import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../axios/axiosInstance.js";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await api.get(`/blogs/${id}`);
      setBlog(res.data.blog);
    };

    const fetchComments = async () => {
      const res = await api.get(`/blogs/${id}/comments`);
      setComments(res.data.comments || []);
    };

    fetchBlog();
    fetchComments();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!username || !text) return alert("Please fill all fields");

    await api.post(`/blogs/${id}/add-comment`, {
      username,
      text,
      parentCommentId: replyTo,
    });

    setText("");
    setReplyTo(null);

    const res = await api.get(`/blogs/${id}/comments`);
    setComments(res.data.comments || []);
  };

  const renderComments = (comments) =>
    comments.map((c) => (
      <div
        key={c._id}
        className="ml-4 mt-4 border-l border-gray-600 pl-4 space-y-2"
      >
        <div className="bg-white/10 p-3 rounded-lg shadow-md">
          <p className="text-sm text-gray-100">
            <span className="font-semibold text-blue-300">{c.username}</span>
          </p>
          <p className="text-gray-200 text-sm mt-1">{c.text}</p>

          <button
            onClick={() => setReplyTo(c._id)}
            className="text-xs text-blue-400 hover:text-blue-300 mt-1"
          >
            Reply
          </button>
        </div>

        {c.replies && c.replies.length > 0 && (
          <div className="ml-4 mt-2">{renderComments(c.replies)}</div>
        )}
      </div>
    ));

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-300 bg-gradient-to-br from-purple-700 to-blue-700">
        Loading blog details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-blue-700 p-8 text-white">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => navigate("/view-blogs")}
          className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-md"
        >
          ← Back
        </button>
      </div>

      {/* Blog Info */}
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 mb-10">
        <h1 className="text-4xl font-bold mb-3 text-white">{blog.title}</h1>
        <p className="text-gray-300 text-sm mb-2">by {blog.username}</p>
        <hr className="border-gray-500 mb-4" />
        <p className="text-gray-100 text-lg leading-relaxed">
          {blog.description}
        </p>
        <p className="mt-6 text-sm text-gray-400 italic">
          Published on {new Date(blog.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Comments Section */}
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-semibold mb-6 text-white border-b border-gray-500 pb-2">
          Comments
        </h2>

        {/* Comment Form */}
        <form
          onSubmit={handleComment}
          className="mb-8 bg-white/5 p-5 rounded-xl space-y-3"
        >
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg text-black focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <textarea
            placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-lg text-black focus:ring-2 focus:ring-blue-400 outline-none"
            rows="3"
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-all"
            >
              {replyTo ? "Reply" : "Comment"}
            </button>
            {replyTo && (
              <button
                type="button"
                onClick={() => setReplyTo(null)}
                className="text-red-300 hover:text-red-400 text-sm"
              >
                Cancel Reply
              </button>
            )}
          </div>
        </form>

        {/* Render Comments */}
        <div className="space-y-3">
          {comments.length > 0 ? (
            renderComments(comments)
          ) : (
            <p className="text-gray-300 italic text-sm">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
