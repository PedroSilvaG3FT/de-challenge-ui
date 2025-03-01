import { z } from "zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loadingStore from "@/store/loading.store";
import { Button } from "@/design/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "@/contexts/auth.context";
import AuthenticationPageNav from "../components/page-nav";
import { FormContainer } from "@/design/components/ui/form";
import { ToastUtil } from "@/modules/@shared/util/toast.util";
import Animate from "@/modules/@shared/components/utils/animate";
import AppFormInput from "@/modules/@shared/components/form/form-input";
import AuthenticationPasswordStrength from "../components/password-strength";

const passwordSchema = z
  .string()
  .min(8, "A senha deve ter pelo menos 8 caracteres")
  .regex(/[a-zA-Z]/, "A senha deve conter pelo menos uma letra")
  .regex(/\d/, "A senha deve conter pelo menos um número")
  .regex(
    /[@$!%*#?&]/,
    "A senha deve conter pelo menos um caractere especial (@$!%*#?&)"
  );

const formSchema = z
  .object({
    name: z.string().min(1, "Campo obrigatório"),
    password1: passwordSchema,
    password2: z.string().min(1, "Campo obrigatório"),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "As senhas não coincidem",
    path: ["password2"],
  });

export default function SignUp() {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const _loadingStore = loadingStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", password1: "", password2: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    _loadingStore.setShow(true);
    console.info("values : ", values);
    handleSignIn("email", "password");
    _loadingStore.setShow(false);
  }

  const handleSignIn = (email: string, password: string) => {
    signIn(email, password)
      .then(() => {
        navigate("/peticao-inicial");
        _loadingStore.setShow(false);
      })
      .catch(() => {
        _loadingStore.setShow(false);
        ToastUtil.error("Ocorreu um erro ao realizar login");
      });
  };

  return (
    <Animate animation="animate__fadeIn">
      <section className="min-w-72">
        <AuthenticationPageNav title="Cadastro" subtitle="Insira os dados" />

        <FormContainer {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <AppFormInput
              name="name"
              label="Nome"
              control={form.control}
              placeholder="Digite seu nome"
            />

            <AppFormInput
              label="Senha"
              type="password"
              name="password1"
              control={form.control}
              placeholder="**********"
            />

            <AppFormInput
              type="password"
              name="password2"
              control={form.control}
              placeholder="**********"
              label="Confirme sua senha"
            />

            <AuthenticationPasswordStrength
              password={form.watch("password1") || ""}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid}
            >
              Criar conta
            </Button>

            <div className="mt-4 text-center text-sm">
              Já possui uma conta?{" "}
              <a
                onClick={() => navigate("/auth/sign-in")}
                className="underline"
              >
                Ir para login
              </a>
            </div>
          </form>
        </FormContainer>
      </section>
    </Animate>
  );
}
