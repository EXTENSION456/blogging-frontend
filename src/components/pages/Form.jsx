import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useBlog } from "../context/BlogContext";

const Form = ({ onSubmit, state }) => {
  const { selectedBlog } = useBlog();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [previewUrl, setPreviewUrl] = useState();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  useEffect(() => {
    if (state === "edit") {
      setValue("title", selectedBlog?.title || "");
      setValue("summary", selectedBlog?.summary || "");
      setValue("description", selectedBlog?.description || "");
      setValue("imageUrl", selectedBlog?.imageUrl || "");

      if (selectedBlog.imageUrl) {
        setPreviewUrl(selectedBlog?.imageUrl);
      }
    }
  }, [selectedBlog]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <div className="grid w-full gap-3">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Input
              id="summary"
              placeholder="Short summary"
              {...register("summary", { required: "Summary is required" })}
            />
            {errors.summary && (
              <p className="text-sm text-red-500">{errors.summary.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Write a detailed description"
              {...register("description", {
                required: "Description is required",
              })}
              className="h-28"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="photo">Photo</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              {...register("imageUrl")}
              onChange={handlePhotoChange}
            />
            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
            )}

            {previewUrl && (
              <img
                src={previewUrl}
                alt="preview"
                className="mt-2 w-full max-h-60 object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="w-full mt-3">
        <Button type="submit" className="w-full font-medium cursor-pointer">
          Submit
        </Button>
      </CardFooter>
    </form>
  );
};

export default Form;
