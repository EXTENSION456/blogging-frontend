import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { useBlog } from "@/components/context/BlogContext";
import { Button } from "@/components/ui/button";
import { DeleteBlogDailog } from "@/components/pages/DeleteBlogDailog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const Blog = ({ data }) => {
  const navigate = useNavigate();
  const { setSelectedBlog } = useBlog();
  const { id } = useParams();

  const handleClick = () => {
    setSelectedBlog(data);
    navigate(`/dashboard/${data._id}/`);
  };

  const handleEdit = () => {
    setSelectedBlog(data);
    navigate(`/dashboard/${data._id}/edit`);
  };

  const isActive = id === data._id;

  return (
    <div
      className={`border p-2 rounded-md flex justify-between items-center gap-2 hover:bg-gray-100 transition ${
        isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"
      }`}
    >
      <button
        onClick={handleClick}
        className="flex-1 text-left truncate capitalize cursor-pointer"
      >
        {data.title}
      </button>

      <div className="flex items-center gap-1">
        {/* Edit Button */}
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer hover:bg-blue-100"
          onClick={handleEdit}
        >
          <RiEdit2Line className="text-blue-600" />
        </Button>

        {/* Delete Dialog Trigger */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer hover:bg-red-100"
            >
              <RiDeleteBin6Line className="text-red-600" />
            </Button>
          </DialogTrigger>
          <DeleteBlogDailog data={data} />
        </Dialog>
      </div>
    </div>
  );
};

export default Blog;
