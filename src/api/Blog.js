import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const token = Cookies.get("token");

export const handleCreateBlog = async (data) => {
  const toastId = toast.loading("Uploading...");
  try {
    const totalData = {
      ...data,
      imageUrl: data.imageUrl[0],
    };

    console.log(totalData, "totalData");
    const formData = new FormData();
    formData.append("title", totalData.title);
    formData.append("summary", totalData.summary);
    formData.append("description", totalData.description);
    formData.append("imageUrl", totalData.imageUrl);

    const response = await axios.post(`${backendUrl}/apiblog/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    toast.dismiss(toastId);

    if (response.status === 200 || response.status === 201) {
      toast.success("created successfully!", {
        duration: 2000,
      });
      return true;
    }
  } catch (error) {
    toast.dismiss(toastId);
    console.log(error, "error in handleCreateBlog");

    toast.error(error.response.data.msg, {
      duration: 2000,
    });
    return false;
  }
};

export const deleteBlog = async (id) => {
  const toastId = toast.loading("Deleting...");
  try {
    const response = await axios.delete(`${backendUrl}/apiblog/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.dismiss(toastId);

    if (response.status === 200 || response.status === 201) {
      toast.success("Deleted successfully!", {
        duration: 2000,
      });
      return true;
    }
  } catch (error) {
    toast.dismiss(toastId);
    console.log(error, "error in deleteBlog");
    toast.error(error.response.data.msg, {
      duration: 2000,
    });
    return false;
  }
};

export const editBlog = async (id, data, selectedBlog, setSelectedBlog) => {
  const toastId = toast.loading("Editing...");
  try {
    const formData = new FormData();
    if (data.title && data.title !== selectedBlog.title) {
      formData.append("title", data.title);
    }
    if (data.summary && data.summary !== selectedBlog.summary) {
      formData.append("summary", data.summary);
    }
    if (data.description && data.description !== selectedBlog.description) {
      formData.append("description", data.description);
    }
    if (data.imageUrl instanceof FileList && data.imageUrl.length > 0) {
      formData.append("imageUrl", data.imageUrl[0]);
    }

    if ([...formData.keys()].length === 0) {
      toast.dismiss(toastId);
      toast("No changes made", { duration: 2000 });
      return false;
    }

    const response = await axios.put(
      `${backendUrl}/apiblog/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.dismiss(toastId);

    if (response.status === 200 || response.status === 201) {
      toast.success("edited successfully!", {
        duration: 2000,
      });

      setSelectedBlog(response.data.blog);
      return true;
    }
  } catch (error) {
    toast.dismiss(toastId);
    console.log(error, "error in handleCreateBlog");

    toast.error(error.response.data.msg, {
      duration: 2000,
    });
    return false;
  }
};

export const handleFetchParticularBlogs = async (id, setSelectedBlog) => {
  try {
    const response = await axios.get(`${backendUrl}/apiblog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blog = response.data.blog;
    setSelectedBlog(blog);
  } catch (error) {
    console.log(error, "error in handleFetchOwnBlogs");
    toast.error(error.response.data.msg, {
      duration: 2000,
    });
  }
};
