import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import { handleSignupFunction } from "@/api/User";
import VerifyOtp from "@/components/pages/VerifyOtp";

export default function Register() {
  const [renderOtpPage, setRenderOtpPage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [number, setNumber] = useState(0);

  const onSubmit = async (data) => {
    setNumber(data.phone);
    await handleSignupFunction(data, setRenderOtpPage);
  };
  return (
    <div>
      {!renderOtpPage && (
        <div className="flex justify-center items-center min-h-screen">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Register</CardTitle>
              <CardDescription>
                Create a new account by filling out the form below.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <div className="grid w-full items-center gap-5">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="name" className="text-md">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      type="text"
                      autoComplete="name"
                      {...register("name", {
                        required: "Name is required",
                      })}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1">
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
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="phone" className="text-md">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      placeholder="1234567890"
                      type="tel"
                      autoComplete="tel"
                      {...register("phone", {
                        required: "Phone is required",
                      })}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 py-2">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="password" className="text-md">
                      Password
                    </Label>
                    <Input
                      id="password"
                      placeholder="******"
                      type="password"
                      autoComplete="current-password"
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
              <CardFooter className="w-full mt-3">
                <Button className="w-full cursor-pointer text-md font-normal">
                  Create Account
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}

      {renderOtpPage && (
        <div>
          <VerifyOtp number={number} />
        </div>
      )}
    </div>
  );
}
