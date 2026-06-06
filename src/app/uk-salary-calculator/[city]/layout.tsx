import { notFound } from "next/navigation";
import { getUKCityByRouteId } from "@/lib/data/city-routes";
import { buildCityDualJsonLd } from "@/lib/seo/city-json-ld";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ city: string }>;
}

export default async function CitySalaryLayout({
  children,
  params,
}: LayoutProps) {
  const { city: routeId } = await params;
  const city = getUKCityByRouteId(routeId);

  if (!city) {
    notFound();
  }

  const dualJsonLd = buildCityDualJsonLd(city);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dualJsonLd),
        }}
      />
      {children}
    </>
  );
}
