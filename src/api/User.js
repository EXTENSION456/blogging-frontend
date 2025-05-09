import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const handleLoginFunction = async (cred, navigate) => {
  const data = {
    email: cred.email,
    password: cred.password,
  };

  try {
    const response = await axios.post(`/api/auth/login`, data, {
      withCredentials: true,
    });

    console.log(response.data);
    const token = response.data.token;

    if (response.status === 200) {
      toast.success("Logged in successfully!", {
        duration: 2000,
      });

      Cookies.set("token", token, {
        expires: 0.25, // 6 hrs
        sameSite: "Strict", // adjust as needed
        path: "/", // available on all routes
      });
    }

    Cookies.set("userId", response.data.user._id);

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  } catch (error) {
    console.error("Error during login:", error);
    toast.error(error.response.data.msg, {
      duration: 2000,
    });
  }
};

export const handleSignupFunction = async (cred, setRenderOtpPage) => {
  const data = {
    email: cred.email,
    password: cred.password,
    name: cred.name,
    phone: "+91" + cred.phone,
  };

  try {
    const response = await axios.post(`/api/auth/signup`, data);
    console.log(response.data);

    if (response.status === 200) {
      setRenderOtpPage(true);
      toast.success("Signed up successfully! Otp Sent", {
        duration: 2000,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    toast.error(error.response.data.msg, {
      duration: 2000,
    });
  }
};

export const handleVerifyOtp = async (cred, navigate) => {
  const data = {
    phone: "+91" + cred.phone,
    otp: cred.otp,
  };

  try {
    const response = await axios.post(`/api/auth/verifyOtp`, data);
    console.log(response.data);

    if (response.status === 200) {
      toast.success("Otp verified!!!", {
        duration: 2000,
      });
    }

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (error) {
    console.error("Error during login:", error);
    toast.error(error.response.data.msg, {
      duration: 2000,
    });
  }
};

export const handleForgotPassword = async (data) => {
  try {
    const response = await axios.post(
      `/api/auth/forgot-password`,
      data
    );

    if (response.status === 200) {
      toast.success("Password link sent via email !!!", {
        duration: 2000,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    toast.error(error.response.data.msg, {
      duration: 2000,
    });
  }
};

export const handleCreateNewPassword = async (data, id, navigate) => {
  try {
    const response = await axios.post(
      `/api/auth/reset-password/${id}`,
      data
    );

    if (response.status === 200) {
      toast.success("New password created successfully !!!", {
        duration: 2000,
      });
    }
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (error) {
    console.error("Error during login:", error);
    toast.error(error.response.data.msg, {
      duration: 2000,
    });
  }
};
