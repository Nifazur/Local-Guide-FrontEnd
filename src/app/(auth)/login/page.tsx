import { LoginForm } from "@/components/auth/LoginForm";
import { Suspense } from "react";

export const metadata = {
  title: "Login | Local Guide",
  description: "Sign in to your Local Guide account",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}