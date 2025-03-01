import { useNavigate } from "react-router-dom";
import { Input } from "@/design/components/ui/input";
import { Label } from "@/design/components/ui/label";
import { Button } from "@/design/components/ui/button";
import AuthenticationPageNav from "../components/page-nav";
import Animate from "@/modules/@shared/components/utils/animate";

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <Animate animation="animate__fadeIn">
      <section>
        <AuthenticationPageNav
          title="Forgot your password?"
          subtitle="Enter your email to reset your password"
        />

        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              type="email"
              placeholder="Isira seu email..."
            />
          </div>

          <Button type="submit" className="w-full">
            Reset Password
          </Button>

          <div className="mt-4 text-center text-sm">
            <a onClick={() => navigate("/auth/sign-in")} className="underline">
              Sign in
            </a>
          </div>
        </form>
      </section>
    </Animate>
  );
}
