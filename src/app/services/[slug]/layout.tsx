import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/services";
import { buildServiceJsonLd } from "@/lib/seo/service-json-ld";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function ServiceLayout({
  children,
  params,
}: LayoutProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceJsonLd = buildServiceJsonLd(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
      />
      {children}
    </>
  );
}
