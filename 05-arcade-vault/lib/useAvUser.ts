"use client";

import { useCallback, useSyncExternalStore } from "react";

export type AvUser = { name: string } | null;

const STORAGE_KEY = "av_user";

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function notify() {
  for (const cb of listeners) cb();
}

function readStoredUser(): AvUser {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AvUser) : null;
  } catch {
    return null;
  }
}

function getServerSnapshot(): AvUser {
  return null;
}

/**
 * SSR-safe mock session hook backed by localStorage key `av_user`.
 * Uses useSyncExternalStore: server/first-paint snapshot is always null,
 * client snapshot reads localStorage (try/catch → null on malformed JSON,
 * matches legacy fallback semantics). No setState-in-effect.
 */
export function useAvUser() {
  const user = useSyncExternalStore(subscribe, readStoredUser, getServerSnapshot);

  const login = useCallback((u: AvUser) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {
      // ignore write failures (e.g. storage disabled)
    }
    notify();
  }, []);

  const signOut = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore write failures (e.g. storage disabled)
    }
    notify();
  }, []);

  return { user, login, signOut };
}
