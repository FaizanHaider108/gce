export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
      <p className="mt-4 text-slate-500">
        This page is a placeholder. For enquiries, email{" "}
        <a
          href="mailto:hello@globalcalculatorengine.com"
          className="font-medium text-emerald-600 hover:underline"
        >
          hello@globalcalculatorengine.com
        </a>{" "}
        — a dedicated contact form will be added at launch.
      </p>
    </main>
  );
}
