import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDE_ARTICLES } from "@/lib/data/guide-content";
import {
  getAllGuideSlugs,
  getGuideBySlug,
  getGuidePath,
  GUIDE_PILLARS,
} from "@/lib/data/guide-pillars";
import { getSiteUrl } from "@/lib/site/config";
import { TrustComplianceRibbon } from "@/components/legal/TrustComplianceRibbon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found" };

  const pageUrl = `${getSiteUrl()}${getGuidePath(slug)}`;

  return {
    title: guide.title,
    description: guide.shortDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: guide.title,
      description: guide.shortDescription,
      type: "article",
      locale: "en_GB",
      url: pageUrl,
    },
  };
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  const article = GUIDE_ARTICLES[slug];

  if (!guide || !article) {
    notFound();
  }

  const related = GUIDE_PILLARS.filter((item) => item.slug !== slug).slice(
    0,
    3,
  );

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <article>
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
            {guide.category} · {guide.readMinutes} min read
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {guide.title}
          </h1>
          <p className="text-base leading-relaxed text-slate-500">
            {guide.shortDescription}
          </p>
          <p className="text-sm text-slate-400">
            <Link href="/guides" className="text-emerald-600 hover:underline">
              ← All guides
            </Link>
            {" · "}
            <Link
              href="/uk-calculator-directory"
              className="text-emerald-600 hover:underline"
            >
              City calculators
            </Link>
          </p>
        </header>

        <div className="mt-8 space-y-8">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-slate-900">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-600">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10">
          <TrustComplianceRibbon />
        </div>

        {related.length > 0 && (
          <aside className="mt-10 border-t border-slate-100 pt-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Related guides
            </h2>
            <ul className="mt-4 space-y-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <a
                    href={getGuidePath(item.slug)}
                    className="text-sm font-medium text-emerald-600 hover:underline"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </main>
  );
}
