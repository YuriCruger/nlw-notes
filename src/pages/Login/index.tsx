import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/auth";
import { Invitation } from "./components/invitation";

const userSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email({ message: "Este email não é válido" }),
  password: z
    .string()
    .min(3, { message: "A senha deve ter no mínimo 3 caracteres" }),
});

type User = z.infer<typeof userSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });
  const { signIn } = useAuth();

  function handleShowPassword() {
    setShowPassword((prevState) => !prevState);
  }

  const onSubmit = async (data: User) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    signIn({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex h-screen w-full relative">
      <div className="bg-background-login bg-cover bg-center flex-1 max-[1100px]:hidden" />
      <div className="absolute h-5 w-full bottom-0 bg-gradient-to-r from-emerald-500 to-slate-900 shadow-lg min-[1100px]:hidden" />

      <div className="w-[560px] flex flex-col justify-center px-5 md:px-16 max-[1100px]:w-full ">
        <h1 className="text-3xl mb-10 font-bold">Acesse sua conta</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Label htmlFor="email" title="Email" />
          <Input
            id="email"
            placeholder="Seu email"
            type="text"
            autoFocus
            className={errors.email && "ring-2 ring-red-500"}
            register={register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email?.message}</p>
          )}

          <Label htmlFor="password" title="Senha" />
          <div className="relative">
            <Input
              id="password"
              placeholder="Sua senha"
              type={!showPassword ? "password" : "text"}
              className={errors.password && "ring-2 ring-red-500"}
              register={register("password")}
            />

            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
            >
              {!showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password?.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-emerald-600 rounded-md py-3 font-bold hover:bg-opacity-80 transition-colors mt-3 ${
              isSubmitting ? "opacity-50" : ""
            }`}
          >
            {isSubmitting ? "Enviando..." : "Entrar"}
          </button>
        </form>
        <div>
          <Invitation
            title="Não tem uma conta?"
            subtitle="Se inscreva gratuitamente"
            linkTo="/createaccount"
          />
        </div>
      </div>
    </div>
  );
}
