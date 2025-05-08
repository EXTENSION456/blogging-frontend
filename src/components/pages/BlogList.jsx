import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const BlogList = ({ blogs }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/dashboard/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {blogs.map((blog) => (
        <Card key={blog._id} className="shadow-md hover:shadow-lg transition">
          {blog.imageUrl && (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-40 object-cover rounded-t-md"
            />
          )}
          <CardHeader>
            <CardTitle className="text-lg truncate">{blog.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 line-clamp-2">{blog.summary}</p>
          </CardContent>
          <CardFooter>
            <Button
              variant="link"
              onClick={() => handleClick(blog._id)}
              className="cursor-pointer"
            >
              Read more
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BlogList;
