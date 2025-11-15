import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white font-poppins">
      <h1 className="text-3xl font-semibold mb-10 text-center">Welcome to Blog App</h1>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => navigate('/add-blog')} 
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-transform transform hover:scale-105 shadow-md"
        >
          Add Blog
        </button>

        <button 
          onClick={() => navigate('/view-blogs')} 
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-transform transform hover:scale-105 shadow-md"
        >
          View Blogs
        </button>
      </div>
    </div>
  );
};

export default Home;
