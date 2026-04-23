import React from "react";

export default function Comments({ comments }) {
  // Zero comments: render nothing
  if (comments.length === 0) {
    return null;
  }

  // One comment: render it
  if (comments.length === 1) {
    const c = comments[0];
    return (
      <p className="text-sm mb-3">
        <strong>{c.user.username}</strong> {c.text}
      </p>
    );
  }

  // More than one: "view all N comments" button + most recent comment
  const mostRecent = comments[comments.length - 1];
  return (
    <>
      <button className="text-gray-500 text-sm mb-2">
        view all {comments.length} comments
      </button>
      <p className="text-sm mb-3">
        <strong>{mostRecent.user.username}</strong> {mostRecent.text}
      </p>
    </>
  );
}
