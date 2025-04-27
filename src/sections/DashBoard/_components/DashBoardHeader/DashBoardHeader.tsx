"use client";

import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import { useState } from "react";
import Link from "next/link";
export default function DashBoardHeader() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex min-h-16 items-center gap-3 border-b border-border-common px-6">
      <div className="flex w-full items-center justify-between h-full">
        {/* Title and info section */}
        <div className="flex items-center gap-1">
          <h1 className="text-base font-semibold">Overview</h1>
          <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-info hidden size-3 shrink-0 text-text-primary sm:inline cursor-pointer"
              data-state={showTooltip ? "open" : "closed"}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>

            {showTooltip && (
              <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 transform z-50">
                <div className="rounded bg-black text-white text-xs p-2 shadow-lg whitespace-nowrap">
                  Lead and contact engagement metrics
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons section */}
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/achromaticlabs/pro"
            target="_blank"
            aria-label="GitHub"
            className="hover:!bg-white/20 rounded-md w-9 h-9 flex items-center justify-center"
          >
            <GitHubIcon fontSize="small" className="text-text-primary" />
          </Link>

          <Link
            href="https://x.com/achromaticlabs"
            target="_blank"
            aria-label="X (formerly Twitter)"
            className="hover:!bg-white/20 rounded-md w-9 h-9 flex items-center justify-center"
          >
            <XIcon fontSize="small" className="text-text-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
}
