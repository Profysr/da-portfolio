"use client";

import { useState, useEffect } from "react";

/**
 * Custom React hook to fetch authenticated GitHub statistics via /api/github
 */
export function useGitHubStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/github");

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(
            errData.error || `Failed to fetch stats (Status: ${res.status})`
          );
        }

        const data = await res.json();
        if (isMounted) {
          setStats(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading GitHub stats:", err);
        if (isMounted) {
          setError(err.message || "Failed to load GitHub stats");
          setLoading(false);
        }
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return { stats, loading, error };
}