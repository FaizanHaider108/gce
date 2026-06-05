import Link from "next/link";

export default function ServiceNotFound() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-16 text-center sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">Service not found</h1>
      <p className="mt-3 text-slate-500">
        The accounting service you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Back to home
      </Link>
    </main>
  );
}
