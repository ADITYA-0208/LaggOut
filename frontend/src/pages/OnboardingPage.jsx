import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LoaderIcon, MapPinIcon, ShuffleIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#282a36" }}>
  <div className="card w-full max-w-3xl shadow-xl" style={{ backgroundColor: "#44475a", color: "#f8f8f2" }}>
    <div className="card-body p-6 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* PROFILE PIC */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="size-32 rounded-full bg-[#6272a4] overflow-hidden">
            {formState.profilePic ? (
              <img src={formState.profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full">
                <CameraIcon className="size-12 text-white opacity-30" />
              </div>
            )}
          </div>

          <button type="button" onClick={handleRandomAvatar} className="btn px-4 py-2 bg-[#bd93f9] hover:bg-[#ff79c6] text-[#282a36] rounded">
            <ShuffleIcon className="size-4 mr-2" /> Generate Random Avatar
          </button>
        </div>

        {/* FULL NAME */}
        <div className="form-control">
          <label className="label">Full Name</label>
          <input type="text" value={formState.fullName} onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
            className="input w-full bg-[#282a36] text-white border border-[#6272a4]" />
        </div>

        {/* BIO */}
        <div className="form-control">
          <label className="label">Bio</label>
          <textarea value={formState.bio} onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
            className="textarea w-full bg-[#282a36] text-white border border-[#6272a4]" />
        </div>

        {/* LANGUAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">Native Language</label>
            <select value={formState.nativeLanguage} onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
              className="select w-full bg-[#282a36] text-white border border-[#6272a4]">
              <option value="">Select native</option>
              {LANGUAGES.map(lang => <option key={lang} value={lang.toLowerCase()}>{lang}</option>)}
            </select>
          </div>
          <div className="form-control">
            <label className="label">Learning Language</label>
            <select value={formState.learningLanguage} onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
              className="select w-full bg-[#282a36] text-white border border-[#6272a4]">
              <option value="">Select learning</option>
              {LANGUAGES.map(lang => <option key={lang} value={lang.toLowerCase()}>{lang}</option>)}
            </select>
          </div>
        </div>

        {/* LOCATION */}
        <div className="form-control">
          <label className="label">Location</label>
          <div className="relative">
            <MapPinIcon className="absolute top-1/2 left-3 -translate-y-1/2 size-5 text-white opacity-70" />
            <input type="text" value={formState.location} onChange={(e) => setFormState({ ...formState, location: e.target.value })}
              className="input w-full pl-10 bg-[#282a36] text-white border border-[#6272a4]" />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="btn w-full bg-[#bd93f9] hover:bg-[#ff79c6] text-[#282a36]" disabled={isPending}>
          {!isPending ? "Complete Onboarding" : <><LoaderIcon className="animate-spin size-5 mr-2" /> Onboarding...</>}
        </button>
      </form>
    </div>
  </div>
</div>

  );
};
export default OnboardingPage;
