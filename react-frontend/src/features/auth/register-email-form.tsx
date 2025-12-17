import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { OAuthProvidersList } from "@shared/ui/oauth-buttons";
import { useMemo, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { AnimatePresence, motion } from "motion/react";
import { RegisterWithEmail } from "./api/register.service";

const registrationWithEmailBaseSchema = z.object({
  email: z.string().min(2, "Email обязателен").email("Некорректный email"),

  password: z
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов, буквы и цифры")
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
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(registrationWithEmailSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const isSubmitEnabled = useMemo(() => {
    return !isSubmitting && !isRegistered;
  }, [isSubmitting, isRegistered]);

  const onRegisterWithEmailSubmit: SubmitHandler<
    RegistrationWithEmailSubmitData
  > = async (data) => {
    const result = await RegisterWithEmail(data);
    if (result.registrationSucceeded) {
      setIsRegistered(true);
    }
  };


  return (
    <div className="m-4 p-4 max-w-80 w-full rounded-2xl bg-white dark:bg-amber-500">
      <form onSubmit={handleSubmit(onRegisterWithEmailSubmit)}>
        <h2 className="text-2xl text-center">Sign In</h2>

        <TextField
          className="my-4 block"
          label="Your Email"
          fullWidth
          size="small"
          variant="outlined"
          required
          disabled={!isSubmitEnabled}
          error={!!errors.email}
          helperText={
            <AnimatePresence>
              {!!errors.email && (
                <motion.span
                  className="block overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {errors.email?.message}
                </motion.span>
              )}
            </AnimatePresence>
          }
          {...register("email")}
        />

        <TextField
          className="my-4 block"
          size="small"
          label="Your Password"
          fullWidth
          variant="outlined"
          required
          disabled={!isSubmitEnabled}
          error={!!errors.password}
          helperText={
            <AnimatePresence>
              {!!errors.password && (
                <motion.span
                  className="block overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {errors.password?.message}
                </motion.span>
              )}
            </AnimatePresence>
          }
          {...register("password")}
        />

        <TextField
          className="my-4 block"
          size="small"
          label="Confirm Your Password"
          fullWidth
          variant="outlined"
          required
          disabled={!isSubmitEnabled}
          error={!!errors.confirmPassword}
          helperText={
            <AnimatePresence>
              {!!errors.confirmPassword && (
                <motion.span
                  className="block overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {errors.confirmPassword?.message}
                </motion.span>
              )}
            </AnimatePresence>
          }
          {...register("confirmPassword")}
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={!isSubmitEnabled}
        >
          {/* Sing In With Email And Password */}
          {isRegistered
            ? "Регистрация завершена"
            : isSubmitting
            ? "Регистрация..."
            : "Зарегистрироваться"}
        </Button>
      </form>

      <Divider sx={{ my: 1 }}>
        <Typography>Or</Typography>
      </Divider>

      <div>
        <OAuthProvidersList />
      </div>
    </div>
  );
}
