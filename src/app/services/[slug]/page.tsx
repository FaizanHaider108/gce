import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AccountantBanner } from "@/components/marketing/AccountantBanner";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getServiceContent } from "@/lib/data/service-content";
import {
  ACCOUNTING_SERVICES,
  getAllServiceSlugs,
  getServiceBySlug,
} from "@/lib/data/services";
import { getSiteUrl, SITE_NAME } from "@/lib/site/config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const content = getServiceContent(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const title =
    content?.metaTitle ?? `${service.title} | UK Accountant Services`;
  const description = content?.metaDescription ?? service.shortDescription;
  const pageUrl = `${getSiteUrl()}/services/${slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_GB",
      url: pageUrl,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const content = getServiceContent(slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;
  const related = ACCOUNTING_SERVICES.filter((item) => item.slug !== slug).slice(
    0,
    3,
  );

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <article className="prose prose-slate max-w-none space-y-8">
        <header className="space-y-5 not-prose">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            <span>UK Accounting Service</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {service.title}
          </h1>
        </header>

        {content ? (
          <>
            <p className="text-lg leading-relaxed text-slate-600">
              {content.intro}
            </p>

            <section>
              <h2 className="text-xl font-bold text-slate-800">
                {content.whoNeedsHeading}
              </h2>
              <p className="leading-relaxed text-slate-600">
                {content.whoNeeds}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800">
                {content.methodologyHeading}
              </h2>
              <p className="leading-relaxed text-slate-600">
                {content.methodology}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800">
                {content.deadlinesHeading}
              </h2>
              <p className="leading-relaxed text-slate-600">
                {content.deadlines}
              </p>
            </section>
          </>
        ) : (
          <>
            <p className="text-lg leading-relaxed text-slate-600">
              {service.shortDescription}
            </p>
            <section className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm not-prose">
              <h2 className="text-lg font-semibold text-slate-900">
                Why choose our team?
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                <li>
                  Dedicated UK chartered accountants with deep HMRC and
                  Companies House experience.
                </li>
                <li>
                  Proactive compliance — deadlines tracked, filings reviewed,
                  and penalties avoided before they happen.
                </li>
                <li>
                  Transparent pricing and real-time WhatsApp support when you
                  need answers fast.
                </li>
              </ul>
            </section>
          </>
        )}

        <div className="not-prose">
          <WhatsAppButton
            serviceName={service.title}
            context="service-page"
            label="Inquire on WhatsApp"
            size="lg"
            pulse
          />
        </div>

        <AccountantBanner />

        {related.length > 0 && (
          <section className="not-prose">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Related services
            </h2>
            <ul className="grid gap-3 sm:grid-cols-3">
              {related.map((item) => {
                const RelatedIcon = item.icon;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/services/${item.slug}`}
                      className="flex h-full flex-col rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-emerald-100 hover:shadow-md"
                    >
                      <RelatedIcon
                        className="mb-2 h-5 w-5 text-emerald-600"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-slate-900">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
