const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="= rounded-sm p-8 w-full max-w-md">
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
