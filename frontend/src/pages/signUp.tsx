import { Button } from "@/components/ui/button";
import config from "@/config/config";
import { useTokenStore, useUserIdStore } from "@/store";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/http/api";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface RegisterParams {
  email: string;
  password: string;
  name: string;
}

interface RegisterResponse {
  accessToken: string;
  user: string;
}

interface RegisterError {
  message: string;
}

export function SignUpPage() {
  const navigate = useNavigate();

  const setToken = useTokenStore((state) => state.setToken);
  const setUserId = useUserIdStore((state) => state.setUserId);

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation<RegisterResponse, RegisterError, RegisterParams>(
    {
      mutationFn: register,
      onSuccess: (response) => {
        console.log(response);

        setToken(response.accessToken);
        setUserId(response.user);
        if (config.isDevelopment) {
          console.log("Login successful", response.accessToken);
        }
        navigate("/dashboard");
      },
      onError: (error) => {
        if (config.isDevelopment) {
          console.log("Error:", error);
        }
      },
    }
  );

  const handleSignUpSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;

    if (!name || !email || !password) {
      return alert("Please enter email and password");
    }

    mutation.mutate({ email, password, name });
  };

  return (
    <section className="flex items-center justify-center h-screen mx-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create a new account, enter the credentials below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                ref={nameRef}
                id="name"
                type="text"
                placeholder="jhon Doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input ref={passwordRef} id="password" type="password" required />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleSignUpSubmit}
            >
              SignUp
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
