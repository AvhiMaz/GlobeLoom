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
import { useToast } from "@/components/hooks/use-toast";

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: string;
}

interface LoginError {
  message: string;
}

export function LoginPage() {
  // const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const setToken = useTokenStore((state) => state.setToken);
  const setUserId = useUserIdStore((state) => state.setUserId);

  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation<LoginResponse, LoginError, LoginParams>({
    mutationFn: login,
    onSuccess: (response: LoginResponse) => {
      console.log(response);

      setToken(response.accessToken);
      setUserId(response.user);
      if (config.isDevelopment) {
        console.log("Login successful", response.accessToken);
      }
      navigate("/dashboard/trips");
      toast({
        title: "Login Successful",
      });
    },
    onError: (error: LoginError) => {
      if (config.isDevelopment) {
        console.log("Error:", error);
      }
      toast({
        title: "Invalid Credentials",
        description: "Either Username or password is incorrect",
        variant: "destructive",
      });
    },
  });

  const handleLoginSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return alert("Please enter email and password");
    }

    mutation.mutate({ email, password });
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen mx-4">
      {/* {error && <h1 className="text-lg text-rose-500">Invalid Credentials</h1>} */}
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
              onClick={handleLoginSubmit}
            >
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
