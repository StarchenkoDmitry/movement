import { RegisterWithEmailForm } from "@features/auth";
import { MainHeader } from "@shared/ui/headers";

export function AuthPage() {
  return (
    <>
      <MainHeader />
      <div className="flex flex-col items-center bg-amber-300 min-h-fit">
        <h1 className="text-2xl">Welcome to Movement</h1>
        <RegisterWithEmailForm></RegisterWithEmailForm>
      </div>
    </>
  );
}
