import React from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function BookmarkButton({ post, token, refreshPosts }) {
  const isBookmarked = post.current_user_bookmark_id !== undefined;

  async function handleClick() {
    if (isBookmarked) {
      await deleteDataFromServer(
        token,
        `/api/bookmarks/${post.current_user_bookmark_id}`,
      );
    } else {
      await postDataToServer(token, "/api/bookmarks/", {
        post_id: post.id,
      });
    }
    await refreshPosts();
  }

  return (
    <button
      onClick={handleClick}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <i
        className={isBookmarked ? "fas fa-bookmark" : "far fa-bookmark"}
        aria-hidden="true"
      ></i>
    </button>
  );
}
