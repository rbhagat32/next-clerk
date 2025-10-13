import { SignIn } from "@clerk/nextjs";

export default function AuthPage() {
  return (
    <div className="grid h-screen place-items-center">
      <SignIn />
    </div>
  );
}
