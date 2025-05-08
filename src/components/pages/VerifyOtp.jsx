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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { handleVerifyOtp } from "@/api/User";

const VerifyOtp = ({ number }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const cred = {
      phone: number,
      otp: data.otp,
    };
    console.log(cred);
    await handleVerifyOtp(cred,navigate);
  };
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">Verify Otp</CardTitle>
          <CardDescription>
            Enter the otp sent to your phone number.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <Label htmlFor="otp" className="text-md">
                Otp
              </Label>
              <Input
                id="otp"
                placeholder="123456"
                type="number"
                {...register("otp", {
                  required: "Otp is required",
                  minLength: {
                    value: 6,
                    message: "minimum length is 6",
                  },
                  maxLength: {
                    value: 6,
                    message: "maximum length is 6",
                  },
                })}
              />
              {errors.otp && (
                <p className="text-sm text-red-500 py-2">{errors.otp.message}</p>
              )}
              <Button
                type="submit"
                className="w-full font-normal cursor-pointer"
              >
                Verify Otp
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;
