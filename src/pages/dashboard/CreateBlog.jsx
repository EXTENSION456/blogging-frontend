import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { handleCreateBlog } from "@/api/Blog";
import Form from "@/components/pages/Form";
import { useBlog } from "@/components/context/BlogContext";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const { handleFetchOwnBlogs , handleFetchAllBlogs } = useBlog();
  const navigate = useNavigate();

  // submit function which will be passed to Form component
  const onSubmit = async (data) => {
    console.log(data);
    const result = await handleCreateBlog(data);
    if (result) {
      handleFetchOwnBlogs();
      handleFetchAllBlogs();
      navigate("/dashboard");
    }
  };

  const conditionalRender = "create";

  return (
    <div className="flex justify-center items-center mt-4 bg-muted">
      <Card className="w-[280px] md:w-[550px] shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create Blog</CardTitle>
          <CardDescription>
            Fill in the fields below to submit your content.
          </CardDescription>
        </CardHeader>

        <Form onSubmit={onSubmit} state={conditionalRender} />
      </Card>
    </div>
  );
}
