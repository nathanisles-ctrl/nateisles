"use client";

import { useEffect, useState } from "react";

const HANDLE = "nathanisles-ctrl";

type User = {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type Repo = {
  stargazers_count: number;
  language: string | null;
};

export default function GithubStats() {
  const [user, setUser] = useState<User | null>(null);
  const [stars, setStars] = useState<number | null>(null);
  const [topLang, setTopLang] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${HANDLE}`).then((r) =>
        r.ok ? r.json() : Promise.reject()
      ),
      fetch(`https://api.github.com/users/${HANDLE}/repos?per_page=100`).then(
        (r) => (r.ok ? r.json() : Promise.reject())
      ),
    ])
      .then(([u, repos]: [User, Repo[]]) => {
        setUser(u);
        setStars(repos.reduce((a, r) => a + (r.stargazers_count || 0), 0));
        const langs = repos.reduce((acc: Record<string, number>, r) => {
          if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
          return acc;
        }, {});
        const top = Object.entries(langs).sort((a, b) => b[1] - a[1])[0];
        setTopLang(top?.[0] ?? null);
      })
      .catch(() => setError(true));
  }, []);

  if (error) return null;
  if (!user) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-bone/5 mb-px">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-obsidian p-6 md:p-8 h-32 animate-pulse opacity-30"
          />
        ))}
      </div>
    );
  }

  const yearsActive =
    new Date().getFullYear() - new Date(user.created_at).getFullYear();

  const cells = [
    { stat: user.public_repos, label: "PUBLIC REPOS" },
    { stat: stars ?? 0, label: "TOTAL STARS" },
    { stat: topLang ?? "—", label: "MOST USED" },
    { stat: `${yearsActive}Y`, label: "ON GITHUB" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-bone/5">
      {cells.map((c) => (
        <div
          key={c.label}
          className="bg-obsidian p-6 md:p-8 text-center"
        >
          <div className="font-display font-black text-bone text-3xl md:text-5xl tracking-[0.04em] tabular-nums">
            {c.stat}
          </div>
          <div className="mt-3 text-ember font-mono text-[9px] md:text-[10px] tracking-[0.3em]">
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}
