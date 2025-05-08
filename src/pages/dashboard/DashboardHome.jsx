import { useBlog } from "@/components/context/BlogContext";
import BlogList from "@/components/pages/BlogList";
import React from "react";

const DashboardHome = () => {
  const { allBlogs } = useBlog();

  return (
    <div className="p-6 md:p-6">
      <BlogList blogs={allBlogs} />
    </div>
  );
};

export default DashboardHome;
