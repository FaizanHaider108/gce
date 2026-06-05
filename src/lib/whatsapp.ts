import { getWhatsAppNumber } from "@/lib/site/config";

export type WhatsAppContext =
  | "general"
  | "navbar"
  | "banner"
  | "service"
  | "service-page";

function buildMessage(
  serviceName?: string,
  context: WhatsAppContext = "general",
): string {
  if (serviceName) {
    if (context === "service-page") {
      return `Hi, I want to inquire about ${serviceName}.`;
    }
    return `Hi, I am interested in your ${serviceName} service.`;
  }

  switch (context) {
    case "navbar":
      return "Hi, I would like to speak with a UK accountant about your services.";
    case "banner":
      return "Hi, I saw your salary calculator and would like help reducing my tax with a UK accountant.";
    default:
      return "Hi, I would like to speak with a UK accountant.";
  }
}

export function buildWhatsAppUrl(options?: {
  serviceName?: string;
  context?: WhatsAppContext;
}): string {
  const number = getWhatsAppNumber();
  const message = buildMessage(options?.serviceName, options?.context);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}
