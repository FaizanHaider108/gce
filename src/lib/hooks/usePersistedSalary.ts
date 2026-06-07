"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "gce-gross-salary";

export type SalaryOrigin = "default" | "url" | "storage" | "input";

function parseSalary(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 0) return undefined;
  return parsed;
}

export interface PersistedSalaryState {
  salary: number;
  setSalary: (value: number) => void;
  origin: SalaryOrigin;
  /** True when salary came from URL, storage, or explicit user input — not the cold default. */
  isExplicitSalary: boolean;
  hydrated: boolean;
}

/**
 * @param urlSalary — when set (e.g. from homepage `?salary=`), takes priority over localStorage.
 */
export function usePersistedSalary(
  fallback: number,
  urlSalary?: number,
): PersistedSalaryState {
  const [salary, setSalaryState] = useState(urlSalary ?? fallback);
  const [origin, setOrigin] = useState<SalaryOrigin>(
    urlSalary !== undefined ? "url" : "default",
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const fromUrl = urlSalary;
    if (fromUrl !== undefined && fromUrl >= 0) {
      setSalaryState(fromUrl);
      setOrigin("url");
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
        setSalaryState(parsed);
        setOrigin("storage");
      }
    } catch {
      // localStorage unavailable — use fallback
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

  const setSalary = useCallback((value: number) => {
    setSalaryState(value);
    setOrigin("input");
  }, []);

  const isExplicitSalary = origin !== "default" && salary > 0;

  return {
    salary,
    setSalary,
    origin,
    isExplicitSalary,
    hydrated,
  };
}
