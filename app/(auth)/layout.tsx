const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh] flex justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md my-5">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
          <p className="text-sm text-muted-foreground">
            Kelola tugasmu dengan mudah
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
