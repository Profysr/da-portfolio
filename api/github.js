// Vercel Serverless Function: GET /api/github
// Securely fetches GitHub profile stats, repositories, and contributions.

export default async function handler(req, res) {
  // Set CORS headers for security and flexibility
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Cache response on Vercel CDN Edge Network for 1 hour (3600s), stale-while-revalidate for 24h
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );

  const username = process.env.GITHUB_USERNAME || "Profysr";
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  const headers = {
    "User-Agent": "Portfolio-App-Vercel-Function",
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    // 1. Fetch User Profile
    const profileRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
    });

    if (!profileRes.ok) {
      throw new Error(`GitHub Profile API returned ${profileRes.status}`);
    }

    const profile = await profileRes.json();

    // 2. Fetch User Public Repositories (up to 100 for calculating total stars/forks)
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`,
      { headers }
    );

    let totalStars = 0;
    let totalForks = 0;
    let reposList = [];

    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos)) {
        reposList = repos;
        totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
        totalForks = repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);
      }
    }

    // 3. Optional GraphQL Query for Contribution Calendar (requires token)
    let contributionCalendar = null;
    let totalContributions = null;

    if (token) {
      const graphqlQuery = {
        query: `
          query($username: String!) {
            user(login: $username) {
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
        `,
        variables: { username },
      };

      const gqlRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      });

      if (gqlRes.ok) {
        const gqlData = await gqlRes.json();
        const cal = gqlData?.data?.user?.contributionsCollection?.contributionCalendar;
        if (cal) {
          totalContributions = cal.totalContributions;
          contributionCalendar = cal;
        }
      }
    }

    const payload = {
      username: profile.login,
      name: profile.name,
      avatarUrl: profile.avatar_url,
      bio: profile.bio,
      location: profile.location,
      publicRepos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      totalStars,
      totalForks,
      totalContributions,
      contributionCalendar,
      updatedAt: new Date().toISOString(),
      isAuthenticated: Boolean(token),
    };

    return res.status(200).json(payload);
  } catch (err) {
    console.error("Vercel Serverless Function Error (/api/github):", err);
    return res.status(500).json({
      error: "Failed to fetch GitHub data",
      message: err.message,
    });
  }
}
