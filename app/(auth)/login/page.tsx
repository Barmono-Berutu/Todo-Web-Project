import FormLogin from "@/components/auth/form-login";

const LoginPage = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-5 text-center">
        Login
      </h1>
      <FormLogin />
    </div>
  );
};

export default LoginPage;
