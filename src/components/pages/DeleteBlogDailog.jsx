import React from "react";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { deleteBlog } from "@/api/Blog";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
// import { useBlog } from "../context/BlogContext";

export const DeleteBlogDailog = ({ data }) => {
  var { setBlogs, handleFetchAllBlogs } = useBlog();
  const navigate = useNavigate();

  const handleClick = async () => {
    const boolResponse = await deleteBlog(data._id);
    await handleFetchAllBlogs();
    console.log(boolResponse);
    if (boolResponse) {
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== data._id)
      );
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Blog</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{data.title}</strong>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={handleClick}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};
