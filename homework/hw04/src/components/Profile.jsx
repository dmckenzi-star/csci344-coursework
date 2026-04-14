import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Profile({ token }) {
  const [profile, setProfile] = useState(null);

  async function getProfile() {
    const data = await getDataFromServer(token, "/api/profile/");
    setProfile(data);
  }

  useEffect(() => {
    getProfile();
  }, []);

  if (!profile) {
    return null;
  }

  return (
    <header className="flex gap-4 items-center">
      <img src={profile.thumb_url} className="rounded-full w-16" />
      <h2 className="font-Comfortaa font-bold text-2xl">{profile.username}</h2>
    </header>
  );
}
