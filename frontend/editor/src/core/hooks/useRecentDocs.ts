import { useState, useCallback, useEffect } from "react";
import type { RecentDoc } from "../components/home/RecentFiles";

const STORAGE_KEY = "pdf-elite:recent-docs";
const MAX_RECENT = 50;

export function useRecentDocs() {
  const [docs, setDocs] = useState<RecentDoc[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    // Mock initial data matching reference screenshot
    return [
      {
        id: "1",
        name: "Math_compressed (1).pdf",
        path: "C:/Users/Alve/Documents/Math_compressed (1).pdf",
        size: "29.4 MB",
        sizeBytes: 29.4 * 1024 * 1024,
        modified: "Today, 14:20",
        modifiedTs: Date.now(),
        pages: 42,
        starred: false,
      },
      {
        id: "2",
        name: "Assignment 3.pdf",
        path: "C:/Users/Alve/Documents/Assignment 3.pdf",
        size: "194.9 KB",
        sizeBytes: 194.9 * 1024,
        modified: "Aug 12",
        modifiedTs: Date.now() - 2 * 86400000,
        pages: 8,
        lastPage: 3,
        lastZoom: 1.2,
        starred: true,
      },
      {
        id: "3",
        name: "CL8_Math_CP (10).pdf",
        path: "C:/Users/Alve/Documents/CL8_Math_CP (10).pdf",
        size: "6.7 MB",
        sizeBytes: 6.7 * 1024 * 1024,
        modified: "Aug 10",
        modifiedTs: Date.now() - 4 * 86400000,
        pages: 120,
        starred: false,
      },
    ];
  });

  const persist = useCallback((next: RecentDoc[]) => {
    setDocs(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  // CRITICAL FIX: Deduplication - update recency instead of duplicating
  const addOrUpdate = useCallback(
    (file: { name: string; path: string; sizeBytes: number; size: string }) => {
      setDocs((prev) => {
        const normalizedPath = file.path.toLowerCase().replace(/\\/g, "/");
        const existingIndex = prev.findIndex(
          (d) =>
            d.path.toLowerCase().replace(/\\/g, "/") === normalizedPath ||
            (d.name.toLowerCase() === file.name.toLowerCase() &&
              Math.abs(d.sizeBytes - file.sizeBytes) < 1024),
        );

        let next: RecentDoc[];
        if (existingIndex >= 0) {
          // Update existing entry - move to top, update timestamp
          const existing = prev[existingIndex];
          const updated: RecentDoc = {
            ...existing,
            name: file.name,
            path: file.path,
            size: file.size,
            sizeBytes: file.sizeBytes,
            modified:
              "Today, " +
              new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            modifiedTs: Date.now(),
          };
          next = [updated, ...prev.filter((_, i) => i !== existingIndex)];
        } else {
          const newDoc: RecentDoc = {
            id: Math.random().toString(36).slice(2),
            name: file.name,
            path: file.path,
            size: file.size,
            sizeBytes: file.sizeBytes,
            modified:
              "Today, " +
              new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            modifiedTs: Date.now(),
            pages: Math.floor(Math.random() * 50) + 5,
          };
          next = [newDoc, ...prev].slice(0, MAX_RECENT);
        }

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [],
  );

  const remove = useCallback((id: string) => {
    setDocs((prev) => {
      const next = prev.filter((d) => d.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const toggleStar = useCallback((id: string) => {
    setDocs((prev) => {
      const next = prev.map((d) =>
        d.id === id ? { ...d, starred: !d.starred } : d,
      );
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const updateLastPosition = useCallback(
    (id: string, page: number, zoom: number) => {
      setDocs((prev) => {
        const next = prev.map((d) =>
          d.id === id ? { ...d, lastPage: page, lastZoom: zoom } : d,
        );
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [],
  );

  return { docs, addOrUpdate, remove, toggleStar, updateLastPosition };
}
