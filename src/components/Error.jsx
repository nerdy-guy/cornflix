import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 text-xl dark:bg-zinc-900 dark:text-gray-300">
      <p>Oops! something went wrong</p>
      <Link to="/" className="rounded px-4 py-2 dark:bg-blue-500">
        Go Home
      </Link>
    </div>
  );
};

export default Error;
