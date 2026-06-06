import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, type WhatsAppContext } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  serviceName?: string;
  cityName?: string;
  context?: WhatsAppContext;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}

const SIZE_CLASSES = {
  sm: "px-3.5 py-2 text-xs gap-1.5",
  md: "px-4 py-2.5 text-sm gap-2",
  lg: "px-6 py-3.5 text-base gap-2.5",
} as const;

const ICON_SIZES = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
} as const;

export function WhatsAppButton({
  serviceName,
  cityName,
  context = "general",
  label = "Contact via WhatsApp",
  className = "",
  size = "md",
  pulse = false,
}: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl({ serviceName, cityName, context });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-lg bg-[#25D366] font-semibold text-white transition-colors hover:bg-[#20ba56] ${SIZE_CLASSES[size]} ${pulse ? "whatsapp-pulse" : ""} ${className}`}
    >
      <MessageCircle className={ICON_SIZES[size]} aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}
