import LoginForm from "@/components/form/loginForm";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="md:container md:mx-auto">
        <div className="flex justify-center">
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
}
