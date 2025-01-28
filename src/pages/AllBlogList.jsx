import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import BlogList from "../components/Blog/BlogList";
import { axiosInstance } from "../utils/axios";
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

  // Handle Search
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
          return new Date(b.date) - new Date(a.date);
        }
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
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
      <div className="mt-[6rem] w-full flex flex-col items-center gap-[2rem]">
        {/* Search */}
        <input
          type="text"
          placeholder="Search blogs..."
          className="p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sort */}
        <select
          className="p-2 border rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="date">Date</option>
          <option value="title">Title</option>
        </select>

        {/* Filter */}
        <select
          className="p-2 border rounded"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="">Filter By Category</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Finance">Finance</option>
        </select>

        {/* Blog List */}
        {loading ? (
          <div>..........Loading</div>
        ) : (
          <>
            {currentPosts.map((post) => (
              <BlogList key={post._id} post={post} />
            ))}
          </>
        )}

        {/* Pagination */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`p-2 border rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllBlogList;
