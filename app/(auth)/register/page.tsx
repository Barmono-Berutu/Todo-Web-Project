import FormRegister from "@/components/auth/form-register";

const RegisterPage = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-5 text-center">
        Register
      </h1>
      <FormRegister />
    </div>
  );
};

export default RegisterPage;
