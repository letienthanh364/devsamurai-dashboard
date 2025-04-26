"use client";

interface AuthMicrosoftButtonProps {
  loading: boolean;
}

export default function AuthMicrosoftButton({
  loading,
}: AuthMicrosoftButtonProps) {
  return (
    <button
      className="justify-center rounded-md hover:bg-white/10 !text-white border shadow !normal-case text-sm font-medium !border-[#272728] h-9 px-4 py-2 flex w-full flex-row items-center gap-2"
      type="button"
      disabled={loading}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 21 21"
      >
        <path fill="#f25022" d="M1 1h9v9H1z"></path>
        <path fill="#00a4ef" d="M1 11h9v9H1z"></path>
        <path fill="#7fba00" d="M11 1h9v9h-9z"></path>
        <path fill="#ffb900" d="M11 11h9v9h-9z"></path>
      </svg>
      Microsoft
    </button>
  );
}
