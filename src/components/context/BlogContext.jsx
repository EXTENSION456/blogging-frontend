import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const BlogContext = createContext([]);

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const token = Cookies.get("token");

export const BlogProvider = ({ children }) => {
  const [selectedBlog, setSelectedBlog] = useState([]);

  const [blogs, setBlogs] = useState([]);

  const [allBlogs, setAllBlogs] = useState([]);

  const handleFetchOwnBlogs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/blog/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blog = response.data.blog.blog;
      setBlogs(blog);
    } catch (error) {
      console.log(error, "error in handleFetchOwnBlogs");
      toast.error(error.response.data.msg, {
        duration: 2000,
      });
    }
  };

  const handleFetchAllBlogs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/blog/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blog = response.data.blogs;
      setAllBlogs(blog);
    } catch (error) {
      console.log(error, "error in handleFetchOwnBlogs");
      toast.error(error.response.data.msg, {
        duration: 2000,
      });
    }
  };

  console.log(allBlogs);

  useEffect(() => {
    handleFetchOwnBlogs();
    handleFetchAllBlogs();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        selectedBlog,
        setSelectedBlog,
        blogs,
        setBlogs,
        handleFetchOwnBlogs,
        allBlogs,
        setAllBlogs,
        handleFetchAllBlogs
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
