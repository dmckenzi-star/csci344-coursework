import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Suggestions({ token }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function getSuggestions() {
      const data = await getDataFromServer(token, "/api/suggestions");
      setSuggestions(data);
    }
    getSuggestions();
  }, [token]);

  return (
    <div className="mt-4">
      <h2 className="text-base text-gray-700 font-bold mb-4">
        Suggestions for you
      </h2>
      {suggestions.map((user) => (
        <section
          key={user.id}
          className="flex justify-between items-center mb-4 gap-2"
        >
          <img src={user.thumb_url} alt="" className="rounded-full" />
          <div className="w-[180px]">
            <p className="font-bold text-sm">{user.username}</p>
            <p className="text-gray-700 text-xs">suggested for you</p>
          </div>
          <button className="text-blue-700 text-sm py-2">follow</button>
        </section>
      ))}
    </div>
  );
}
