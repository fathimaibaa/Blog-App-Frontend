import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/allposts") // Replace with your API endpoint
      .then(response => setPosts(response.data))
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Latest Blogs</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.slice(0, 5).map((post, index) => (
          <div
            key={post.id}
            className={`relative overflow-hidden rounded-lg shadow-lg ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
          >
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
              <h2 className="text-white text-lg font-semibold">{post.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <a
          href="/all-posts"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          View All Posts →
        </a>
      </div>
    </div>
  );
};

export default Home;
