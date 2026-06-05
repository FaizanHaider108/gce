import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // App lives in src/app — Next.js resolves this automatically.
  // Do NOT set output: "export"; Vercel needs the default serverless build.
};

export default nextConfig;
