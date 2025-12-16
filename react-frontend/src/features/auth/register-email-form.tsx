import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OAuthProvidersList } from "@shared/ui/oauth-buttons";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const registrationWithEmailBaseSchema = z.object({
  email: z.string().min(1, "Email обязателен").email("Некорректный email"),

  password: z
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .regex(/[a-zA-Z]/, "Пароль должен содержать буквы")
    .regex(/\d/, "Пароль должен содержать цифры"),

  confirmPassword: z.string().min(1, "Подтверждение пароля обязательно"),
});

// Схема с трансформацией
export const registrationWithEmailSchema = registrationWithEmailBaseSchema
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  })
  .transform((data) => {
    // Удаляем confirmPassword и возвращаем только нужные поля
    const { confirmPassword, ...submitData } = data;
    return submitData;
  });

export type RegistrationWithEmailSubmitData = z.infer<
  typeof registrationWithEmailSchema
>;

export function RegisterWithEmailForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationWithEmailSchema),
  });
  const onSubmit: SubmitHandler<RegistrationWithEmailSubmitData> = (data) => {
    console.log(data);
  };
  return (
    <div className="m-4 p-4 max-w-80 rounded-2xl bg-white dark:bg-amber-500">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl text-center">Sign In</h2>
        {/* <div className="ml-4">
            <span>Welcome user, please sign in to continue</span>
          </div> */}

        {/* <TextField
            className="my-4 block"
            label="Your First Name"
            fullWidth
            size="small"
            variant="outlined"
            {...register("firstName")}
          /> */}

        <TextField
          className="my-4 block"
          label="Your Email"
          fullWidth
          size="small"
          variant="outlined"
          required
          {...register("email", { required: true })}
        />

        <TextField
          className="my-4 block"
          size="small"
          label="Your Password"
          fullWidth
          variant="outlined"
          required
          {...register("password")}
        />

        <TextField
          className="my-4 block"
          size="small"
          label="Confirm Your Password"
          fullWidth
          variant="outlined"
          required
          {...register("confirmPassword")}
        />

        <Button variant="contained" type="submit">
          Sing In With Email And Password
        </Button>
      </form>

      <div className="">
        <span className="text-divider">Or</span>
      </div>

      <div>
        <OAuthProvidersList />
      </div>
    </div>
  );
}
