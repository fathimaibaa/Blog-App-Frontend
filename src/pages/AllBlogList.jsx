import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import BlogList from "../components/Blog/BlogList";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";

function AllBlogList() {
  const [allposts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Number of posts per page

  const { loading, data, error, apiCall } = useAxios();

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        await apiCall("/allposts");
      } catch (error) {
        console.error(error);
      }
    };
    getAllBlogs();
  }, []);

  useEffect(() => {
    if (data?.success) {
      setPosts(data.posts);
      setFilteredPosts(data.posts);
    }
    if (error) {
      toast.error(error);
    }
  }, [data, error]);

  // Handle Search, Filter, and Sort
  useEffect(() => {
    let updatedPosts = [...allposts];
    if (search) {
      updatedPosts = updatedPosts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterBy) {
      updatedPosts = updatedPosts.filter((post) => post.category === filterBy);
    }
    if (sortBy) {
      updatedPosts.sort((a, b) => {
        if (sortBy === "date") {
          return new Date(b.date) - new Date(a.date); // Descending order
        }
        if (sortBy === "title") {
          return a.title.localeCompare(b.title); // Alphabetical order
        }
        return 0;
      });
    }
    setFilteredPosts(updatedPosts);
  }, [search, sortBy, filterBy, allposts]);

  // Handle Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <>
      <Navbar />
      <div className="mt-24 w-full px-4 flex flex-col items-center gap-6">
        {/* Filters Section */}
        <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full sm:w-1/3 p-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Filter */}
          <select
            className="w-full sm:w-1/3 p-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="">Filter By Category</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
          </select>

          {/* Sort */}
          <select
            className="w-full sm:w-1/3 p-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="title">Title</option>
          </select>
        </div>

        {/* Blog List */}
        <div className="w-full max-w-3xl">
          {loading ? (
            <div className="text-center text-lg font-medium">Loading...</div>
          ) : (
            <div className="grid gap-6">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <BlogList key={post._id} post={post} />
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No blogs found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`p-2 border rounded-lg shadow ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-600"
                } hover:bg-blue-100`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AllBlogList;
