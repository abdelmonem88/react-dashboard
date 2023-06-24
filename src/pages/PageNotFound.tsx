import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const PageNotFound = (props: Props) => {
  return (
    <div
      id="page_not_found"
      className="flex h-screen flex-col items-center justify-center"
    >
      <h1
        className="mb-4 text-4xl font-bold 
      text-[#111827]
      "
      >
        Page Not Found
      </h1>
      <button className="rounded-lg bg-[#111827] px-4 py-2 text-white">
        <Link to="/">Go to Home</Link>
      </button>
    </div>
  );
};

export default PageNotFound;
