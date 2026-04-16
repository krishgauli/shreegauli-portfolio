"use client";

type OpenCookieSettingsButtonProps = {
  label?: string;
  className?: string;
};

export function OpenCookieSettingsButton({
  label = "Open Cookie Settings",
  className = "rounded-full border border-outline px-5 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:border-primary hover:text-primary",
}: OpenCookieSettingsButtonProps) {
  const openCookieSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-cookie-settings"));
    }
  };

  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {label}
    </button>
  );
}
