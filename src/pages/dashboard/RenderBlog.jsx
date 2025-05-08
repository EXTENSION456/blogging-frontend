import { handleFetchParticularBlogs } from "@/api/Blog";
import { useBlog } from "@/components/context/BlogContext";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const RenderBlog = () => {
  const { selectedBlog, setSelectedBlog } = useBlog();

  const { id } = useParams();

  console.log(selectedBlog);

  const fetchBlogs = async () => {
    await handleFetchParticularBlogs(id, setSelectedBlog);
  };

  useEffect(() => {
    if (selectedBlog.length === 0) {
      fetchBlogs();
    }
  }, []);

  return (
    <div className="flex flex-col justify-start mt-5 gap-4 items-center px-4 max-w-4xl mx-auto">
      <h1 className="font-bold text-2xl sm:text-3xl text-center capitalize">
        {selectedBlog.title}
      </h1>

      <h2 className="text-sm sm:text-base text-center text-gray-600 capitalize">
        {selectedBlog.summary}
      </h2>

      {selectedBlog.imageUrl && (
        <img
          src={selectedBlog.imageUrl}
          alt="Blog image"
          className="w-full max-h-[300px] object-cover rounded-md"
        />
      )}

      <p className="text-sm sm:text-base text-justify leading-relaxed">
        {selectedBlog.description}
      </p>
    </div>
  );
};

export default RenderBlog;
