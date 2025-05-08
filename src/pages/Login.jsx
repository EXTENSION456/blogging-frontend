import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { handleLoginFunction } from "@/api/User";
import { Toaster } from "sonner";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    await handleLoginFunction(data, navigate);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid w-full items-center gap-5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-md">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="johndoe@mail.com"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-between">
                  <Label className="text-md" id="password">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  placeholder="******"
                  type="password"
                  autoComplete="current-password"
                  htmlFor="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Password must be at least 4 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 py-2">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="w-full mt-4">
            <Button className="w-full cursor-pointer font-normal text-md">
              Login
            </Button>
          </CardFooter>
        </form>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
