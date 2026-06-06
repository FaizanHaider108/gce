import { getWhatsAppNumber } from "@/lib/site/config";

export type WhatsAppContext =
  | "general"
  | "navbar"
  | "banner"
  | "city"
  | "service"
  | "service-page";

function buildMessage(
  options: {
    serviceName?: string;
    cityName?: string;
    context?: WhatsAppContext;
  } = {},
): string {
  const { serviceName, cityName, context = "general" } = options;

  if (context === "city" && cityName) {
    return `Hi, I am looking for an accountant near ${cityName} to help manage my taxes and corporate filings.`;
  }

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
      return cityName
        ? `Hi, I am looking for an accountant near ${cityName} to help manage my taxes and corporate filings.`
        : "Hi, I saw your salary calculator and would like help reducing my tax with a UK accountant.";
    default:
      return "Hi, I would like to speak with a UK accountant.";
  }
}

export function buildWhatsAppUrl(options?: {
  serviceName?: string;
  cityName?: string;
  context?: WhatsAppContext;
}): string {
  const number = getWhatsAppNumber();
  const message = buildMessage(options);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}
