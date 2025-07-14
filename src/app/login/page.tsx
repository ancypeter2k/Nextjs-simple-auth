import { LoginForm } from "./LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Login</h2>
        <LoginForm />
    </div>
  );
}
