import { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      style={{ backgroundColor: "#282a36" }}
    >
      <div className="flex flex-col lg:flex-row w-full max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden border border-[#bd93f9] bg-[#44475a]">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col text-[#f8f8f2]">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-[#bd93f9] to-[#8be9fd] tracking-wider">
              LaggOUT
            </span>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="mb-4 px-4 py-2 bg-[#ff5555] text-white rounded">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue your language journey
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text text-[#f8f8f2]">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input w-full bg-[#282a36] text-[#f8f8f2] placeholder-gray-400 border border-[#6272a4]"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text text-[#f8f8f2]">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input w-full bg-[#282a36] text-[#f8f8f2] placeholder-gray-400 border border-[#6272a4]"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#bd93f9] hover:bg-[#ff79c6] text-[#282a36] font-semibold rounded"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm text-[#f8f8f2]">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-[#8be9fd] hover:underline">
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-[#6272a4] items-center justify-center">
          <div className="w-full h-full p-8 flex items-center justify-center">
            <img
              src="/i.png"
              alt="Language connection illustration"
              className="object-contain max-h-100 max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
