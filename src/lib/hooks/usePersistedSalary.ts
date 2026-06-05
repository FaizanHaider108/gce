"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "gce-gross-salary";

export function usePersistedSalary(fallback: number) {
  const [salary, setSalary] = useState(fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = Number.parseInt(stored, 10);
        if (!Number.isNaN(parsed) && parsed >= 0) {
          setSalary(parsed);
        }
      }
    } catch {
      // localStorage unavailable (private browsing, SSR) — use fallback
    }
    setHydrated(true);
  }, []);

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
