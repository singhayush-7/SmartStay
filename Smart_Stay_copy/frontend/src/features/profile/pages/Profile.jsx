import { useEffect } from "react";
import { useSelector } from "react-redux";

import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
import ChangePasswordForm from "../components/ChangePasswordForm";

import { useProfile } from "../hooks/useProfile";

const Profile = () => {
  const {
    fetchProfile,
    updateUserProfile,
    updatePassword,
    removeAccount,
  } = useProfile();

  const { profile, loading } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading && !profile) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg font-medium">
          Loading Profile...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-3xl font-bold">
        My Profile
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {}

        <div>
          <ProfileCard user={profile} onDelete={() => {
            if(window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
              removeAccount();
            }
          }} />
        </div>

        {}

        <div className="space-y-8 lg:col-span-2">
          <ProfileForm
            user={profile}
            loading={loading}
            onSubmit={updateUserProfile}
          />

          <ChangePasswordForm
            loading={loading}
            onSubmit={updatePassword}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;