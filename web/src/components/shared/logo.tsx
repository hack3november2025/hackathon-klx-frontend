import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="inline-flex items-center space-x-2">
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect width="24" height="24" rx="6" fill="url(#g)" />
        <path
          d="M6 12h12"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-semibold">KLx</span>
    </Link>
  );
}

export { Logo };
