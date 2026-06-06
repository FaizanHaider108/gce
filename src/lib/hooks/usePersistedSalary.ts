"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "gce-gross-salary";

function parseSalary(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 0) return undefined;
  return parsed;
}

/**
 * @param urlSalary — when set (e.g. from homepage `?salary=`), takes priority over localStorage.
 */
export function usePersistedSalary(fallback: number, urlSalary?: number) {
  const [salary, setSalary] = useState(urlSalary ?? fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const fromUrl = urlSalary;
    if (fromUrl !== undefined && fromUrl >= 0) {
      setSalary(fromUrl);
      try {
        localStorage.setItem(STORAGE_KEY, String(fromUrl));
      } catch {
        // ignore write failures
      }
      setHydrated(true);
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = parseSalary(stored ?? undefined);
      if (parsed !== undefined) {
        setSalary(parsed);
      }
    } catch {
      // localStorage unavailable (private browsing, SSR) — use fallback
    }
    setHydrated(true);
  }, [urlSalary]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, String(salary));
    } catch {
      // ignore write failures
    }
  }, [salary, hydrated]);

  return [salary, setSalary] as const;
}
