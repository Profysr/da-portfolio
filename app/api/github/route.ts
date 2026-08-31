import { NextResponse } from "next/server";

export const revalidate = 3600;
const GITHUB_VIEWER_QUERY = `
  query {
    viewer {
      login
      name
      avatarUrl
      bio
      location
      repositories(first: 100, ownerAffiliations: [OWNER], isFork: false) {
        totalCount
        nodes {
          stargazerCount
          forkCount
        }
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN environment variable is not configured." },
      { status: 401 }
    );
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Portfolio-App-NextJS-Route",
      },
      body: JSON.stringify({ query: GITHUB_VIEWER_QUERY }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub GraphQL API returned status ${res.status}` },
        { status: res.status }
      );
    }

    const json = await res.json();

    if (json.errors) {
      return NextResponse.json(
        { error: "GraphQL errors occurred", details: json.errors },
        { status: 400 }
      );
    }

    const viewer = json.data?.viewer;
    if (!viewer) {
      return NextResponse.json(
        { error: "Failed to retrieve authenticated viewer data." },
        { status: 404 }
      );
    }

    // Aggregate star & fork counts across owned repos
    const repoNodes = viewer.repositories?.nodes ?? [];
    let totalStars = 0;
    let totalForks = 0;

    for (const repo of repoNodes) {
      totalStars += repo.stargazerCount ?? 0;
      totalForks += repo.forkCount ?? 0;
    }

    const calendar = viewer.contributionsCollection?.contributionCalendar;

    const payload = {
      username: viewer.login,
      name: viewer.name,
      avatarUrl: viewer.avatarUrl,
      bio: viewer.bio,
      location: viewer.location,
      publicRepos: viewer.repositories?.totalCount ?? 0,
      followers: viewer.followers?.totalCount ?? 0,
      following: viewer.following?.totalCount ?? 0,
      totalStars,
      totalForks,
      totalContributions: calendar?.totalContributions ?? 0,
      contributionCalendar: calendar ?? null,
      updatedAt: new Date().toISOString(),
      isAuthenticated: true,
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch (err) {
    console.error("Error fetching GitHub statistics:", err);
    const message =
      err instanceof Error ? err.message : "Failed to fetch GitHub data";
    return NextResponse.json(
      { error: "Failed to fetch GitHub data", message },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    },
  });
}