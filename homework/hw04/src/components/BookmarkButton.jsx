import React from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function BookmarkButton({
  postId,
  bookmarkId,
  token,
  onBookmarkChange,
}) {
  async function createBookmark() {
    await postDataToServer(token, "/api/bookmarks/", { post_id: postId });
    onBookmarkChange();
  }

  async function removeBookmark() {
    await deleteDataFromServer(token, `/api/bookmarks/${bookmarkId}`);
    onBookmarkChange();
  }

  if (bookmarkId) {
    return (
      <button onClick={removeBookmark}>
        <i className="fas fa-bookmark"></i>
      </button>
    );
  }

  return (
    <button onClick={createBookmark}>
      <i className="far fa-bookmark"></i>
    </button>
  );
}
