"use client";

import { useCallback } from "react";

export type ScoreEntry = {
  game: string;
  score: number;
  name: string;
};

const STORAGE_KEY = "av_scores";

/**
 * SSR-safe mock score persistence hook backed by localStorage key
 * `av_scores`. Matches legacy `handleSaveScore`: reads existing array
 * (defaulting to `[]` on missing/malformed JSON), appends the entry with
 * an `at` timestamp, and swallows write errors.
 */
export function useAvScores() {
  const saveScore = useCallback((entry: ScoreEntry) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const all = raw ? JSON.parse(raw) : [];
      const list = Array.isArray(all) ? all : [];
      list.push({ ...entry, at: Date.now() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // ignore read/write/parse failures (matches legacy try/catch swallow)
    }
  }, []);

  return { saveScore };
}
