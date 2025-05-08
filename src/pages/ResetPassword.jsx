import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { handleCreateNewPassword } from "@/api/User";

const ResetPassword = () => {
  const { token } = useParams();
  console.log(token, "token");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    await handleCreateNewPassword(data, token, navigate);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Create New Password
          </CardTitle>
          <CardDescription>
            Enter the reset password link sent to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <Label htmlFor="password" className="text-md">
                Password
              </Label>
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
              <Button
                type="submit"
                className="w-full font-normal cursor-pointer"
              >
                Create Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
