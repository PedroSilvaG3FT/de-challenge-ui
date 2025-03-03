import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth.context";
import { Button } from "@/design/components/ui/button";
import AuthenticationPageNav from "../components/page-nav";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/design/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer } from "@/design/components/ui/form";
import Animate from "@/modules/@shared/components/utils/animate";
import AppFormInput from "@/modules/@shared/components/form/form-input";
import { ResponseUtil } from "@/modules/@shared/util/response.util";

const formSchema = z.object({
  email: z.string().min(1, "Campo obrigatório"),
  password: z.string().min(1, "Campo obrigatório"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn(values.email, values.password)
      .then(() => navigate("/"))
      .catch((error) => {
        ResponseUtil.handleError(error);
      });
  }

  return (
    <Animate animation="animate__fadeIn">
      <section>
        <AuthenticationPageNav
          title="Login"
          subtitle="Bem vindo! Por favor, insira seus dados."
        />

        <FormContainer {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col"
          >
            <AppFormInput
              name="email"
              type="email"
              label="Email"
              control={form.control}
              placeholder="Digite seu e-mail"
            />

            <AppFormInput
              label="Senha"
              name="password"
              type="password"
              control={form.control}
              placeholder="**********"
            />

            <Button type="submit" className="w-full group">
              Entrar
              <ArrowRight className="ml-2 group-hover:ml-4 transition-all duration-500" />
            </Button>

            <a className="underline text-center" href="/auth/sign-up">
              Cadastre-se
              <Badge className="scale-[0.85]">Em breve</Badge>
            </a>
          </form>
        </FormContainer>
      </section>
    </Animate>
  );
}
