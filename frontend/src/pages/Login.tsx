import { Button } from "@/components/ui/button";
import config from "@/config/config";
import { useTokenStore, useUserIdStore } from "@/store";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/http/api";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function LoginPage() {
  const navigate = useNavigate();

  const setToken = useTokenStore((state) => state.setToken);
  const setUserId = useUserIdStore((state) => state.setUserId);

  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  //   useEffect(() => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const token = urlParams.get("token");
  //     if (token) {
  //       setToken(token);
  //       if (config.isDevelopment) {
  //         console.log("Login successful");
  //         console.log("Redirecting to dashboard with token", token);
  //       }
  //       navigate("/dashboard");
  //     }
  //   }, [navigate, setToken]);
  //   mutation
  const mutation = useMutation({
    mutationFn: login,
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
  });

  const handleSignUpSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    //make server call
    if (!email || !password) {
      return alert("Please enter email and password");
    }

    mutation.mutate({ email, password });
  };

  return (
    <section className="flex items-center justify-center h-screen mx-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
