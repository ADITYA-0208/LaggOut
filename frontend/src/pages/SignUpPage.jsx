import { useState } from "react";
import { Link } from "react-router";

import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // This is how we did it at first, without using our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: signupMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  // This is how we did it using our custom hook - optimized version
  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" style={{ backgroundColor: "#282a36" }}>
    <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-[#44475a] text-[#f8f8f2] rounded-xl shadow-lg overflow-hidden border border-[#bd93f9]">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 p-4 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-[#bd93f9] to-[#8be9fd] tracking-wider">
            LaggOUT
          </span>
        </div>
  
        {error && (
          <div className="mb-4 px-4 py-2 bg-[#ff5555] text-white rounded">
            <span>{error.response.data.message}</span>
          </div>
        )}
  
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Create an Account</h2>
            <p className="text-sm opacity-70">Join LaggOUT and start your language learning adventure!</p>
          </div>
  
          <div className="space-y-3">
            <div className="form-control">
              <label className="label">Full Name</label>
              <input type="text" placeholder="John Doe"
                className="input w-full bg-[#282a36] text-white border border-[#6272a4]"
                value={signupData.fullName}
                onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                required />
            </div>
  
            <div className="form-control">
              <label className="label">Email</label>
              <input type="email" placeholder="john@gmail.com"
                className="input w-full bg-[#282a36] text-white border border-[#6272a4]"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required />
            </div>
  
            <div className="form-control">
              <label className="label">Password</label>
              <input type="password" placeholder="********"
                className="input w-full bg-[#282a36] text-white border border-[#6272a4]"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required />
              <p className="text-xs opacity-70 mt-1">Password must be at least 6 characters</p>
            </div>
  
            <label className="label cursor-pointer gap-2 text-xs">
              <input type="checkbox" className="checkbox checkbox-sm" required />
              I agree to the terms and privacy.                      
            </label>
          </div>
  
          <button className="btn w-full bg-[#bd93f9] hover:bg-[#ff79c6] text-[#282a36]" type="submit">
            {isPending ? <><span className="loading loading-spinner loading-xs"></span> Loading...</> : "Create Account"}
          </button>
  
          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-[#8be9fd] hover:underline">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
  
      {/* RIGHT SIDE */}
      
      
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

export default SignUpPage;
