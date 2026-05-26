type SocialIconProps = {
  label: string;
  className?: string;
};

export default function SocialIcon({ label, className = "h-4 w-4" }: SocialIconProps) {
  switch (label) {
    case "Instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Pinterest":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.12 2.51 7.67 6.09 9.19-.08-.78-.02-1.72.2-2.57.22-.93 1.47-6.26 1.47-6.26s-.37-.74-.37-1.83c0-1.71 1-3 2.24-3 1.06 0 1.57.79 1.57 1.74 0 1.06-.68 2.65-1.03 4.12-.29 1.23.62 2.24 1.83 2.24 2.2 0 3.89-2.32 3.89-5.66 0-2.96-2.13-5.03-5.17-5.03-3.52 0-5.59 2.64-5.59 5.37 0 1.06.41 2.2.92 2.82.1.12.12.23.09.35l-.33 1.36c-.05.22-.17.27-.4.16-1.49-.69-2.42-2.87-2.42-4.65 0-3.79 2.75-7.26 7.93-7.26 4.16 0 7.4 2.96 7.4 6.93 0 4.14-2.61 7.46-6.24 7.46-1.22 0-2.36-.63-2.75-1.38l-.75 2.86c-.27 1.04-1 2.34-1.49 3.13C9.57 21.79 10.76 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      );
    case "Behance":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M7.5 11.5h4.2c1.1 0 2-.9 2-2s-.9-2-2-2H7.5v4zm0 2v5h4.8c1.3 0 2.3-1 2.3-2.3s-1-2.2-2.3-2.2H7.5zm-5-9h14v2H9.5c1.5.2 2.7 1.4 2.7 3 0 1.2-.7 2.2-1.8 2.7 1.4.5 2.4 1.9 2.4 3.5 0 2.1-1.7 3.8-3.8 3.8H2.5V4.5zm18 1.5h-5V6h5v-.5zm0 4.5h-5v-1h5v1z" />
        </svg>
      );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 6h16v12H4z" />
      <path d="M4 6l8 7 8-7" />
    </svg>
  );
}
