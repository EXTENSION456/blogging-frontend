import { useBlog } from "@/components/context/BlogContext";
import BlogList from "@/components/pages/BlogList";
import React, { useEffect } from "react";

const DashboardHome = () => {
  const { allBlogs, blogs, handleFetchOwnBlogs, handleFetchAllBlogs } =
    useBlog();

  useEffect(() => {
    if (blogs.length === 0) {
      handleFetchOwnBlogs();
    }
    if (allBlogs.length === 0) {
      handleFetchAllBlogs();
    }
  }, []);

  return (
    <div className="p-6 md:p-6">
      <BlogList blogs={allBlogs} />
    </div>
  );
};

export default DashboardHome;
