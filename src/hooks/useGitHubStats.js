import { useState, useEffect } from "react";
import { contributions } from "@/data/idx";

const DEFAULT_USERNAME = contributions?.githubUsername || "Profysr";

/**
 * Custom React hook to fetch GitHub statistics via Vercel Serverless Function (/api/github)
 * with automatic fallback to GitHub REST API during standalone local development (`npm run dev`).
 */
export function useGitHubStats(username = DEFAULT_USERNAME) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        // 1. Try Vercel Serverless Function first
        const apiRes = await fetch("/api/github");

        if (apiRes.ok) {
          const data = await apiRes.json();
          if (isMounted) {
            setStats(data);
            setLoading(false);
          }
          return;
        }

        // 2. Fallback for standalone local Vite dev server (if /api endpoint is 404)
        console.warn(
          "[/api/github] endpoint unavailable (running plain Vite dev server). Falling back to direct public REST fetch..."
        );

        const restProfileRes = await fetch(`https://api.github.com/users/${username}`);
        if (!restProfileRes.ok) {
          throw new Error(`GitHub REST fetch returned status ${restProfileRes.status}`);
        }
        const profile = await restProfileRes.json();

        const restReposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&type=owner`
        );
        let totalStars = 0;
        let totalForks = 0;

        if (restReposRes.ok) {
          const repos = await restReposRes.json();
          if (Array.isArray(repos)) {
            totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
            totalForks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);
          }
        }

        if (isMounted) {
          setStats({
            username: profile.login,
            name: profile.name,
            avatarUrl: profile.avatar_url,
            bio: profile.bio,
            publicRepos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
            totalStars,
            totalForks,
            totalContributions: null,
            contributionCalendar: null,
            updatedAt: new Date().toISOString(),
            isFallback: true,
          });
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
  }, [username]);

  return { stats, loading, error };
}
