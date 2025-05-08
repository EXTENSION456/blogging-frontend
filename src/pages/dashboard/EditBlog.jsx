import { editBlog } from "@/api/Blog";
import { useBlog } from "@/components/context/BlogContext";
import Form from "@/components/pages/Form";
import {
  CardDescription,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const { selectedBlog, handleFetchOwnBlogs, setSelectedBlog } = useBlog();
  const { id } = useParams();
  const navigate = useNavigate();

  const conditionalRender = "edit";

  const onSubmit = async (data) => {
    const response = await editBlog(id, data, selectedBlog, setSelectedBlog);
    if (response) {
      handleFetchOwnBlogs();
      navigate(`/dashboard/${id}`);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-4 bg-muted">
        <Card className="w-[280px] md:w-[550px] shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Edit Blog</CardTitle>
            <CardDescription>
              Fill in the fields below to edit the blog.
            </CardDescription>
          </CardHeader>

          <Form onSubmit={onSubmit} state={conditionalRender} />
        </Card>
      </div>
    </div>
  );
};

export default EditBlog;
