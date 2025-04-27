import mainPaths from "@/constants/path";
import Link from "next/link";
import React from "react";

export default function AuthFormHeader() {
  return (
    <Link href={mainPaths.home}>
      <div className="flex items-center space-x-2 justify-center">
        <div className="flex size-9 items-center justify-center p-1">
          <div className="flex size-7 items-center justify-center rounded-md border ">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M7.81815 8.36373L12 0L24 24H15.2809L7.81815 8.36373Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M4.32142 15.3572L8.44635 24H-1.14809e-06L4.32142 15.3572Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <span className="font-bold">DevSamurai</span>
      </div>
    </Link>
  );
}
